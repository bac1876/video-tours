import { Router, Request, Response } from 'express';
import { soraService } from '../services/sora.service';
import { storageService } from '../services/storage.service';
import { ffmpegService } from '../services/ffmpeg.service';
import { promptService } from '../services/prompt.service';
import { visionService } from '../services/vision.service';
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
    const { imageUrl, prompt, order, roomDescription }: GenerateRoomVideoRequest = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        error: 'ValidationError',
        message: 'imageUrl is required',
      });
    }

    validateUrl(imageUrl);

    console.log(`Generating video for room ${order || 0}...`);
    console.log(`Image URL: ${imageUrl}`);

    // Analyze image with GPT-5 Vision if no user description provided
    let enhancedDescription = roomDescription;
    if (!roomDescription) {
      console.log('No room description provided. Analyzing image with GPT Vision...');
      const visionAnalysis = await visionService.analyzeRoomImage(imageUrl);
      if (visionAnalysis) {
        enhancedDescription = visionService.generateSpatialPrompt(visionAnalysis);
        console.log('Vision-enhanced description:', enhancedDescription);
      }
    } else {
      console.log('Using user-provided description:', roomDescription);
    }

    const finalPrompt = prompt || promptService.generateRoomPrompt(order || 0, enhancedDescription);

    console.log(`Final prompt: ${finalPrompt}`);

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
    const { clips, propertyInfo }: GenerateFullTourRequest = req.body;

    validateVideoClips(clips);

    if (!propertyInfo || !propertyInfo.address || !propertyInfo.price) {
      return res.status(400).json({
        success: false,
        error: 'ValidationError',
        message: 'Property info (address and price) is required',
      });
    }

    console.log(`Stitching ${clips.length} clips into full tour...`);
    console.log(`Property: ${propertyInfo.address} - ${propertyInfo.price}`);

    const sortedClips = [...clips].sort((a, b) => a.order - b.order);

    console.log('Downloading all clips...');
    const downloadPromises = sortedClips.map((clip) =>
      ffmpegService.downloadClip(clip.url)
    );
    const clipPaths = await Promise.all(downloadPromises);

    // Add text overlay to first clip
    console.log('Adding property info overlay to first clip...');
    const firstClipWithText = await ffmpegService.addTextOverlay(
      clipPaths[0],
      propertyInfo.address,
      propertyInfo.price,
      3
    );
    clipPaths[0] = firstClipWithText;

    console.log('Creating horizontal version (1080p)...');
    const concatenatedPath = await ffmpegService.concatenateVideos(
      clipPaths,
      `tour-${Date.now()}.mp4`
    );

    // Add end screen with agent info
    console.log('Adding agent info end screen...');
    const horizontalPath = await ffmpegService.addEndScreen(
      concatenatedPath,
      propertyInfo.agentName,
      propertyInfo.agentCompany,
      propertyInfo.agentPhone,
      3,
      1
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
      concatenatedPath,
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
