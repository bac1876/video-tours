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
  generateRoomPrompt(_roomIndex?: number, roomDescription?: string): string {
    let prompt = '';

    if (roomDescription) {
      prompt += `This room contains: ${roomDescription}. `;
      prompt += `Keep all these objects in their exact positions. `;
    }

    // First-person "standing and looking around" perspective
    prompt += `Simulate a person standing still in the center of the room, slowly rotating their head to look around. `;
    prompt += `The camera rotates horizontally in place - like standing on a lazy susan that slowly turns. `;
    prompt += `The viewer slowly turns their gaze from left to right across the visible room. `;
    prompt += `Take the full ${VIDEO_DURATION} seconds for this slow, smooth rotation. `;

    // CRITICAL: No zooming or forward movement
    prompt += `CRITICAL: Do NOT zoom in or out. Do NOT move the camera forward or backward. `;
    prompt += `The camera position stays fixed - ONLY the viewing angle changes. `;
    prompt += `No dolly, no push-in, no zoom - only rotation in place. `;

    // Stop before unseen areas
    prompt += `Stop rotation before revealing any wall or area not visible in the input image. `;
    prompt += `Only rotate across areas actually shown in the source photo. `;
    prompt += `Do NOT create or imagine any elements not in the input image. `;

    prompt += `Maintain exact object positions and lighting from the input image.`;

    return prompt;
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
