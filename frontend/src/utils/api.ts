import axios, { AxiosError } from 'axios';
import {
  UploadResponse,
  GenerateRoomVideoResponse,
  GenerateFullTourResponse,
  VideoClip,
  PropertyInfo,
} from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 600000, // 10 minutes for long operations
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const errorMessage =
      (error.response?.data as any)?.message ||
      error.message ||
      'An unexpected error occurred';
    console.error('API Error:', errorMessage);
    throw new Error(errorMessage);
  }
);

export const api = {
  async uploadPhotos(files: File[]): Promise<UploadResponse> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('photos', file);
    });

    const response = await apiClient.post<UploadResponse>(
      '/api/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  },

  async generateRoomVideo(
    imageUrl: string,
    prompt: string,
    order: number,
    roomDescription?: string
  ): Promise<GenerateRoomVideoResponse> {
    const response = await apiClient.post<GenerateRoomVideoResponse>(
      '/api/generate/room-video',
      {
        imageUrl,
        prompt,
        order,
        roomDescription,
      }
    );

    return response.data;
  },

  async generateFullTour(clips: VideoClip[], propertyInfo: PropertyInfo): Promise<GenerateFullTourResponse> {
    const response = await apiClient.post<GenerateFullTourResponse>(
      '/api/generate/full-tour',
      {
        clips: clips.map((clip) => ({
          url: clip.url,
          order: clip.order,
        })),
        propertyInfo,
      }
    );

    return response.data;
  },

  async healthCheck(): Promise<boolean> {
    try {
      const response = await apiClient.get('/api/health');
      return response.data.success === true;
    } catch (error) {
      return false;
    }
  },
};

export default apiClient;
