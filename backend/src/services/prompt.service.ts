import { RoomType } from './roomDetection.service';

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

    // Only use exterior prompt when AI detects it as exterior
    const isExteriorShot = isExterior === true;

    if (isExteriorShot) {
      // EXTERIOR: Cinemagraph style - static architecture, only natural movement
      prompt += `Cinemagraph style. Static house architecture. Static roof. Static eaves. Static structure. `;
      prompt += `The building, walls, roof, windows, doors, and all architectural elements remain completely frozen and unchanged. `;
      prompt += `Only natural outdoor movement: gentle leaf sway, grass movement, clouds drifting, water rippling if present. `;
      prompt += `Camera holds steady or drifts very slightly - no zoom, no push-in, no dolly forward. `;
      prompt += `This is an exterior establishing shot over ${VIDEO_DURATION} seconds. `;
      prompt += `Preserve exact pixel structure of the house - no new architectural details. `;
    } else if (isSmallRoom) {
      // SMALL ROOM (bedroom, bathroom): Rotation only, no zoom
      prompt += `Simulate a person standing still in the center of the room, slowly rotating their head to look around. `;
      prompt += `The camera rotates horizontally in place - like standing on a lazy susan that slowly turns. `;
      prompt += `The viewer slowly turns their gaze from left to right across the visible room. `;
      prompt += `Take the full ${VIDEO_DURATION} seconds for this slow, smooth rotation. `;
      prompt += `CRITICAL: Do NOT zoom in or out. Do NOT move the camera forward or backward. `;
      prompt += `The camera position stays fixed - ONLY the viewing angle changes. `;
      prompt += `No dolly, no push-in, no zoom - only rotation in place. `;
      prompt += `ONLY allow existing ceiling fans already visible in the source image to spin their blades slowly. `;
      prompt += `Do NOT add ceiling fans or light fixtures that are not in the source image. `;
      prompt += `Towels, curtains, and all fabrics remain completely still with no air movement. `;
    } else {
      // LARGE INTERIOR ROOM: Slow movement/zoom is OK
      prompt += `Smooth camera movement through the space. `;
      prompt += `Camera can gently move forward or pan across the room to showcase the space. `;
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

  /**
   * Generate prompt based on detected room type from filename
   */
  generateRoomPromptByType(roomType: RoomType, roomDescription?: string): string {
    let prompt = '';

    if (roomDescription) {
      prompt += `This scene contains: ${roomDescription}. `;
    }

    switch (roomType) {
      case 'front_exterior':
        // FRONT: Slow push-in toward house is safe (no windows to zoom into)
        prompt += `Exterior front shot of house. `;
        prompt += `Camera slowly pushes forward toward the house entrance. `;
        prompt += `Smooth, cinematic approach over ${VIDEO_DURATION} seconds. `;
        prompt += `Real estate showcase feel - welcoming and inviting. `;
        prompt += `Maintain static architecture - house structure does not change. `;
        prompt += `Do NOT add any elements not visible in the source image. `;
        break;

      case 'back_exterior':
        // BACKYARD: Cinemagraph style - NO forward movement (prevents window hallucinations)
        prompt += `Cinemagraph style. Static house architecture. Static roof. Static eaves. `;
        prompt += `Camera holds completely steady - NO zoom, NO push-in, NO dolly. `;
        prompt += `Only very subtle ambient movement. `;
        prompt += `This is an exterior establishing shot over ${VIDEO_DURATION} seconds. `;
        prompt += `Preserve exact pixel structure of the house - no new architectural details. `;
        prompt += `Do NOT add ceiling fans, light fixtures, or any indoor elements. `;
        break;

      case 'bedroom':
      case 'bathroom':
      case 'office':
        // SMALL ROOMS: Rotation only, no zoom
        prompt += `Camera rotates slowly in place - like standing on a lazy susan. `;
        prompt += `The viewer slowly turns their gaze across the room. `;
        prompt += `NO zoom in or out. NO forward/backward movement. `;
        prompt += `Only the viewing angle changes over ${VIDEO_DURATION} seconds. `;
        prompt += `ONLY allow existing ceiling fans already visible in the source image to spin slowly. `;
        prompt += `Do NOT add ceiling fans or light fixtures that are not in the source image. `;
        break;

      default:
        // LARGE INTERIOR ROOMS (kitchen, living, dining, etc.): Movement OK
        prompt += `Smooth camera movement through the space. `;
        prompt += `Camera can gently move forward or pan across the room. `;
        prompt += `Slow, cinematic movement over ${VIDEO_DURATION} seconds. `;
        prompt += `Professional real estate walkthrough feel. `;
        prompt += `ONLY allow existing ceiling fans already visible in the source image to spin slowly. `;
        prompt += `Do NOT add ceiling fans or light fixtures that are not in the source image. `;
    }

    // Common anti-hallucination constraints
    prompt += `CRITICAL: Use ONLY elements visible in the source image. `;
    prompt += `Do NOT add furniture, fixtures, decorations, or window treatments. `;
    prompt += `Maintain exact object positions from the input image.`;

    return prompt;
  }
}

export const promptService = new PromptService();
