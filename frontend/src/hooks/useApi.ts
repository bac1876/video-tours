import { useState } from 'react';
import { api } from '../utils/api';
import {
  Photo,
  VideoClip,
  GeneratedVideos,
  PropertyInfo,
  UploadResponse,
  GenerateRoomVideoResponse,
  GenerateFullTourResponse,
} from '../types';

export const useUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (files: File[]): Promise<Photo[] | null> => {
    setIsUploading(true);
    setError(null);

    try {
      const response = await api.uploadPhotos(files);
      return response.photos;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { upload, isUploading, error };
};

export const useGenerateVideos = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState({
    current: 0,
    total: 0,
    message: '',
  });

  const generateRoomVideo = async (
    imageUrl: string,
    prompt: string,
    order: number,
    roomDescription?: string
  ): Promise<VideoClip | null> => {
    try {
      setProgress({
        current: order + 1,
        total: progress.total,
        message: `Generating video for room ${order + 1}...`,
      });

      const response = await api.generateRoomVideo(imageUrl, prompt, order, roomDescription);

      return {
        url: response.videoUrl,
        duration: response.duration,
        order: response.order,
        status: 'completed',
      };
    } catch (err: any) {
      console.error(`Failed to generate video for room ${order}:`, err.message);
      return {
        url: '',
        duration: 0,
        order,
        status: 'failed',
        error: err.message,
      };
    }
  };

  const generateAllVideos = async (photos: Photo[]): Promise<VideoClip[]> => {
    setIsGenerating(true);
    setError(null);
    setProgress({ current: 0, total: photos.length, message: 'Starting generation...' });

    try {
      const clips: VideoClip[] = [];

      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        const clip = await generateRoomVideo(photo.url, '', photo.order, photo.description);

        if (clip) {
          clips.push(clip);
        }
      }

      const failedClips = clips.filter((clip) => clip.status === 'failed');
      if (failedClips.length > 0) {
        setError(`${failedClips.length} video(s) failed to generate`);
      }

      return clips.filter((clip) => clip.status === 'completed');
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setIsGenerating(false);
    }
  };

  const generateFullTour = async (clips: VideoClip[], propertyInfo: PropertyInfo): Promise<string | null> => {
    // setIsGenerating(true); // Will be managed by polling
    setError(null); // Clear previous errors

    try {
      const response = await api.generateFullTour(clips, propertyInfo);
      return response.jobId; // Return the jobId
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      // setIsGenerating(false); // Will be managed by polling
    }
  };

  return {
    generateAllVideos,
    generateFullTour,
    isGenerating,
    error,
    progress,
  };
};
