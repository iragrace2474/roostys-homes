import Link from 'next/link';
import Image from 'next/image';

// Each slide pairs a real photo with its own headline/tagline, so the
// wording changes together with the picture — reusing the same photo↔service
// pairing already used on the Services page, for consistency across the site.
const SLIDES = [
  {
    src: '/roosty-photos/real/livingroom-01.jpg',
    title: "Roosty's Homes",
    tagline: 'Comfort, Great Food & Peaceful Stays',
  },
  {
    src: '/roosty-photos/real/cottage-01.jpg',
    title: 'Cottages & Apartments',
    tagline: 'Cozy Cottages & Serviced Apartments for Every Stay',
  },
  {
    src: '/roosty-photos/real/restaurant-01.jpg',
    title: 'Bar & Restaurant',
    tagline: 'Great Food, Refreshing Drinks, Good Company',
  },
  {
    src: '/roosty-photos/real/exterior-01.jpg',
    title: 'Party Gardens',
    tagline: 'Weddings, Parties & Functions in Beautiful Gardens',
  },
  {
    src: '/roosty-photos/real/exterior-02.jpg',
    title: 'Secure Premises',
    tagline: 'Gated Grounds, Controlled Access & Attentive Staff',
  },
  {
    src: '/roosty-photos/real/cottage-04.jpg',
    title: 'Family Cottages',
    tagline: 'Standalone Cottages Built for Family Time',
  },
];

const SLOT = 8; // seconds each photo is fully visible
const FADE = 2.5; // seconds of crossfade into/out of each photo
const CYCLE = SLIDES.length * SLOT;

// Percent-of-cycle points for a single slide's opacity keyframe. Every slide
// shares this exact keyframe; the "gliding" stagger comes entirely from
// giving each one a negative animation-delay of its own slot offset, so it's
// already partway into the shared cycle when the page loads. Photos overlap
// mid-transition on purpose (that's what makes it a crossfade) — fine for
// imagery, but two headlines doing the same thing read as a broken double
// exposure. Captions get their own tighter keyframe below instead: its fade
// in + hold + fade out adds up to exactly one SLOT, so as one caption reaches
// 0 the next is only just starting — a clean handoff with no double-visible
// text, while still landing on the same per-index delay as the photos.
const fadeInEnd = (FADE / CYCLE) * 100;
const holdEnd = ((FADE + SLOT) / CYCLE) * 100;
const fadeOutEnd = ((2 * FADE + SLOT) / CYCLE) * 100;

const CAPTION_FADE = 1; // seconds — quick, non-overlapping fade for text
const captionFadeInEnd = (CAPTION_FADE / CYCLE) * 100;
const captionHoldEnd = ((SLOT - CAPTION_FADE) / CYCLE) * 100;
const captionFadeOutEnd = (SLOT / CYCLE) * 100;

// No client JS at all — the crossfade and slow Ken Burns drift are pure CSS
// animations, so this can stay a server component.
export default function HeroSlideshow() {
  return (
    <>
      <div className="absolute inset-0 -z-10 overflow-hidden bg-forest-950">
        {SLIDES.map((slide, i) => (
          <div key={slide.src} className="hero-slide absolute inset-0" style={{ animationDelay: `-${i * SLOT}s` }}>
            <Image
              src={slide.src}
              alt={slide.title}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-950/25 to-forest-950/10" />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="hero-caption-stack relative">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.src}
              className="hero-caption"
              style={{ gridArea: '1 / 1', animationDelay: `-${i * SLOT}s` }}
            >
              <h1 className="text-6xl font-semibold tracking-tight text-white uppercase sm:text-7xl lg:text-8xl">
                {slide.title}
              </h1>
              <p className="mt-4 max-w-xl text-xl text-forest-50">{slide.tagline}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/book"
            className="rounded-full bg-yellow-300 px-7 py-3 font-semibold text-forest-900 shadow-lg transition hover:bg-yellow-200"
          >
            Book Now
          </Link>
          <Link
            href="/rooms"
            className="rounded-full border border-white/70 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            View Rooms
          </Link>
        </div>
      </div>

      <style>{`
        .hero-caption-stack {
          display: grid;
        }
        .hero-slide {
          opacity: 0;
          animation: hero-fade ${CYCLE}s linear infinite;
        }
        .hero-slide img {
          animation: hero-pan ${SLOT + FADE * 2}s ease-in-out infinite alternate;
        }
        .hero-caption {
          opacity: 0;
          animation: hero-caption-fade ${CYCLE}s linear infinite;
        }
        @keyframes hero-fade {
          0% { opacity: 0; }
          ${fadeInEnd.toFixed(3)}% { opacity: 1; }
          ${holdEnd.toFixed(3)}% { opacity: 1; }
          ${fadeOutEnd.toFixed(3)}% { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes hero-caption-fade {
          0% { opacity: 0; }
          ${captionFadeInEnd.toFixed(3)}% { opacity: 1; }
          ${captionHoldEnd.toFixed(3)}% { opacity: 1; }
          ${captionFadeOutEnd.toFixed(3)}% { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes hero-pan {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.09) translate(-1.5%, -1.5%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-slide { animation: hero-fade ${CYCLE}s linear infinite; }
          .hero-slide img { animation: none; }
          .hero-caption { animation: hero-caption-fade ${CYCLE}s linear infinite; }
        }
      `}</style>
    </>
  );
}
