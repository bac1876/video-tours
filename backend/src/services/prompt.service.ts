const VIDEO_DURATION = parseInt(process.env.VIDEO_DURATION || '6');

const cameraMotions = [
  'smooth camera pan',
  'slow dolly forward',
  'gentle walkthrough',
  'steady glide',
];

const startPositions = [
  'from the doorway',
  'from the entrance',
  'from the left side',
  'from the right side',
];

export class PromptService {
  generateRoomPrompt(_roomIndex?: number): string {
    // Grok-optimized prompt for smooth 360-degree rotation
    return `Create a smooth 360-degree rotating camera movement as if standing in the center of the room shown in the input image and slowly rotating to view all sides. Maintain a steady position in the middle of the space while the camera pans horizontally around in a complete circle. Take the full video duration to complete one rotation - moving very slowly and gradually. Preserve the exact geometry, layout, decor, and lighting shown in the image. Do NOT hallucinate objects or add elements that are not present. Output a cinematic quality video with smooth, professional rotation suitable for real estate virtual tours.`;
  }

  generateCustomPrompt(
    cameraMotion?: string,
    startPosition?: string,
    additionalInstructions?: string
  ): string {
    const motion = cameraMotion || cameraMotions[0];
    const position = startPosition || startPositions[0];
    const additional = additionalInstructions ? ` ${additionalInstructions}` : '';

    return `Create a realistic video walkthrough of the room shown in the input image. Simulate a natural ${motion} as if a real estate agent is entering the room. Start ${position}, then move forward into the room. Preserve the exact geometry, layout, decor, and lighting shown in the image. Do NOT hallucinate objects or add elements that are not present.${additional} Output a ${VIDEO_DURATION}-second video in cinematic quality.`;
  }

  getVideoDuration(): number {
    return VIDEO_DURATION;
  }
}

export const promptService = new PromptService();
