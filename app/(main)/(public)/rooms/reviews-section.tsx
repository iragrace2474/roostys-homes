import StarRating from './star-rating';
import ReviewForm from './review-form';

// PLACEHOLDER CONTENT — these are made-up sample reviews, not real guest
// feedback, written in so the section has something to show while there's no
// reviews table/backend yet (see review-form.tsx). Replace with real reviews
// once submissions are actually being collected, and drop this comment.
const SAMPLE_REVIEWS = [
  {
    name: 'Grace N.',
    rating: 5,
    room: 'One Bedroom Occupancy',
    text: 'Comfortable bed, clean bathroom, and the staff were so welcoming. Will definitely come back!',
  },
  {
    name: 'Kevin M.',
    rating: 5,
    room: 'Deluxe Cottage',
    text: 'The cottage was private and peaceful — perfect for a quiet weekend away from the city.',
  },
  {
    name: 'Patricia A.',
    rating: 4,
    room: 'Family Suite',
    text: 'Plenty of space for the whole family and the kids loved the play area. Breakfast could be a little earlier.',
  },
  {
    name: 'Daniel T.',
    rating: 5,
    room: 'Two Bedroom Occupancy (Rooms 5 & 6)',
    text: 'Great value for a group trip. The shared living area made it easy for us to relax together in the evenings.',
  },
  {
    name: 'Esther K.',
    rating: 5,
    room: 'Deluxe Cottage',
    text: 'Booked one of the cottages for our anniversary — beautiful gardens and excellent service throughout.',
  },
];

const AVERAGE_RATING = SAMPLE_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / SAMPLE_REVIEWS.length;

export default function ReviewsSection({ roomNames }: { roomNames: string[] }) {
  return (
    <div className="mt-20 border-t border-forest-100 pt-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="text-sm font-semibold tracking-wide text-forest-600 uppercase">Guest Reviews</span>
          <h2 className="mt-2 text-3xl font-semibold text-forest-900">What Guests Are Saying</h2>
        </div>
        <div className="flex items-center gap-3">
          <StarRating rating={AVERAGE_RATING} className="h-6 w-6" />
          <span className="text-lg font-semibold text-forest-900">{AVERAGE_RATING.toFixed(1)} out of 5</span>
          <span className="text-sm text-ink-soft">&middot; {SAMPLE_REVIEWS.length} reviews</span>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SAMPLE_REVIEWS.map((r) => (
          <div key={r.name + r.room} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-forest-100">
            <StarRating rating={r.rating} />
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">&ldquo;{r.text}&rdquo;</p>
            <p className="mt-4 text-sm font-semibold text-forest-900">{r.name}</p>
            <p className="text-xs text-ink-soft">Stayed in {r.room}</p>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <h3 className="text-xl font-semibold text-forest-900">Stayed With Us? Leave a Review</h3>
        <p className="mt-2 max-w-2xl text-ink-soft">
          We&apos;d love to hear how your stay went — it helps other guests, and helps us do better.
        </p>
        <div className="mt-6 max-w-2xl">
          <ReviewForm roomNames={roomNames} />
        </div>
      </div>
    </div>
  );
}
