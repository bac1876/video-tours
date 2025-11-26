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
      // EXTERIOR: Lateral movement only - never move toward the building
      prompt += `Exterior establishing shot with LATERAL camera movement only. `;
      prompt += `Camera slides slowly LEFT TO RIGHT (or right to left) - moving PARALLEL to the building. `;
      prompt += `DO NOT move the camera forward toward the building. DO NOT approach the house. `;
      prompt += `The camera travels sideways, keeping constant distance from all structures. `;
      prompt += `Very slow, smooth slide over ${VIDEO_DURATION} seconds. `;
      prompt += `DO NOT enter any doorways, windows, or openings. Stay completely outside. `;
      prompt += `Windows and doors remain opaque - do not show or create interior rooms. `;
      prompt += `Trees, plants, grass remain completely still - no wind effect. `;
      prompt += `ABSOLUTE PROHIBITION: No ceiling fans (there are none outdoors), no interior elements. `;
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
}

export const promptService = new PromptService();
