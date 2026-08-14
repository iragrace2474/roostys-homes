import Image from 'next/image';

const SLOT = 4; // seconds each photo is fully visible
const FADE = 1; // seconds of crossfade into/out of each photo

// Small pure-CSS crossfade slideshow for a service card, same technique as
// the homepage hero (see hero-slideshow.tsx) — no client JS, so this stays a
// server component. Cards with only one photo just render it statically.
export default function ServiceSlideshow({ images, alt }: { images: string[]; alt: string }) {
  if (images.length <= 1) {
    return images[0] ? <Image src={images[0]} alt={alt} fill className="object-cover" /> : null;
  }

  const cycle = images.length * SLOT;
  const fadeInEnd = (FADE / cycle) * 100;
  const holdEnd = ((FADE + SLOT) / cycle) * 100;
  const fadeOutEnd = ((2 * FADE + SLOT) / cycle) * 100;
  const className = `service-slide-${images.length}`;

  return (
    <>
      {images.map((src, i) => (
        <div
          key={src}
          className={`${className} absolute inset-0`}
          style={{ animationDelay: `-${i * SLOT}s` }}
        >
          <Image src={src} alt={alt} fill className="object-cover" priority={i === 0} />
        </div>
      ))}
      <style>{`
        .${className} {
          opacity: 0;
          animation: ${className}-fade ${cycle}s linear infinite;
        }
        @keyframes ${className}-fade {
          0% { opacity: 0; }
          ${fadeInEnd.toFixed(3)}% { opacity: 1; }
          ${holdEnd.toFixed(3)}% { opacity: 1; }
          ${fadeOutEnd.toFixed(3)}% { opacity: 0; }
          100% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .${className} { animation: ${className}-fade ${cycle}s linear infinite; }
        }
      `}</style>
    </>
  );
}
