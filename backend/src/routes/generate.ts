import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { videoService } from '../services/video.service';
import { storageService } from '../services/storage.service';
import { ffmpegService } from '../services/ffmpeg.service';
import { promptService } from '../services/prompt.service';
import { visionService } from '../services/vision.service';
import { detectRoomFromFilename, RoomType } from '../services/roomDetection.service';
import { videoQueue } from '../services/queue.service';
import { validateUrl, validateVideoClips } from '../utils/validation';
import { asyncHandler } from '../utils/errors';
import {
  GenerateRoomVideoRequest,
  GenerateRoomVideoResponse,
  GenerateFullTourRequest,
} from '../types';

const router = Router();

router.post(
  '/room-video',
  asyncHandler(async (req: Request, res: Response) => {
    const { imageUrl, prompt, order, roomDescription, filename }: GenerateRoomVideoRequest = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        error: 'ValidationError',
        message: 'imageUrl is required',
      });
    }

    validateUrl(imageUrl);

    const roomIndex = order || 0;
    console.log(`Generating video for room ${roomIndex}...`);
    console.log(`Image URL: ${imageUrl}`);
    if (filename) {
      console.log(`Original filename: ${filename}`);
    }

    // Priority 1: Filename-based room detection
    let roomType: RoomType = 'unknown';
    let isExterior = false;
    let isSmallRoom = false;
    let enhancedDescription = roomDescription;

    if (filename) {
      const detection = detectRoomFromFilename(filename);
      roomType = detection.roomType;
      isExterior = detection.isExterior;
      isSmallRoom = detection.isSmallRoom;
      console.log(`Detected from filename "${filename}": ${roomType}, Exterior: ${isExterior}, Small: ${isSmallRoom}`);
    }

    // Priority 2: Vision analysis (only if filename didn't detect room type)
    if (roomType === 'unknown') {
      console.log('Filename did not match known patterns, using vision analysis...');
      const visionAnalysis = await visionService.analyzeRoomImage(imageUrl);
      if (visionAnalysis) {
        isExterior = visionAnalysis.isExterior;
        isSmallRoom = visionAnalysis.isSmallRoom;
        console.log(`Vision detected: Exterior: ${isExterior}, Small room: ${isSmallRoom}`);

        if (!roomDescription) {
          enhancedDescription = visionService.generateSpatialPrompt(visionAnalysis);
          console.log('Vision-enhanced description:', enhancedDescription);
        }
      }
    }

    // Generate prompt based on room type (from filename or vision)
    const finalPrompt = prompt || promptService.generateRoomPromptByType(roomType, enhancedDescription);

    console.log(`Final prompt: ${finalPrompt}`);

    const videoUrl = await videoService.generateVideo(imageUrl, finalPrompt);

    const tempPath = videoService.generateTempPath('room');
    const downloadedPath = await videoService.downloadVideo(videoUrl, tempPath);

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
    const { clips, propertyInfo }: GenerateFullTourRequest = req.body;

    validateVideoClips(clips);

    if (!propertyInfo || !propertyInfo.address || !propertyInfo.price) {
      return res.status(400).json({
        success: false,
        error: 'ValidationError',
        message: 'Property info (address and price) is required',
      });
    }
    
    const jobId = uuidv4();
    await videoQueue.add('generate-tour', { clips, propertyInfo }, { jobId });

    console.log(`Job ${jobId} added to the queue for property: ${propertyInfo.address}`);

    res.status(202).json({
      success: true,
      jobId: jobId,
    });
  })
);

export default router;
