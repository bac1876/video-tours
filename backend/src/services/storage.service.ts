import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { StorageError } from '../utils/errors';
import { StorageConfig } from '../types';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

export class StorageService {
  private s3Client: S3Client;
  private bucket: string;
  private storageType: 's3' | 'r2';

  constructor() {
    const config = this.getStorageConfig();
    this.bucket = config.bucket;
    this.storageType = config.type;

    if (config.type === 'r2') {
      this.s3Client = new S3Client({
        region: 'auto',
        endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: config.accessKeyId,
          secretAccessKey: config.secretAccessKey,
        },
      });
    } else {
      this.s3Client = new S3Client({
        region: config.region || 'us-east-1',
        credentials: {
          accessKeyId: config.accessKeyId,
          secretAccessKey: config.secretAccessKey,
        },
      });
    }
  }

  private getStorageConfig(): StorageConfig {
    const storageType = process.env.STORAGE_TYPE as 's3' | 'r2' || 's3';

    if (storageType === 'r2') {
      return {
        type: 'r2',
        bucket: process.env.R2_BUCKET!,
        accountId: process.env.R2_ACCOUNT_ID!,
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      };
    }

    return {
      type: 's3',
      bucket: process.env.S3_BUCKET!,
      region: process.env.AWS_REGION || 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    };
  }

  async uploadFile(
    filePath: string,
    key: string,
    contentType: string
  ): Promise<string> {
    try {
      const fileContent = fs.readFileSync(filePath);

      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: fileContent,
        ContentType: contentType,
        // R2 doesn't support ACLs - use bucket-level public access instead
      });

      await this.s3Client.send(command);

      return this.getPublicUrl(key);
    } catch (error: any) {
      console.error('Full S3 upload error:', error);
      throw new StorageError(`Failed to upload file: ${error.message}`);
    }
  }

  async uploadBuffer(
    buffer: Buffer,
    key: string,
    contentType: string
  ): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: contentType,
        // R2 doesn't support ACLs - use bucket-level public access instead
      });

      await this.s3Client.send(command);

      return this.getPublicUrl(key);
    } catch (error: any) {
      throw new StorageError(`Failed to upload buffer: ${error.message}`);
    }
  }

  async getSignedDownloadUrl(key: string, expiresIn: number = 3600): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      return await getSignedUrl(this.s3Client, command, { expiresIn });
    } catch (error: any) {
      throw new StorageError(`Failed to generate signed URL: ${error.message}`);
    }
  }

  getPublicUrl(key: string): string {
    if (this.storageType === 'r2') {
      const publicUrl = process.env.R2_PUBLIC_URL;
      if (publicUrl) {
        return `${publicUrl}/${key}`;
      }
      // Fallback to account-based URL if R2_PUBLIC_URL not set
      const accountId = process.env.R2_ACCOUNT_ID;
      return `https://${this.bucket}.${accountId}.r2.dev/${key}`;
    }

    const region = process.env.AWS_REGION || 'us-east-1';
    return `https://${this.bucket}.s3.${region}.amazonaws.com/${key}`;
  }

  generateUniqueKey(prefix: string, extension: string): string {
    const uuid = uuidv4();
    return `${prefix}/${uuid}.${extension}`;
  }

  getFileExtension(filename: string): string {
    return path.extname(filename).slice(1).toLowerCase();
  }
}

export const storageService = new StorageService();
