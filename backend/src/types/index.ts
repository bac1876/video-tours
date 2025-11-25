export interface Photo {
  id: string;
  url: string;
  filename: string;
  order: number;
  description?: string;
}

export interface VideoClip {
  url: string;
  order: number;
  duration: number;
}

export interface GenerateRoomVideoRequest {
  imageUrl: string;
  prompt?: string;
  order: number;
  roomDescription?: string;
}

export interface GenerateRoomVideoResponse {
  success: boolean;
  videoUrl: string;
  duration: number;
  order: number;
}

export interface PropertyInfo {
  address: string;
  price: string;
  agentName: string;
  agentCompany: string;
  agentPhone: string;
  logoUrl?: string;
}

export interface GenerateFullTourRequest {
  clips: VideoClip[];
  propertyInfo: PropertyInfo;
}

export interface GenerateFullTourResponse {
  success: boolean;
  videos: {
    horizontal: string;
    compressed: string;
    vertical: string;
  };
}

export interface UploadResponse {
  success: boolean;
  photos: Photo[];
}

export interface ErrorResponse {
  success: false;
  error: string;
  message: string;
}

export interface SoraVideoResponse {
  id: string;
  status: 'pending' | 'completed' | 'failed';
  video_url?: string;
  error?: string;
}

export interface StorageConfig {
  type: 's3' | 'r2';
  bucket: string;
  region?: string;
  accountId?: string;
  accessKeyId: string;
  secretAccessKey: string;
}
