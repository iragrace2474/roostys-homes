import Image from 'next/image';

const SLIDES = [
  '/roosty-photos/real/exterior-01.jpg',
  '/roosty-photos/real/exterior-02.jpg',
  '/roosty-photos/real/exterior-03.jpg',
  '/roosty-photos/real/family-exterior.jpg',
  '/roosty-photos/real/livingroom-01.jpg',
  '/roosty-photos/real/livingroom-02.jpg',
];

const SLOT = 8; // seconds each photo is fully visible
const FADE = 2.5; // seconds of crossfade into/out of each photo
const CYCLE = SLIDES.length * SLOT;

// Percent-of-cycle points for a single slide's opacity keyframe. Every slide
// shares this exact keyframe; the "gliding" stagger comes entirely from
// giving each one a negative animation-delay of its own slot offset, so it's
// already partway into the shared cycle when the page loads.
const fadeInEnd = (FADE / CYCLE) * 100;
const holdEnd = ((FADE + SLOT) / CYCLE) * 100;
const fadeOutEnd = ((2 * FADE + SLOT) / CYCLE) * 100;

// No client JS at all — the crossfade and slow Ken Burns drift are pure CSS
// animations, so this can stay a server component.
export default function HeroSlideshow() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-forest-950">
      {SLIDES.map((src, i) => (
        <div key={src} className="hero-slide absolute inset-0" style={{ animationDelay: `-${i * SLOT}s` }}>
          <Image
            src={src}
            alt="Roosty's Homes premises"
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
      <style>{`
        .hero-slide {
          opacity: 0;
          animation:
            hero-fade ${CYCLE}s linear infinite,
            hero-pan ${SLOT + FADE * 2}s ease-in-out infinite alternate;
        }
        @keyframes hero-fade {
          0% { opacity: 0; }
          ${fadeInEnd.toFixed(3)}% { opacity: 1; }
          ${holdEnd.toFixed(3)}% { opacity: 1; }
          ${fadeOutEnd.toFixed(3)}% { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes hero-pan {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.09) translate(-1.5%, -1.5%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-slide { animation: hero-fade ${CYCLE}s linear infinite; }
        }
      `}</style>
    </div>
  );
}
