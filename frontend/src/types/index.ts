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
  jobId: string;
}

export interface JobStatusResponse {
  success: boolean;
  jobId: string;
  state: 'waiting' | 'active' | 'completed' | 'failed' | 'delayed';
  progress: number;
  result?: GeneratedVideos;
}

export interface ErrorResponse {
  success: false;
  error: string;
  message: string;
}

export interface PropertyInfo {
  address: string;
  price: string;
  agentName: string;
  agentCompany: string;
  agentPhone: string;
  logoUrl?: string;
}

export type AppStep = 'upload' | 'reorder' | 'generating' | 'review' | 'processing' | 'download';

export interface AppState {
  step: AppStep;
  photos: Photo[];
  clips: VideoClip[];
  propertyInfo: PropertyInfo | null;
  finalVideos: GeneratedVideos | null;
  isGenerating: boolean;
  error: string | null;
}
