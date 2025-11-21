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
  isExterior: boolean;
  isSmallRoom: boolean;
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
      console.log('Analyzing room image with GPT-5 Nano...');
      console.log('Image URL:', imageUrl);

      const response = await this.client.chat.completions.create({
        model: 'gpt-5-nano', // Using GPT-5 Nano for cost-effective vision analysis
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
                text: `Analyze this photo and provide:

1. EXTERIOR OR INTERIOR: Is this an EXTERIOR shot (outside of house, front yard, backyard) or INTERIOR (inside a room)? Answer: "EXTERIOR" or "INTERIOR"

2. ROOM TYPE: What type of space is this? (e.g., "exterior front", "living room", "kitchen", "bedroom", "bathroom", "dining room")

3. ROOM SIZE: Is this a SMALL space (bedroom, bathroom, closet, small office) or LARGE space (living room, kitchen, great room, exterior)? Answer: "SMALL" or "LARGE"

4. SPATIAL LAYOUT: Describe the exact positions of ALL visible objects and architectural features using precise directional language:
   - What's on the LEFT?
   - What's on the RIGHT?
   - What's in the CENTER?
   - What's in the BACK?

5. OBJECT LIST: List each major object with its exact position (format: "object - position")

Be extremely specific about positions.`,
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
        max_completion_tokens: 1000,
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
    // Extract exterior/interior
    const exteriorMatch = rawAnalysis.match(/EXTERIOR OR INTERIOR:?\s*(EXTERIOR|INTERIOR)/i);
    const isExterior = exteriorMatch ? exteriorMatch[1].toUpperCase() === 'EXTERIOR' : false;

    // Extract room type
    const roomTypeMatch = rawAnalysis.match(/ROOM TYPE:?\s*(.+?)(?:\n|$)/i);
    const roomType = roomTypeMatch ? roomTypeMatch[1].trim() : 'room';

    // Extract room size
    const sizeMatch = rawAnalysis.match(/ROOM SIZE:?\s*(SMALL|LARGE)/i);
    const isSmallRoom = sizeMatch ? sizeMatch[1].toUpperCase() === 'SMALL' : false;

    // Also check room type for small room indicators
    const smallRoomTypes = ['bedroom', 'bathroom', 'closet', 'office', 'laundry', 'powder'];
    const isSmallByType = smallRoomTypes.some(type => roomType.toLowerCase().includes(type));

    // Extract spatial layout section
    const spatialMatch = rawAnalysis.match(
      /SPATIAL LAYOUT:?\s*([\s\S]+?)(?=OBJECT LIST|$)/i
    );
    const spatialDescription = spatialMatch ? spatialMatch[1].trim() : rawAnalysis;

    // Extract object list
    const objects: Array<{ name: string; position: string }> = [];
    const objectListMatch = rawAnalysis.match(
      /OBJECT LIST:?\s*([\s\S]+?)$/i
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
      isExterior,
      isSmallRoom: isSmallRoom || isSmallByType,
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
