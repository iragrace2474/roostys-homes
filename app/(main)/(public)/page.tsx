import Link from 'next/link';
import Image from 'next/image';
import { listRooms, listServices, listBlogPosts } from '@/lib/db';
import HeroSlideshow from './hero-slideshow';

export default function HomePage() {
  const rooms = listRooms().slice(0, 4);
  const services = listServices().slice(0, 6);
  const posts = listBlogPosts().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[88vh] items-end overflow-hidden">
        <HeroSlideshow />
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold tracking-wide text-forest-600 uppercase">About Us</span>
          <h2 className="mt-2 text-3xl font-semibold text-forest-900 sm:text-4xl">
            Roosty&apos;s Homes, Perfect Service
          </h2>
          {/*
            FIXME: founder name and founding year below are placeholders,
            written in at the user's explicit request to fill real ones in
            later — do not treat as verified fact.
          */}
          <p className="mt-5 leading-relaxed text-ink-soft">
            Founded in 2016 by Robert Turyamureeba, Roosty&apos;s Homes began as a small family
            guesthouse and has grown, over nearly a decade, into one of Mbarara&apos;s most loved
            retreats — built on the belief that great hospitality starts with genuine care for every
            guest.
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            Today we offer cozy cottages and serviced apartments, a lively bar and restaurant serving
            hearty meals and refreshing cocktails, beautifully landscaped party gardens for weddings and
            functions, and a safe, secure environment with attentive staff around the clock — everything
            you need for a relaxing stay or a memorable celebration.
          </p>
          <Link
            href="/services"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-forest-800 hover:text-forest-600"
          >
            See everything on offer &rarr;
          </Link>
        </div>
      </section>

      {/* Featured rooms */}
      <section className="bg-forest-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-sm font-semibold tracking-wide text-forest-600 uppercase">
                Where to Stay
              </span>
              <h2 className="mt-2 text-3xl font-semibold text-forest-900 sm:text-4xl">Our Rooms</h2>
            </div>
            <Link href="/rooms" className="font-semibold text-forest-800 hover:text-forest-600">
              View all rooms &rarr;
            </Link>
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4">
          {rooms.map((room) => (
            <Link
              key={room.id}
              href={`/rooms/${room.slug}`}
              className="group relative block h-[30rem] overflow-hidden transition"
            >
              {room.images[0] && (
                <Image
                  src={room.images[0]}
                  alt={room.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-xl font-semibold text-white">{room.name}</h3>
                <p className="mt-1 text-sm text-forest-100">
                  {room.max_guests} guests &middot; {room.size_sqm} sqm
                </p>
                <p className="mt-2 font-semibold text-yellow-300">
                  UGX {room.price.toLocaleString()}{' '}
                  <span className="text-xs font-normal text-forest-100">{room.price_unit}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Services teaser */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-sm font-semibold tracking-wide text-forest-600 uppercase">
              What We Offer
            </span>
            <h2 className="mt-2 text-3xl font-semibold text-forest-900 sm:text-4xl">Services</h2>
          </div>
          <Link href="/services" className="font-semibold text-forest-800 hover:text-forest-600">
            All services &rarr;
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.id} className="rounded-2xl border border-forest-100 bg-white p-6">
              <h3 className="font-display text-lg font-semibold text-forest-900">{service.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Party gardens CTA */}
      <section className="relative overflow-hidden py-24">
        <Image src="/roosty-photos/gardens-1.jpg" alt="Party gardens" fill className="object-cover" />
        <div className="absolute inset-0 bg-forest-950/60" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <span className="text-sm font-semibold tracking-wide text-yellow-300 uppercase">
            Party Gardens
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            Host Your Wedding, Party or Function With Us
          </h2>
          <p className="mt-4 text-forest-50">
            Beautiful gardens available for hire, with space for tents, seating and catering.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-yellow-300 px-7 py-3 font-semibold text-forest-900 hover:bg-yellow-200"
          >
            Enquire Now
          </Link>
        </div>
      </section>

      {/* Events & blog teaser */}
      {posts.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-sm font-semibold tracking-wide text-forest-600 uppercase">
                Latest
              </span>
              <h2 className="mt-2 text-3xl font-semibold text-forest-900 sm:text-4xl">
                Events &amp; Blog
              </h2>
            </div>
            <Link href="/events" className="font-semibold text-forest-800 hover:text-forest-600">
              View all &rarr;
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/events/${post.slug}`}
                className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-forest-100"
              >
                {post.cover_image && (
                  <div className="relative h-40 w-full">
                    <Image src={post.cover_image} alt={post.title} fill className="object-cover" />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-forest-900">{post.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
