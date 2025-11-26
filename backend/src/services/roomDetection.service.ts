export type RoomType =
  | 'front_exterior'
  | 'back_exterior'
  | 'bedroom'
  | 'bathroom'
  | 'kitchen'
  | 'living_room'
  | 'dining_room'
  | 'office'
  | 'garage'
  | 'unknown';

export interface RoomDetection {
  roomType: RoomType;
  isExterior: boolean;
  isSmallRoom: boolean;
}

/**
 * Detect room type from filename
 * Examples: front.jpg, backyard.png, bedroom1.jpg, masterbath.jpg
 */
export function detectRoomFromFilename(filename: string): RoomDetection {
  const name = filename.toLowerCase();

  // Front exterior detection
  if (name.includes('front') || name.includes('exterior') || name.includes('curb')) {
    return { roomType: 'front_exterior', isExterior: true, isSmallRoom: false };
  }

  // Back exterior detection (backyard, patio, deck, pool)
  if (name.includes('back') || name.includes('yard') || name.includes('patio') ||
      name.includes('deck') || name.includes('pool') || name.includes('garden')) {
    return { roomType: 'back_exterior', isExterior: true, isSmallRoom: false };
  }

  // Small room detection
  if (name.includes('bed') || name.includes('master') && !name.includes('bath')) {
    return { roomType: 'bedroom', isExterior: false, isSmallRoom: true };
  }
  if (name.includes('bath') || name.includes('powder') || name.includes('shower')) {
    return { roomType: 'bathroom', isExterior: false, isSmallRoom: true };
  }
  if (name.includes('office') || name.includes('study') || name.includes('den')) {
    return { roomType: 'office', isExterior: false, isSmallRoom: true };
  }
  if (name.includes('laundry') || name.includes('closet') || name.includes('pantry')) {
    return { roomType: 'office', isExterior: false, isSmallRoom: true };
  }

  // Large room detection
  if (name.includes('kitchen')) {
    return { roomType: 'kitchen', isExterior: false, isSmallRoom: false };
  }
  if (name.includes('living') || name.includes('family') || name.includes('great') || name.includes('lounge')) {
    return { roomType: 'living_room', isExterior: false, isSmallRoom: false };
  }
  if (name.includes('dining')) {
    return { roomType: 'dining_room', isExterior: false, isSmallRoom: false };
  }
  if (name.includes('garage')) {
    return { roomType: 'garage', isExterior: false, isSmallRoom: false };
  }
  if (name.includes('basement') || name.includes('bonus') || name.includes('game')) {
    return { roomType: 'living_room', isExterior: false, isSmallRoom: false };
  }

  // Unknown - will fall back to vision analysis
  return { roomType: 'unknown', isExterior: false, isSmallRoom: false };
}

export const roomDetectionService = {
  detectRoomFromFilename,
};
