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
    // Simplified prompt using standard cinematography terms
    let prompt = '';

    if (roomDescription) {
      // Use room description to create explicit spatial anchors
      prompt += `This room contains: ${roomDescription}. `;
      prompt += `Keep all these objects in their exact positions. `;
    }

    // Camera movement with 150-degree rotation
    prompt += `Slow horizontal camera pan from left to right covering 150 degrees. `;
    prompt += `Camera stays in one fixed spot at eye level. `;
    prompt += `Very slow smooth pan taking the full ${VIDEO_DURATION} seconds. `;
    prompt += `Do not zoom in or out. `;

    // CRITICAL: Stop before unseen areas
    prompt += `CRITICAL - Stop camera movement before revealing any wall or area not visible in the input image. `;
    prompt += `Only pan across areas that are actually shown in the source photo. `;
    prompt += `If 150 degrees would show unseen areas, STOP the pan earlier. `;
    prompt += `Do NOT create, synthesize, or imagine any walls, doors, windows, or furniture not in the input image. `;
    prompt += `The input photo is the ONLY source - do not add anything beyond what's captured there. `;

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
