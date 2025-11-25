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
      // EXTERIOR: Minimal movement, strict anti-hallucination
      prompt += `EXTERIOR SHOT - This is an OUTDOOR scene. `;
      prompt += `Very gentle, subtle camera movement showcasing the exterior of the building. `;
      prompt += `Camera can drift forward slightly, but maintain distance from the house. `;
      prompt += `Slow, steady shot taking the full ${VIDEO_DURATION} seconds. `;
      prompt += `CRITICAL: Maintain CONSTANT speed throughout - no speeding up or slowing down. `;
      prompt += `CRITICAL: Do NOT zoom into windows or glass surfaces. `;
      prompt += `Do NOT reveal or create interior details visible through windows. `;
      prompt += `Trees, plants, grass, and foliage remain still - no wind effect. `;
      prompt += `ABSOLUTE PROHIBITION - DO NOT ADD: ceiling fans, indoor light fixtures, chandeliers, pendant lights, indoor furniture, curtains, drapes, window treatments, or ANY indoor elements. `;
      prompt += `This is OUTSIDE - there are NO ceiling fans outdoors. There are NO indoor fixtures outdoors. `;
      prompt += `If you see sky, grass, trees, or building exterior - this is OUTDOOR and must have ZERO indoor elements. `;
    } else if (isSmallRoom) {
      // SMALL ROOM (bedroom, bathroom): Rotation only, no zoom
      prompt += `INTERIOR ROOM - Simulate a person standing still in the center, slowly rotating their head to look around. `;
      prompt += `The camera rotates horizontally in place - like standing on a lazy susan that slowly turns. `;
      prompt += `Take the full ${VIDEO_DURATION} seconds for this slow, smooth rotation. `;
      prompt += `CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. `;
      prompt += `CRITICAL: Do NOT zoom in or out. Do NOT move the camera forward or backward. `;
      prompt += `The camera position stays fixed - ONLY the viewing angle changes. `;
      prompt += `No dolly, no push-in, no zoom - only rotation in place. `;
    } else {
      // LARGE INTERIOR ROOM: Slow movement/zoom is OK
      prompt += `INTERIOR ROOM - Smooth, constant-speed camera movement through the space. `;
      prompt += `Camera can gently move forward or pan across the room to showcase the space. `;
      prompt += `CRITICAL: Maintain CONSTANT speed throughout - no speeding up, no slowing down, no acceleration. `;
      prompt += `Slow, cinematic movement taking the full ${VIDEO_DURATION} seconds. `;
      prompt += `Professional real estate walkthrough feel. `;
    }

    // STRICT ANTI-HALLUCINATION RULES - Apply to ALL shots
    prompt += `STRICT RULES - DO NOT VIOLATE: `;
    prompt += `1. NEVER add ceiling fans that are not already in the source image. `;
    prompt += `2. NEVER add curtains, drapes, or window treatments that are not in the source image. `;
    prompt += `3. NEVER add windows or doors that are not in the source image. `;
    prompt += `4. NEVER add furniture, fixtures, or decorations not in the source image. `;
    prompt += `5. NEVER add light fixtures, chandeliers, or pendant lights not in the source image. `;
    prompt += `6. If a ceiling fan EXISTS in the source image, it may spin slowly. Otherwise NO ceiling fans. `;
    prompt += `7. All curtains, towels, and fabrics must remain COMPLETELY STILL - no movement, no wind. `;
    prompt += `8. Stop motion BEFORE revealing any area not visible in the source image. `;
    prompt += `9. Preserve EXACT positions of all objects from the source image. `;
    prompt += `OUTPUT ONLY what exists in the input image - add NOTHING new.`;

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
