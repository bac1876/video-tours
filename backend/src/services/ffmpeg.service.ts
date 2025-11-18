import ffmpeg from 'fluent-ffmpeg';
import { FFmpegError } from '../utils/errors';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const FFMPEG_PATH = process.env.FFMPEG_PATH || 'ffmpeg';
const VIDEO_QUALITY = parseInt(process.env.VIDEO_QUALITY || '16');
const CROSSFADE_DURATION = 0.5; // seconds

ffmpeg.setFfmpegPath(FFMPEG_PATH);

export class FFmpegService {
  private uploadsDir: string;

  constructor() {
    this.uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  async downloadClip(url: string): Promise<string> {
    try {
      const filename = `clip-${uuidv4()}.mp4`;
      const outputPath = path.join(this.uploadsDir, filename);

      console.log(`Downloading clip from: ${url}`);

      const response = await axios.get(url, {
        responseType: 'stream',
        timeout: 60000,
      });

      const writer = fs.createWriteStream(outputPath);
      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(outputPath));
        writer.on('error', reject);
      });
    } catch (error: any) {
      throw new FFmpegError(`Failed to download clip: ${error.message}`);
    }
  }

  async concatenateVideos(
    clipPaths: string[],
    outputFilename: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const outputPath = path.join(this.uploadsDir, outputFilename);
      const concatListPath = path.join(this.uploadsDir, `concat-${uuidv4()}.txt`);

      try {
        const concatList = clipPaths
          .map((clipPath) => `file '${clipPath.replace(/\\/g, '/')}'`)
          .join('\n');

        fs.writeFileSync(concatListPath, concatList);

        console.log(`Concatenating ${clipPaths.length} videos...`);

        ffmpeg()
          .input(concatListPath)
          .inputOptions(['-f concat', '-safe 0'])
          .outputOptions([
            '-c:v libx264',
            '-preset slow',
            `-crf ${VIDEO_QUALITY}`,
            '-c:a aac',
            '-vf format=yuv420p',
          ])
          .output(outputPath)
          .on('start', (commandLine) => {
            console.log('FFmpeg command:', commandLine);
          })
          .on('progress', (progress) => {
            console.log(`Processing: ${progress.percent?.toFixed(2)}% done`);
          })
          .on('end', () => {
            console.log(`Concatenation complete: ${outputPath}`);
            fs.unlinkSync(concatListPath);
            resolve(outputPath);
          })
          .on('error', (error) => {
            console.error('FFmpeg error:', error.message);
            if (fs.existsSync(concatListPath)) {
              fs.unlinkSync(concatListPath);
            }
            reject(new FFmpegError(`Concatenation failed: ${error.message}`));
          })
          .run();
      } catch (error: any) {
        if (fs.existsSync(concatListPath)) {
          fs.unlinkSync(concatListPath);
        }
        reject(new FFmpegError(`Failed to setup concatenation: ${error.message}`));
      }
    });
  }

  async createCompressedVersion(inputPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const outputPath = inputPath.replace('.mp4', '_compressed.mp4');

      console.log(`Creating compressed version...`);

      ffmpeg(inputPath)
        .outputOptions([
          '-c:v libx264',
          '-b:v 3M',
          '-maxrate 3M',
          '-bufsize 6M',
          '-c:a aac',
          '-b:a 128k',
          '-vf format=yuv420p',
        ])
        .output(outputPath)
        .on('start', (commandLine) => {
          console.log('FFmpeg command:', commandLine);
        })
        .on('progress', (progress) => {
          console.log(`Compressing: ${progress.percent?.toFixed(2)}% done`);
        })
        .on('end', () => {
          console.log(`Compression complete: ${outputPath}`);
          resolve(outputPath);
        })
        .on('error', (error) => {
          console.error('FFmpeg error:', error.message);
          reject(new FFmpegError(`Compression failed: ${error.message}`));
        })
        .run();
    });
  }

  async createVerticalVersion(inputPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const outputPath = inputPath.replace('.mp4', '_vertical.mp4');

      console.log(`Creating vertical version (9:16)...`);

      ffmpeg(inputPath)
        .outputOptions([
          '-c:v libx264',
          '-preset slow',
          `-crf ${VIDEO_QUALITY}`,
          '-c:a aac',
          '-vf',
          'scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:black,format=yuv420p',
        ])
        .output(outputPath)
        .on('start', (commandLine) => {
          console.log('FFmpeg command:', commandLine);
        })
        .on('progress', (progress) => {
          console.log(`Creating vertical: ${progress.percent?.toFixed(2)}% done`);
        })
        .on('end', () => {
          console.log(`Vertical version complete: ${outputPath}`);
          resolve(outputPath);
        })
        .on('error', (error) => {
          console.error('FFmpeg error:', error.message);
          reject(new FFmpegError(`Vertical conversion failed: ${error.message}`));
        })
        .run();
    });
  }

  async getVideoDuration(filePath: string): Promise<number> {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (error, metadata) => {
        if (error) {
          reject(new FFmpegError(`Failed to get video duration: ${error.message}`));
        } else {
          resolve(metadata.format.duration || 0);
        }
      });
    });
  }

  cleanupFiles(filePaths: string[]): void {
    filePaths.forEach((filePath) => {
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`Cleaned up: ${filePath}`);
        }
      } catch (error: any) {
        console.error(`Failed to cleanup ${filePath}:`, error.message);
      }
    });
  }
}

export const ffmpegService = new FFmpegService();
