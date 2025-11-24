import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { grokService } from '../services/grok.service';
import { storageService } from '../services/storage.service';
import { ffmpegService } from '../services/ffmpeg.service';
import { promptService } from '../services/prompt.service';
import { visionService } from '../services/vision.service';
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
    const { imageUrl, prompt, order, roomDescription }: GenerateRoomVideoRequest = req.body;

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

    // Analyze image with GPT-5 Vision to get room type, size, and spatial info
    let enhancedDescription = roomDescription;
    let isExterior = roomIndex === 0; // First image assumed exterior
    let isSmallRoom = false;

    console.log('Analyzing image with GPT Vision...');
    const visionAnalysis = await visionService.analyzeRoomImage(imageUrl);
    if (visionAnalysis) {
      isExterior = visionAnalysis.isExterior || roomIndex === 0;
      isSmallRoom = visionAnalysis.isSmallRoom;
      console.log(`Room type: ${visionAnalysis.roomType}, Exterior: ${isExterior}, Small room: ${isSmallRoom}`);

      if (!roomDescription) {
        enhancedDescription = visionService.generateSpatialPrompt(visionAnalysis);
        console.log('Vision-enhanced description:', enhancedDescription);
      }
    } else if (roomDescription) {
      console.log('Using user-provided description:', roomDescription);
    }

    const finalPrompt = prompt || promptService.generateRoomPrompt(roomIndex, enhancedDescription, isExterior, isSmallRoom);

    console.log(`Final prompt: ${finalPrompt}`);

    const videoUrl = await grokService.generateVideo(imageUrl, finalPrompt);

    const tempPath = grokService.generateTempPath('room');
    const downloadedPath = await grokService.downloadVideo(videoUrl, tempPath);

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
