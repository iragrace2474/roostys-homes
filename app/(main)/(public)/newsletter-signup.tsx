// UI-only for now — there's no subscribers table/backend yet to actually
// save an email to. Built out fully so it's ready to wire up later; until
// then the button stays disabled and says so, rather than pretending to
// save an address it doesn't.
export default function NewsletterSignup() {
  return (
    <section className="bg-yellow-100">
      <div className="mx-auto max-w-6xl px-6 py-14 text-center">
        <span className="text-sm font-semibold tracking-wide text-forest-700 uppercase">Stay in the Loop</span>
        <h2 className="mt-2 text-2xl font-semibold text-forest-900 sm:text-3xl">
          Get Updates From Roosty&apos;s Homes
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-ink-soft">
          Subscribe for news on new rooms, upcoming events in our party gardens, and special offers —
          straight to your inbox.
        </p>

        <form className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
          <label htmlFor="newsletter_email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter_email"
            type="email"
            disabled
            placeholder="you@example.com"
            className="w-full rounded-full border border-forest-200 bg-white px-5 py-3 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled
            className="shrink-0 cursor-not-allowed rounded-full bg-forest-800/50 px-6 py-3 font-semibold whitespace-nowrap text-yellow-100/80"
          >
            Subscribing coming soon
          </button>
        </form>
        <p className="mt-3 text-xs text-ink-soft">
          We&apos;re setting this up — for now,{' '}
          <a href="mailto:info@roostyshomes.com" className="font-semibold text-forest-800 hover:text-forest-600">
            email us
          </a>{' '}
          to be added to the list.
        </p>
      </div>
    </section>
  );
}
