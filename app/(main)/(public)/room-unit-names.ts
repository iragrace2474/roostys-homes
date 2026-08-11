// Frontend-only individual-unit names, for room types made up of separately
// named units rather than identical numbered ones (e.g. named cottages).
// Rooms with no entry here just get generic "Room 1, Room 2, ..." on their
// detail page instead. Keep each list's length in sync with that room's
// `quantity` in the database.
export const ROOM_UNIT_NAMES: Record<string, string[]> = {
  'deluxe-cottage': [
    'Moses',
    'Amos',
    'Malachi',
    'Joel',
    'Jeremiah',
    'Daniel',
    'Isaiah',
    'Ezekiel',
    'Elijah',
    'Samuel',
    'Elisha',
    'Micah',
  ],
  'family-cottages': ['Anna', 'Miriam', 'Deborah'],
};

// What to call one of the named units above in copy ("Every cottage is...",
// "Which room would you like?"). Defaults to "room" when a slug has no entry.
export const ROOM_UNIT_NOUNS: Record<string, string> = {
  'deluxe-cottage': 'cottage',
};

export function unitNounFor(slug: string): string {
  return ROOM_UNIT_NOUNS[slug] ?? 'room';
}
