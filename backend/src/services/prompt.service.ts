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
  generateRoomPrompt(
    roomIndex?: number,
    roomDescription?: string,
    isExterior?: boolean,
    isSmallRoom?: boolean
  ): string {
    let prompt = '';

    if (roomDescription) {
      prompt += `This scene contains: ${roomDescription}. `;
      prompt += `Keep all these elements in their exact positions. `;
    }

    // First image is assumed to be exterior, or AI detected exterior
    const isExteriorShot = roomIndex === 0 || isExterior === true;

    if (isExteriorShot) {
      // EXTERIOR: Minimal movement to avoid window hallucinations
      prompt += `Very gentle, subtle camera movement showcasing the exterior. `;
      prompt += `Camera can drift forward slightly, but maintain distance from the house. `;
      prompt += `Slow, steady shot taking the full ${VIDEO_DURATION} seconds. `;
      prompt += `CRITICAL: Do NOT zoom into windows or glass surfaces. `;
      prompt += `Do NOT reveal or create interior details visible through windows. `;
      prompt += `Maintain stable, professional real estate video feel. `;
      prompt += `Trees, plants, grass, and foliage remain still - no wind effect. `;
      prompt += `Do NOT add any ceiling fans, light fixtures, or indoor elements to outdoor scenes. `;
    } else if (isSmallRoom) {
      // SMALL ROOM (bedroom, bathroom): Rotation only, no zoom
      prompt += `Simulate a person standing still in the center of the room, slowly rotating their head to look around. `;
      prompt += `The camera rotates horizontally in place - like standing on a lazy susan that slowly turns. `;
      prompt += `The viewer slowly turns their gaze from left to right across the visible room. `;
      prompt += `Take the full ${VIDEO_DURATION} seconds for this slow, smooth rotation. `;
      prompt += `CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. `;
      prompt += `CRITICAL: Do NOT zoom in or out. Do NOT move the camera forward or backward. `;
      prompt += `The camera position stays fixed - ONLY the viewing angle changes. `;
      prompt += `No dolly, no push-in, no zoom - only rotation in place. `;
      prompt += `ONLY allow existing ceiling fans already visible in the source image to spin their blades slowly. `;
      prompt += `Do NOT add ceiling fans or light fixtures that are not in the source image. `;
      prompt += `Towels, curtains, and all fabrics remain completely still with no air movement. `;
    } else {
      // LARGE INTERIOR ROOM: Slow movement/zoom is OK
      prompt += `Smooth, constant-speed camera movement through the space. `;
      prompt += `Camera can gently move forward or pan across the room to showcase the space. `;
      prompt += `CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. `;
      prompt += `Slow, cinematic movement taking the full ${VIDEO_DURATION} seconds. `;
      prompt += `Professional real estate walkthrough feel. `;
      prompt += `ONLY allow existing ceiling fans already visible in the source image to spin their blades slowly. `;
      prompt += `Do NOT add ceiling fans or light fixtures that are not in the source image. `;
      prompt += `Towels, curtains, and all fabrics remain completely still with no air movement. `;
    }

    // Common constraints - CRITICAL: No hallucinations
    prompt += `CRITICAL: Use ONLY elements visible in the source image. `;
    prompt += `Do NOT add curtains, window treatments, furniture, or decorative elements. `;
    prompt += `Do NOT create or imagine any elements not in the input image. `;
    prompt += `Stop before revealing any area not visible in the input image. `;
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
