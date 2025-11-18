import { Router, Request, Response } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { storageService } from '../services/storage.service';
import { validateImageFiles } from '../utils/validation';
import { asyncHandler } from '../utils/errors';
import { UploadResponse, Photo } from '../types';
import * as path from 'path';
import * as fs from 'fs';

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    cb(null, `photo-${uuidv4()}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'),
    files: parseInt(process.env.MAX_FILES || '15'),
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, and WebP are allowed.'));
    }
  },
});

router.post(
  '/',
  upload.array('photos', parseInt(process.env.MAX_FILES || '15')),
  asyncHandler(async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];

    validateImageFiles(files);

    console.log(`Uploading ${files.length} photos to storage...`);

    const uploadPromises = files.map(async (file, index) => {
      const extension = storageService.getFileExtension(file.originalname);
      const key = storageService.generateUniqueKey('photos', extension);

      const url = await storageService.uploadFile(file.path, key, file.mimetype);

      fs.unlinkSync(file.path);

      const photo: Photo = {
        id: uuidv4(),
        url,
        filename: file.originalname,
        order: index,
      };

      return photo;
    });

    const photos = await Promise.all(uploadPromises);

    console.log(`Successfully uploaded ${photos.length} photos`);

    const response: UploadResponse = {
      success: true,
      photos,
    };

    res.json(response);
  })
);

export default router;
