import OpenAI from 'openai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.warn('Warning: OPENAI_API_KEY not set. Vision analysis will be skipped.');
}

export interface VisionAnalysis {
  roomType: string;
  spatialDescription: string;
  objects: Array<{
    name: string;
    position: string;
  }>;
  rawAnalysis: string;
}

export class VisionService {
  private client: OpenAI | null = null;

  constructor() {
    if (OPENAI_API_KEY) {
      this.client = new OpenAI({
        apiKey: OPENAI_API_KEY,
      });
    }
  }

  async analyzeRoomImage(imageUrl: string): Promise<VisionAnalysis | null> {
    if (!this.client) {
      console.log('OpenAI client not initialized. Skipping vision analysis.');
      return null;
    }

    try {
      console.log('Analyzing room image with GPT-5 Vision...');
      console.log('Image URL:', imageUrl);

      const response = await this.client.chat.completions.create({
        model: 'gpt-4o', // Using gpt-4o (latest available as of SDK version)
        messages: [
          {
            role: 'system',
            content: `You are an expert at analyzing interior room photographs for real estate virtual tours.
Your task is to provide extremely detailed spatial descriptions focusing on:
1. Exact object positions (left wall, right wall, center, back wall, etc.)
2. Spatial relationships between objects (facing, adjacent to, across from, etc.)
3. Architectural features (doors, windows, fireplaces, built-ins)

Be precise and use clear directional language. This analysis will be used to generate video prompts that must maintain spatial consistency.`,
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this room photo and provide:

1. ROOM TYPE: What type of room is this? (e.g., "living room", "kitchen", "bedroom")

2. SPATIAL LAYOUT: Describe the exact positions of ALL visible objects and architectural features using precise directional language:
   - What's on the LEFT wall?
   - What's on the RIGHT wall?
   - What's in the CENTER of the room?
   - What's on the BACK wall (if visible)?
   - What's on the FRONT/foreground?

3. OBJECT LIST: List each major object with its exact position (format: "object - position")

4. KEY SPATIAL RELATIONSHIPS: Describe how objects relate to each other (e.g., "sofa faces the TV", "island is centered between the stove and refrigerator")

Be extremely specific about positions. Use terms like "left wall", "right wall", "center of room", "back corner", etc.`,
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl,
                  detail: 'high',
                },
              },
            ],
          },
        ],
        max_tokens: 1000,
      });

      const rawAnalysis = response.choices[0]?.message?.content || '';
      console.log('Vision analysis complete:');
      console.log(rawAnalysis);

      // Parse the response to extract structured data
      const analysis = this.parseAnalysis(rawAnalysis);

      return analysis;
    } catch (error: any) {
      console.error('Vision analysis failed:', error.message);
      return null;
    }
  }

  private parseAnalysis(rawAnalysis: string): VisionAnalysis {
    // Extract room type
    const roomTypeMatch = rawAnalysis.match(/ROOM TYPE:?\s*(.+?)(?:\n|$)/i);
    const roomType = roomTypeMatch ? roomTypeMatch[1].trim() : 'room';

    // Extract spatial layout section
    const spatialMatch = rawAnalysis.match(
      /SPATIAL LAYOUT:?\s*([\s\S]+?)(?=OBJECT LIST|KEY SPATIAL|$)/i
    );
    const spatialDescription = spatialMatch ? spatialMatch[1].trim() : rawAnalysis;

    // Extract object list
    const objects: Array<{ name: string; position: string }> = [];
    const objectListMatch = rawAnalysis.match(
      /OBJECT LIST:?\s*([\s\S]+?)(?=KEY SPATIAL|$)/i
    );

    if (objectListMatch) {
      const objectLines = objectListMatch[1].split('\n');
      for (const line of objectLines) {
        const match = line.match(/[-•*]?\s*(.+?)\s*[-–—:]\s*(.+)/);
        if (match) {
          objects.push({
            name: match[1].trim(),
            position: match[2].trim(),
          });
        }
      }
    }

    return {
      roomType,
      spatialDescription,
      objects,
      rawAnalysis,
    };
  }

  /**
   * Generate a prompt-friendly description from vision analysis
   */
  generateSpatialPrompt(analysis: VisionAnalysis): string {
    let prompt = `This is a ${analysis.roomType}. `;

    // Add object positions
    if (analysis.objects.length > 0) {
      const objectDescriptions = analysis.objects
        .map((obj) => `${obj.name} on ${obj.position}`)
        .join(', ');
      prompt += `Visible elements: ${objectDescriptions}. `;
    }

    prompt += 'Keep all these objects in their exact positions throughout the video. ';

    return prompt;
  }
}

export const visionService = new VisionService();
