import axios from 'axios';
import { GrokAPIError } from '../utils/errors';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds
const POLLING_INTERVAL = 10000; // 10 seconds
const MAX_POLL_TIME = 300000; // 5 minutes

const KIE_API_KEY = process.env.KIE_API_KEY;
const KIE_API_URL = process.env.KIE_API_URL || 'https://api.kie.ai/api/v1';
const VIDEO_DURATION = parseInt(process.env.VIDEO_DURATION || '5');

interface KieCreateTaskResponse {
  code: number;
  message: string;
  data: {
    taskId: string;
  };
}

interface KieTaskStatus {
  code: number;
  message: string;
  data: {
    taskId: string;
    state: 'queuing' | 'processing' | 'generating' | 'success' | 'fail';
    resultJson?: string;
    failCode?: string;
    failMsg?: string;
  };
}

interface KieResultJson {
  resultUrls: string[];
  videoUrl?: string;
}

export class GrokService {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    if (!KIE_API_KEY) {
      throw new Error('KIE_API_KEY is not configured');
    }

    this.apiKey = KIE_API_KEY.trim();
    this.apiUrl = KIE_API_URL;
  }

  async generateVideo(
    imageUrl: string,
    prompt: string,
    retryCount = 0
  ): Promise<string> {
    try {
      console.log(`Generating video with Grok API (attempt ${retryCount + 1}/${MAX_RETRIES})`);
      console.log(`Image URL: ${imageUrl}`);
      console.log(`Prompt: ${prompt}`);

      // Step 1: Create task
      const taskId = await this.createTask(imageUrl, prompt);
      console.log(`Task created with ID: ${taskId}`);

      // Step 2: Poll for completion
      const videoUrl = await this.pollForVideo(taskId);
      console.log(`Video generated successfully: ${videoUrl}`);

      return videoUrl;
    } catch (error: any) {
      console.error(`Grok API error (attempt ${retryCount + 1}):`, error.message);

      if (retryCount < MAX_RETRIES - 1) {
        console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
        await this.sleep(RETRY_DELAY);
        return this.generateVideo(imageUrl, prompt, retryCount + 1);
      }

      throw new GrokAPIError(
        `Failed to generate video after ${MAX_RETRIES} attempts: ${error.message}`
      );
    }
  }

  private async createTask(imageUrl: string, prompt: string): Promise<string> {
    try {
      // Grok outputs 6-second videos by default
      const requestPayload = {
        model: 'grok-imagine/image-to-video', // Grok image-to-video model
        input: {
          prompt: prompt,
          image_urls: [imageUrl], // Must be array format per KIE.ai API spec
          mode: 'normal', // Options: 'fun', 'normal', 'spicy'
        },
      };

      console.log('=== KIE API REQUEST ===');
      console.log('Endpoint:', `${this.apiUrl}/jobs/createTask`);
      console.log('Payload:', JSON.stringify(requestPayload, null, 2));

      const response = await axios.post<KieCreateTaskResponse>(
        `${this.apiUrl}/jobs/createTask`,
        requestPayload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      );

      console.log('=== KIE API RESPONSE ===');
      console.log('Status:', response.status);
      console.log('Data:', JSON.stringify(response.data, null, 2));

      if (response.data.code !== 200) {
        throw new GrokAPIError(`Failed to create task: ${response.data.message}`);
      }

      return response.data.data.taskId;
    } catch (error: any) {
      console.error('=== KIE API ERROR ===');
      if (error.response) {
        console.error('Status Code:', error.response.status);
        console.error('Response Data:', JSON.stringify(error.response.data, null, 2));
        console.error('Response Headers:', JSON.stringify(error.response.headers, null, 2));
        throw new GrokAPIError(
          `KIE API error (${error.response.status}): ${JSON.stringify(error.response.data)}`
        );
      }
      console.error('Error Details:', error.message);
      console.error('Full Error:', JSON.stringify(error, null, 2));
      throw new GrokAPIError(`Failed to create task: ${error.message}`);
    }
  }

  private async pollForVideo(taskId: string): Promise<string> {
    const startTime = Date.now();

    while (Date.now() - startTime < MAX_POLL_TIME) {
      try {
        const response = await axios.get<KieTaskStatus>(
          `${this.apiUrl}/jobs/recordInfo`,
          {
            params: { taskId },
            headers: {
              'Authorization': `Bearer ${this.apiKey}`,
            },
          }
        );

        if (response.data.code !== 200) {
          throw new GrokAPIError(`Failed to check status: ${response.data.message}`);
        }

        const state = response.data.data.state;
        console.log(`Task ${taskId} status: ${state}`);

        if (state === 'success') {
          // Parse the resultJson to get video URL
          if (!response.data.data.resultJson) {
            throw new GrokAPIError('No result JSON in successful response');
          }

          const resultJson: KieResultJson = JSON.parse(response.data.data.resultJson);

          // Video URL might be in resultUrls array or videoUrl field
          const videoUrl = resultJson.videoUrl || resultJson.resultUrls?.[0];

          if (!videoUrl) {
            throw new GrokAPIError('No video URL in result');
          }

          return videoUrl;
        }

        if (state === 'fail') {
          const errorMsg = response.data.data.failMsg || 'Unknown error';
          throw new GrokAPIError(`Video generation failed: ${errorMsg}`);
        }

        // States: queuing, processing, generating - keep polling
        console.log(`Video generation in progress (${state})... polling again in ${POLLING_INTERVAL / 1000}s`);
        await this.sleep(POLLING_INTERVAL);
      } catch (error: any) {
        if (error instanceof GrokAPIError) {
          throw error;
        }
        console.error('Error polling for video:', error.message);
        await this.sleep(POLLING_INTERVAL);
      }
    }

    throw new GrokAPIError('Video generation timed out after 5 minutes');
  }

  async downloadVideo(videoUrl: string, outputPath: string): Promise<string> {
    try {
      console.log(`Downloading video from: ${videoUrl}`);

      const response = await axios.get(videoUrl, {
        responseType: 'stream',
        timeout: 120000, // 2 minutes timeout
      });

      const writer = fs.createWriteStream(outputPath);

      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', () => {
          console.log(`Video downloaded successfully to: ${outputPath}`);
          resolve(outputPath);
        });
        writer.on('error', (error) => {
          reject(new GrokAPIError(`Failed to download video: ${error.message}`));
        });
      });
    } catch (error: any) {
      throw new GrokAPIError(`Failed to download video: ${error.message}`);
    }
  }

  generateTempPath(prefix: string = 'video'): string {
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filename = `${prefix}-${uuidv4()}.mp4`;
    return path.join(uploadsDir, filename);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Helper method to get cost estimate
  getCostEstimate(durationSeconds: number = VIDEO_DURATION): number {
    // Using Grok pricing
    return durationSeconds * 0.015;
  }
}

export const grokService = new GrokService();
