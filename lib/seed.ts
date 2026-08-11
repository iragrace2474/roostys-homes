import { createRoom, createService, listRooms, listServices, withRetry } from './db';

// Multiple Next.js build workers can all see empty tables and race to seed
// simultaneously — withRetry() handles lock contention, but the loser of
// the race can still hit a UNIQUE constraint violation (the winner already
// inserted that slug). That's a fine outcome here — it just means seeding
// already happened — so it's swallowed rather than crashing that worker's
// page render.
function seedInsert(fn: () => void): void {
  try {
    withRetry(fn);
  } catch (err) {
    console.error('[seed] skipping one row after error (likely a concurrent seed race):', err);
  }
}

// Seeds the real Roosty's Homes content gathered earlier (room types with
// real prices/capacity, real advertised service categories) so the site
// launches with real data instead of placeholders. Runs once — no-ops if
// rooms/services already exist. Blog posts are intentionally NOT seeded;
// there's no real content for them yet, so the admin adds real posts.
export function seedIfEmpty() {
  if (listRooms(false).length === 0) {
    const rooms = [
      {
        // PLACEHOLDER — added at the user's request with a stand-in photo and
        // rough price/size/capacity, to be replaced with real ones later.
        slug: 'studio-room',
        name: 'Studio Room',
        description: 'A cozy open-plan studio, perfect for solo travelers or a short stay.',
        price: 180000,
        price_unit: 'per night',
        max_guests: 2,
        size_sqm: 150,
        images: ['/roosty-photos/real/1bd-01.jpg'],
        sort_order: 0,
        active: 1 as const,
        quantity: 1,
      },
      {
        slug: 'one-bedroom-occupancy',
        name: 'One Bedroom Occupancy',
        description: 'Ideal for couples or solo guests, with easy access to the gardens and restaurant.',
        price: 200000,
        price_unit: 'per night',
        max_guests: 2,
        size_sqm: 190,
        images: [
          '/roosty-photos/real/1bd-01.jpg',
          '/roosty-photos/real/1bd-02.jpg',
          '/roosty-photos/real/1bd-03.jpg',
          '/roosty-photos/real/1bd-04.jpg',
          '/roosty-photos/real/1bd-05.jpg',
        ],
        sort_order: 1,
        active: 1 as const,
        quantity: 2,
      },
      {
        slug: 'deluxe-cottage',
        name: 'Deluxe Cottage',
        description:
          'A private standalone cottage set among the gardens, offering more space and quiet away from the main building.',
        price: 200000,
        price_unit: 'per night',
        max_guests: 2,
        size_sqm: 600,
        images: [
          '/roosty-photos/real/cottage-01.jpg',
          '/roosty-photos/real/cottage-02.jpg',
          '/roosty-photos/real/cottage-03.jpg',
          '/roosty-photos/real/cottage-04.jpg',
          '/roosty-photos/real/exterior-01.jpg',
        ],
        sort_order: 2,
        active: 1 as const,
        quantity: 12,
      },
      {
        slug: 'two-bedroom-occupancy',
        name: 'Two Bedroom Occupancy (Rooms 5 & 6)',
        description:
          'A spacious two-bedroom unit well suited to small groups or families, with a shared living area.',
        price: 250000,
        price_unit: 'per night',
        max_guests: 4,
        size_sqm: 150,
        images: [
          '/roosty-photos/real/livingroom-01.jpg',
          '/roosty-photos/real/livingroom-02.jpg',
          '/roosty-photos/real/livingroom-03.jpg',
          '/roosty-photos/real/livingroom-04.jpg',
        ],
        sort_order: 3,
        active: 1 as const,
        quantity: 2,
      },
      {
        slug: 'two-bedroom-occupancy-3-4',
        name: 'Two Bedroom Occupancy (Rooms 3 & 4)',
        description:
          'A spacious two-bedroom unit well suited to small groups or families, with a shared living area — Room 3 has twin beds, Room 4 has a queen bed, so you can pick whichever suits your group.',
        price: 250000,
        price_unit: 'per night',
        max_guests: 6,
        size_sqm: 150,
        images: ['/roosty-photos/real/twin-01.jpg', '/roosty-photos/real/twin-02.jpg'],
        sort_order: 4,
        active: 1 as const,
        quantity: 2,
      },
      {
        slug: 'family-suite',
        name: 'Family Suite',
        description:
          'Our largest unit, built for families — generous living space with easy access to the kids’ play area and gardens.',
        price: 350000,
        price_unit: 'per night',
        max_guests: 4,
        size_sqm: 400,
        images: [
          '/roosty-photos/real/family-anna-room.jpg',
          '/roosty-photos/real/family-exterior.jpg',
          '/roosty-photos/real/family-dining.jpg',
        ],
        sort_order: 5,
        active: 1 as const,
        quantity: 3,
      },
    ];
    for (const room of rooms) seedInsert(() => createRoom(room));
  }

  if (listServices(false).length === 0) {
    const services = [
      {
        slug: 'bar-restaurant',
        name: 'Bar & Restaurant',
        description:
          'Great food, cold drinks and good company — our restaurant and bar serve guests and walk-ins alike, day and night.',
        image: '/roosty-photos/real/restaurant-01.jpg',
        sort_order: 1,
        active: 1 as const,
      },
      {
        slug: 'party-gardens',
        name: 'Party Gardens',
        description:
          'Beautiful gardens available for hire — weddings, parties and functions, with space for tents, seating and catering.',
        image: '/roosty-photos/real/exterior-01.jpg',
        sort_order: 2,
        active: 1 as const,
      },
      {
        slug: 'kids-play-area',
        name: "Kids' Play Area",
        description: 'A safe, fun playground for the little ones to enjoy while you relax.',
        image: '/roosty-photos/g-7.jpg',
        sort_order: 3,
        active: 1 as const,
      },
      {
        slug: 'pool-table',
        name: 'Pool Table',
        description: 'A pool table in the bar area for guests looking for a bit of fun in the evening.',
        image: '/roosty-photos/restaurant-1.jpg',
        sort_order: 4,
        active: 1 as const,
      },
      {
        slug: 'room-service',
        name: 'Room Service',
        description: 'Food and drinks brought straight to your room or cottage on request.',
        image: '/roosty-photos/real/kitchen-01.jpg',
        sort_order: 5,
        active: 1 as const,
      },
      {
        slug: 'cocktails-fresh-juice',
        name: 'Cocktails & Fresh Juice',
        description: 'A full bar with cocktails, cold beers, and fresh juice made to order.',
        image: null,
        sort_order: 6,
        active: 1 as const,
      },
      {
        slug: 'car-parking',
        name: 'Car Parking',
        description: 'Free, secure parking on the premises for all guests.',
        image: null,
        sort_order: 7,
        active: 1 as const,
      },
      {
        slug: 'secure-premises',
        name: 'Secure Premises',
        description: 'Gated, walled grounds with controlled access and attentive staff around the clock.',
        image: '/roosty-photos/real/exterior-03.jpg',
        sort_order: 8,
        active: 1 as const,
      },
    ];
    for (const service of services) seedInsert(() => createService(service));
  }
}

// Run once at module load (imported from the root layout) — cheap no-op
// check on every subsequent request/reload since it only inserts when empty.
seedIfEmpty();
