import { Queue, Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import { ffmpegService } from './ffmpeg.service';
import { storageService } from './storage.service';
import { VideoClip, PropertyInfo } from '../types';

const connection = new IORedis(process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
  maxRetriesPerRequest: null,
  retryStrategy: (times) => {
    if (times > 3) {
      console.warn('Redis connection failed. Switching to Mock Queue Mode.');
      return null; // Stop retrying
    }
    return Math.min(times * 100, 1000);
  },
  // Don't crash on error
  enableOfflineQueue: false,
  lazyConnect: true 
});

let isRedisConnected = false;

// Attempt initial connection
connection.connect().catch(() => {
    // Handled by 'error' listener or retryStrategy
});

connection.on('connect', () => {
  console.log('Redis connected successfully.');
  isRedisConnected = true;
  startWorker();
});

connection.on('error', (err) => {
  // Suppress aggressive error logging if we are intentionally disconnecting or failed
  if (isRedisConnected) {
    console.error('Redis connection error:', err.message);
    isRedisConnected = false;
  }
});

interface TourJobData {
  clips: VideoClip[];
  propertyInfo: PropertyInfo;
}

// Export a wrapper or proxy that handles the missing connection
export const videoQueue = {
  add: async (name: string, data: TourJobData, opts?: any) => {
    if (!isRedisConnected) {
      console.warn('Redis not connected. Using Mock Queue for job:', opts?.jobId || 'mock-id');
      // Return a mock job structure that BullMQ would return
      return { 
          id: opts?.jobId || `mock-${Date.now()}`,
          name,
          data,
          opts
      };
    }
    return realVideoQueue.add(name, data, opts);
  },
  getJob: async (jobId: string) => {
    if (!isRedisConnected) {
      console.error('Cannot retrieve job - Redis not connected');
      throw new Error('Video processing service unavailable. Please try again later.');
    }
    if (jobId.startsWith('mock-')) {
      console.error('Invalid job ID - mock jobs are not supported in production');
      throw new Error('Invalid job. Please start a new video generation.');
    }
    return realVideoQueue.getJob(jobId);
  }
};

const realVideoQueue = new Queue<TourJobData>('video-generation', { connection });

let worker: Worker<TourJobData> | null = null;

const startWorker = () => {
  if (worker || !isRedisConnected) return;
  
  console.log('Starting Video Generation Worker...');
  worker = new Worker<TourJobData>(
    'video-generation',
    async (job: Job<TourJobData>) => {
      const { clips, propertyInfo } = job.data;
      console.log(`Processing job ${job.id} for property: ${propertyInfo.address}`);

      const sortedClips = [...clips].sort((a, b) => a.order - b.order);

      console.log('Downloading all clips for job...');
      const downloadPromises = sortedClips.map((clip) =>
        ffmpegService.downloadClip(clip.url)
      );
      const clipPaths = await Promise.all(downloadPromises);

      console.log('Creating horizontal version (1080p)...');
      const concatenatedPath = await ffmpegService.concatenateVideos(
        clipPaths,
        `tour-${job.id}.mp4`
      );

      console.log('Adding property info overlay...');
      const videoWithText = await ffmpegService.addTextOverlay(
        concatenatedPath,
        propertyInfo.address,
        propertyInfo.price,
        3
      );

      console.log('Adding agent info end screen...');
      const horizontalPath = await ffmpegService.addEndScreen(
        videoWithText,
        propertyInfo.agentName,
        propertyInfo.agentCompany,
        propertyInfo.agentPhone,
        3,
        1
      );

      console.log('Creating compressed MLS version...');
      const compressedPath = await ffmpegService.createCompressedVersion(horizontalPath);

      console.log('Creating vertical version (9:16)...');
      const verticalPath = await ffmpegService.createVerticalVersion(horizontalPath);

      console.log('Uploading final videos to storage...');
      const [horizontalUrl, compressedUrl, verticalUrl] = await Promise.all([
        storageService.uploadFile(horizontalPath, `videos/tours/final_tour_${job.id}.mp4`, 'video/mp4'),
        storageService.uploadFile(compressedPath, `videos/tours/final_tour_compressed_${job.id}.mp4`, 'video/mp4'),
        storageService.uploadFile(verticalPath, `videos/tours/final_tour_vertical_${job.id}.mp4`, 'video/mp4'),
      ]);

      ffmpegService.cleanupFiles([
        ...clipPaths,
        horizontalPath,
        compressedPath,
        verticalPath,
      ]);

      console.log(`Finished job ${job.id}`);
      return {
        horizontal: horizontalUrl,
        compressed: compressedUrl,
        vertical: verticalUrl,
      };
    },
    { connection }
  );

  worker.on('completed', (job, result) => {
    console.log(`Job ${job.id} has completed!`);
    // Here you could, for example, save the result to a database
  });

  worker.on('failed', (job, err) => {
    if (job) {
      console.log(`Job ${job.id} has failed with ${err.message}`);
    } else {
      console.log(`A job has failed with ${err.message}, but the job object was undefined.`);
    }
  });

  console.log('Video generation worker started.');
};

// Worker is started inside connection.on('connect')

