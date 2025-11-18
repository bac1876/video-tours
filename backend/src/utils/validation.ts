import { ValidationError } from './errors';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE || '10485760'); // 10MB
const MAX_FILES = parseInt(process.env.MAX_FILES || '15');

export const validateImageFile = (file: Express.Multer.File): void => {
  if (!file) {
    throw new ValidationError('No file provided');
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
    throw new ValidationError(
      `Invalid file type: ${file.mimetype}. Allowed types: JPG, PNG, WebP`
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new ValidationError(
      `File size exceeds maximum allowed size of ${MAX_FILE_SIZE / 1024 / 1024}MB`
    );
  }
};

export const validateImageFiles = (files: Express.Multer.File[]): void => {
  if (!files || files.length === 0) {
    throw new ValidationError('No files provided');
  }

  if (files.length > MAX_FILES) {
    throw new ValidationError(`Maximum ${MAX_FILES} files allowed`);
  }

  files.forEach(validateImageFile);
};

export const validateUrl = (url: string): void => {
  try {
    new URL(url);
  } catch (error) {
    throw new ValidationError(`Invalid URL: ${url}`);
  }
};

export const validateVideoClips = (clips: any[]): void => {
  if (!clips || !Array.isArray(clips)) {
    throw new ValidationError('Clips must be an array');
  }

  if (clips.length === 0) {
    throw new ValidationError('At least one clip is required');
  }

  if (clips.length > MAX_FILES) {
    throw new ValidationError(`Maximum ${MAX_FILES} clips allowed`);
  }

  clips.forEach((clip, index) => {
    if (!clip.url) {
      throw new ValidationError(`Clip ${index + 1} is missing URL`);
    }
    validateUrl(clip.url);

    if (typeof clip.order !== 'number') {
      throw new ValidationError(`Clip ${index + 1} has invalid order`);
    }
  });
};
