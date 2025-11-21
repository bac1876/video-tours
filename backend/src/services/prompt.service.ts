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
      // EXTERIOR: Slow zoom/approach is OK
      prompt += `Slow cinematic approach toward the house. `;
      prompt += `Camera gently moves forward, getting slightly closer to showcase the property. `;
      prompt += `Smooth, slow dolly forward taking the full ${VIDEO_DURATION} seconds. `;
      prompt += `Maintain stable, professional real estate video feel. `;
      prompt += `STATIC SCENE: Trees, plants, grass, and all objects must remain completely still. `;
      prompt += `No wind, no movement of foliage, no swaying branches. `;
    } else if (isSmallRoom) {
      // SMALL ROOM (bedroom, bathroom): Rotation only, no zoom
      prompt += `Simulate a person standing still in the center of the room, slowly rotating their head to look around. `;
      prompt += `The camera rotates horizontally in place - like standing on a lazy susan that slowly turns. `;
      prompt += `The viewer slowly turns their gaze from left to right across the visible room. `;
      prompt += `Take the full ${VIDEO_DURATION} seconds for this slow, smooth rotation. `;
      prompt += `CRITICAL: Do NOT zoom in or out. Do NOT move the camera forward or backward. `;
      prompt += `The camera position stays fixed - ONLY the viewing angle changes. `;
      prompt += `No dolly, no push-in, no zoom - only rotation in place. `;
      prompt += `STATIC SCENE: Curtains, furniture, and all objects must remain completely still. `;
    } else {
      // LARGE INTERIOR ROOM: Slow movement/zoom is OK
      prompt += `Smooth camera movement through the space. `;
      prompt += `Camera can gently move forward or pan across the room to showcase the space. `;
      prompt += `Slow, cinematic movement taking the full ${VIDEO_DURATION} seconds. `;
      prompt += `Professional real estate walkthrough feel. `;
      prompt += `STATIC SCENE: Curtains, furniture, and all objects must remain completely still. `;
    }

    // Common constraints
    prompt += `ONLY the camera moves - nothing else. `;
    prompt += `All objects, fabrics, and elements are frozen in place. `;
    prompt += `Stop before revealing any area not visible in the input image. `;
    prompt += `Only show areas actually captured in the source photo. `;
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
