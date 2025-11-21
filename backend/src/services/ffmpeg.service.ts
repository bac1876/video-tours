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
    this.ensureUploadsDir();
  }

  private ensureUploadsDir(): void {
    try {
      if (!fs.existsSync(this.uploadsDir)) {
        fs.mkdirSync(this.uploadsDir, { recursive: true, mode: 0o755 });
        console.log(`Created uploads directory: ${this.uploadsDir}`);
      }
      // Verify we can write to the directory
      fs.accessSync(this.uploadsDir, fs.constants.W_OK);
      console.log(`Uploads directory is writable: ${this.uploadsDir}`);
    } catch (error: any) {
      console.error(`Failed to ensure uploads directory: ${error.message}`);
      throw new FFmpegError(`Uploads directory not accessible: ${error.message}`);
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
            '-an',
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
          '-an',
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
          '-an',
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

  async addTextOverlay(
    inputPath: string,
    address: string,
    price: string,
    duration: number = 3
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        this.ensureUploadsDir();
      } catch (error: any) {
        return reject(error);
      }

      const outputFilename = `text-overlay-${uuidv4()}.mp4`;
      const outputPath = path.join(this.uploadsDir, outputFilename);

      console.log(`Adding text overlay (${duration}s): ${address}, ${price}`);
      console.log(`Input: ${inputPath}`);
      console.log(`Output: ${outputPath}`);

      // Split address into street and city/state/zip
      // Expected format: "123 Main Street, City, State ZIP"
      const addressParts = address.split(',');
      const streetAddress = addressParts[0]?.trim() || address;
      const cityStateZip = addressParts.slice(1).join(',').trim() || '';

      // Escape function for FFmpeg drawtext
      const escapeText = (text: string) => text
        .replace(/\\/g, '\\\\\\\\')
        .replace(/:/g, '\\:')
        .replace(/'/g, '')
        .replace(/"/g, '\\"');

      const escapedStreet = escapeText(streetAddress);
      const escapedCityStateZip = escapeText(cityStateZip);
      const escapedPrice = escapeText(price);

      // Unified box with 3 lines of text (20% smaller fonts)
      // Line 1: Street address (14px)
      // Line 2: City, State ZIP (11px)
      // Line 3: Price (13px)
      const fontFile = '/usr/share/fonts/ttf-dejavu/DejaVuSans.ttf';
      const filterComplex =
        `drawbox=x=10:y=h-90:w=280:h=75:color=red:t=fill:enable='lt(t,${duration})',` +
        `drawtext=fontfile=${fontFile}:text='${escapedStreet}':fontsize=14:fontcolor=white:x=18:y=h-82:enable='lt(t,${duration})',` +
        `drawtext=fontfile=${fontFile}:text='${escapedCityStateZip}':fontsize=11:fontcolor=white:x=18:y=h-62:enable='lt(t,${duration})',` +
        `drawtext=fontfile=${fontFile}:text='${escapedPrice}':fontsize=13:fontcolor=white:x=18:y=h-42:enable='lt(t,${duration})',` +
        'format=yuv420p';

      console.log('Filter complex:', filterComplex);

      ffmpeg(inputPath)
        .videoFilters(filterComplex)
        .outputOptions([
          '-c:v libx264',
          '-preset slow',
          `-crf ${VIDEO_QUALITY}`,
          '-an', // No audio
        ])
        .output(outputPath)
        .on('start', (commandLine) => {
          console.log('FFmpeg command:', commandLine);
        })
        .on('progress', (progress) => {
          console.log(`Adding text overlay: ${progress.percent?.toFixed(2)}% done`);
        })
        .on('end', () => {
          console.log(`Text overlay complete: ${outputPath}`);
          // Clean up the input file
          try {
            if (fs.existsSync(inputPath)) {
              fs.unlinkSync(inputPath);
              console.log(`Cleaned up input file: ${inputPath}`);
            }
          } catch (cleanupError: any) {
            console.warn(`Failed to cleanup input file: ${cleanupError.message}`);
          }
          resolve(outputPath);
        })
        .on('error', (error) => {
          console.error('FFmpeg error:', error.message);
          reject(new FFmpegError(`Text overlay failed: ${error.message}`));
        })
        .run();
    });
  }

  async addEndScreen(
    inputPath: string,
    agentName: string,
    agentCompany: string,
    agentPhone: string,
    duration: number = 3,
    fadeDuration: number = 1
  ): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        this.ensureUploadsDir();

        const outputFilename = `end-screen-${uuidv4()}.mp4`;
        const outputPath = path.join(this.uploadsDir, outputFilename);
        const endScreenPath = path.join(this.uploadsDir, `end-temp-${uuidv4()}.mp4`);

        console.log(`Creating end screen with agent info (${duration}s display, ${fadeDuration}s fade)`);
        console.log(`Input: ${inputPath}`);
        console.log(`Output: ${outputPath}`);

        // Get input video duration for fade offset
        const inputDuration = await this.getVideoDuration(inputPath);

        // Escape special characters for FFmpeg drawtext
        const escapedName = agentName
          .replace(/\\/g, '\\\\\\\\')
          .replace(/:/g, '\\:')
          .replace(/'/g, '')
          .replace(/"/g, '\\"');

        const escapedCompany = agentCompany
          .replace(/\\/g, '\\\\\\\\')
          .replace(/:/g, '\\:')
          .replace(/'/g, '')
          .replace(/"/g, '\\"');

        const escapedPhone = agentPhone
          .replace(/\\/g, '\\\\\\\\')
          .replace(/:/g, '\\:')
          .replace(/'/g, '')
          .replace(/"/g, '\\"');

        const endScreenFilter =
          `drawtext=text='${escapedName}':fontsize=60:fontcolor=white:x=(w-text_w)/2:y=h/3,` +
          `drawtext=text='${escapedCompany}':fontsize=50:fontcolor=white:x=(w-text_w)/2:y=h/2,` +
          `drawtext=text='${escapedPhone}':fontsize=50:fontcolor=white:x=(w-text_w)/2:y=2*h/3,` +
          'format=yuv420p';

        console.log('End screen filter:', endScreenFilter);

        // First, create black end screen with text
        await new Promise<void>((resolveEndScreen, rejectEndScreen) => {
          ffmpeg()
            .input('color=c=black:s=1920x1080:d=' + duration)
            .inputFormat('lavfi')
            .outputOptions([
              '-c:v libx264',
              '-preset slow',
              `-crf ${VIDEO_QUALITY}`,
              '-vf', endScreenFilter,
              '-an', // No audio
            ])
            .output(endScreenPath)
            .on('start', (commandLine) => {
              console.log('Creating end screen - FFmpeg command:', commandLine);
            })
            .on('end', () => {
              console.log(`End screen created: ${endScreenPath}`);
              resolveEndScreen();
            })
            .on('error', (error) => {
              console.error('End screen creation error:', error.message);
              rejectEndScreen(error);
            })
            .run();
        });

        // Now concatenate the videos using concat demuxer (simpler approach)
        // Create concat list file
        const concatListPath = path.join(this.uploadsDir, `concat-end-${uuidv4()}.txt`);
        const concatList = [
          `file '${inputPath.replace(/\\/g, '/')}'`,
          `file '${endScreenPath.replace(/\\/g, '/')}'`
        ].join('\n');

        fs.writeFileSync(concatListPath, concatList);

        ffmpeg()
          .input(concatListPath)
          .inputOptions(['-f concat', '-safe 0'])
          .outputOptions([
            '-c:v libx264',
            '-preset slow',
            `-crf ${VIDEO_QUALITY}`,
            '-an',
            '-vf format=yuv420p',
          ])
          .output(outputPath)
          .on('start', (commandLine) => {
            console.log('Concatenating with fade - FFmpeg command:', commandLine);
          })
          .on('progress', (progress) => {
            console.log(`Adding end screen with fade: ${progress.percent?.toFixed(2)}% done`);
          })
          .on('end', () => {
            console.log(`End screen added: ${outputPath}`);
            // Cleanup temporary files
            try {
              if (fs.existsSync(concatListPath)) {
                fs.unlinkSync(concatListPath);
              }
              if (fs.existsSync(endScreenPath)) {
                fs.unlinkSync(endScreenPath);
                console.log(`Cleaned up temp end screen: ${endScreenPath}`);
              }
              if (fs.existsSync(inputPath)) {
                fs.unlinkSync(inputPath);
                console.log(`Cleaned up input file: ${inputPath}`);
              }
            } catch (cleanupError: any) {
              console.warn(`Failed to cleanup temp files: ${cleanupError.message}`);
            }
            resolve(outputPath);
          })
          .on('error', (error) => {
            console.error('FFmpeg concatenation error:', error.message);
            // Cleanup temporary files on error
            try {
              if (fs.existsSync(concatListPath)) {
                fs.unlinkSync(concatListPath);
              }
              if (fs.existsSync(endScreenPath)) {
                fs.unlinkSync(endScreenPath);
              }
            } catch (cleanupError: any) {
              console.warn(`Failed to cleanup on error: ${cleanupError.message}`);
            }
            reject(new FFmpegError(`End screen concatenation failed: ${error.message}`));
          })
          .run();
      } catch (error: any) {
        reject(new FFmpegError(`End screen creation failed: ${error.message}`));
      }
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
