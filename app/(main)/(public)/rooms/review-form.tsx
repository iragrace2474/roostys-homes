'use client';

import { useState } from 'react';
import { STAR_PATH } from './star-rating';

// UI-only for now — there's nowhere to save a submitted review yet (no
// reviews table/backend). The form is fully built out so it's ready to wire
// up to real storage later; until then the submit button stays disabled and
// says so, rather than pretending to save something it doesn't.
export default function ReviewForm({ roomNames }: { roomNames: string[] }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <form className="grid gap-4 rounded-2xl bg-forest-50 p-6 sm:p-8">
      <div>
        <label htmlFor="review_name" className="mb-1 block text-sm font-semibold text-forest-900">
          Your name
        </label>
        <input
          id="review_name"
          name="name"
          disabled
          className="w-full rounded-lg border border-forest-200 bg-white px-4 py-2.5 disabled:opacity-60"
        />
      </div>

      <div>
        <label htmlFor="review_room" className="mb-1 block text-sm font-semibold text-forest-900">
          Which room did you stay in?
        </label>
        <select
          id="review_room"
          name="room"
          disabled
          defaultValue=""
          className="w-full rounded-lg border border-forest-200 bg-white px-4 py-2.5 text-ink disabled:opacity-60"
        >
          <option value="" disabled>
            Select a room
          </option>
          {roomNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <span className="mb-1 block text-sm font-semibold text-forest-900">Your rating</span>
        <div className="flex gap-1" onMouseLeave={() => setHoverRating(0)}>
          {[1, 2, 3, 4, 5].map((i) => {
            const filled = i <= (hoverRating || rating);
            return (
              <button
                key={i}
                type="button"
                disabled
                onMouseEnter={() => setHoverRating(i)}
                onClick={() => setRating(i)}
                aria-label={`${i} star${i === 1 ? '' : 's'}`}
                className="cursor-not-allowed p-0.5 disabled:opacity-60"
              >
                <svg viewBox="0 0 20 20" className={`h-7 w-7 ${filled ? 'text-yellow-500' : 'text-forest-200'}`} fill="currentColor">
                  <path d={STAR_PATH} />
                </svg>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="review_text" className="mb-1 block text-sm font-semibold text-forest-900">
          Your review
        </label>
        <textarea
          id="review_text"
          name="review"
          rows={4}
          disabled
          placeholder="Tell other guests about your stay…"
          className="w-full rounded-lg border border-forest-200 bg-white px-4 py-2.5 disabled:opacity-60"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled
          className="cursor-not-allowed rounded-full bg-forest-800/50 px-7 py-3 font-semibold text-yellow-100/80"
        >
          Review submissions coming soon
        </button>
        <p className="mt-2 text-xs text-ink-soft">
          We&apos;re setting this up — for now, email your review to{' '}
          <a href="mailto:info@roostyshomes.com" className="font-semibold text-forest-800 hover:text-forest-600">
            info@roostyshomes.com
          </a>{' '}
          and we&apos;ll add it here.
        </p>
      </div>
    </form>
  );
}
