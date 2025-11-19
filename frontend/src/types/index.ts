export interface Photo {
  id: string;
  url: string;
  filename: string;
  order: number;
  file?: File;
  description?: string;
}

export interface VideoClip {
  url: string;
  order: number;
  duration: number;
  status?: 'pending' | 'generating' | 'completed' | 'failed';
  error?: string;
}

export interface GeneratedVideos {
  horizontal: string;
  compressed: string;
  vertical: string;
}

export interface UploadResponse {
  success: boolean;
  photos: Photo[];
}

export interface GenerateRoomVideoResponse {
  success: boolean;
  videoUrl: string;
  duration: number;
  order: number;
}

export interface GenerateFullTourResponse {
  success: boolean;
  videos: GeneratedVideos;
}

export interface ErrorResponse {
  success: false;
  error: string;
  message: string;
}

export type AppStep = 'upload' | 'reorder' | 'generating' | 'download';

export interface AppState {
  step: AppStep;
  photos: Photo[];
  clips: VideoClip[];
  finalVideos: GeneratedVideos | null;
  isGenerating: boolean;
  error: string | null;
}
