import { Router, Request, Response } from 'express';
import { soraService } from '../services/sora.service';
import { storageService } from '../services/storage.service';
import { ffmpegService } from '../services/ffmpeg.service';
import { promptService } from '../services/prompt.service';
import { validateUrl, validateVideoClips } from '../utils/validation';
import { asyncHandler } from '../utils/errors';
import {
  GenerateRoomVideoRequest,
  GenerateRoomVideoResponse,
  GenerateFullTourRequest,
  GenerateFullTourResponse,
  VideoClip,
} from '../types';

const router = Router();

router.post(
  '/room-video',
  asyncHandler(async (req: Request, res: Response) => {
    const { imageUrl, prompt, order }: GenerateRoomVideoRequest = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        error: 'ValidationError',
        message: 'imageUrl is required',
      });
    }

    validateUrl(imageUrl);

    const finalPrompt = prompt || promptService.generateRoomPrompt(order || 0);

    console.log(`Generating video for room ${order || 0}...`);
    console.log(`Image URL: ${imageUrl}`);
    console.log(`Prompt: ${finalPrompt}`);

    const videoUrl = await soraService.generateVideo(imageUrl, finalPrompt);

    const tempPath = soraService.generateTempPath('room');
    const downloadedPath = await soraService.downloadVideo(videoUrl, tempPath);

    const extension = storageService.getFileExtension(downloadedPath);
    const key = storageService.generateUniqueKey('videos/clips', extension);

    const publicUrl = await storageService.uploadFile(
      downloadedPath,
      key,
      'video/mp4'
    );

    const duration = await ffmpegService.getVideoDuration(downloadedPath);

    ffmpegService.cleanupFiles([downloadedPath]);

    const response: GenerateRoomVideoResponse = {
      success: true,
      videoUrl: publicUrl,
      duration,
      order: order || 0,
    };

    console.log(`Successfully generated video for room ${order || 0}`);
    res.json(response);
  })
);

router.post(
  '/full-tour',
  asyncHandler(async (req: Request, res: Response) => {
    const { clips }: GenerateFullTourRequest = req.body;

    validateVideoClips(clips);

    console.log(`Stitching ${clips.length} clips into full tour...`);

    const sortedClips = [...clips].sort((a, b) => a.order - b.order);

    console.log('Downloading all clips...');
    const downloadPromises = sortedClips.map((clip) =>
      ffmpegService.downloadClip(clip.url)
    );
    const clipPaths = await Promise.all(downloadPromises);

    console.log('Creating horizontal version (1080p)...');
    const horizontalPath = await ffmpegService.concatenateVideos(
      clipPaths,
      `tour-${Date.now()}.mp4`
    );

    console.log('Creating compressed MLS version...');
    const compressedPath = await ffmpegService.createCompressedVersion(
      horizontalPath
    );

    console.log('Creating vertical version (9:16)...');
    const verticalPath = await ffmpegService.createVerticalVersion(horizontalPath);

    console.log('Uploading final videos to storage...');

    const [horizontalUrl, compressedUrl, verticalUrl] = await Promise.all([
      storageService.uploadFile(horizontalPath, `videos/tours/final_tour_${Date.now()}.mp4`, 'video/mp4'),
      storageService.uploadFile(compressedPath, `videos/tours/final_tour_compressed_${Date.now()}.mp4`, 'video/mp4'),
      storageService.uploadFile(verticalPath, `videos/tours/final_tour_vertical_${Date.now()}.mp4`, 'video/mp4'),
    ]);

    ffmpegService.cleanupFiles([
      ...clipPaths,
      horizontalPath,
      compressedPath,
      verticalPath,
    ]);

    const response: GenerateFullTourResponse = {
      success: true,
      videos: {
        horizontal: horizontalUrl,
        compressed: compressedUrl,
        vertical: verticalUrl,
      },
    };

    console.log('Full tour generation complete!');
    res.json(response);
  })
);

export default router;
