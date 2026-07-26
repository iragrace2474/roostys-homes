import Script from 'next/script';

// Colorlib's own analytics/tracking, carried over from the source template.
// Loaded via next/script (afterInteractive) so nothing here runs before
// hydration — these don't touch app markup, so load order relative to each
// other doesn't matter.
//
// Dropped the GA4 "s9cc" block that used to live here: it loads a bootstrap
// script from Colorlib's own server that assumes it's still running on
// preview.colorlib.com and fires its actual tracking calls at relative
// /s9cc/... paths, which just 404 forever against any other origin (and even
// if they resolved, it's Colorlib's own GA property, not yours).
export default function AnalyticsScripts() {
  return (
    <>
      <Script
        id="ga-ua"
        src="https://www.googletagmanager.com/gtag/js?id=UA-23581568-13"
        strategy="afterInteractive"
      />
      <Script id="ga-ua-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-23581568-13');
        `}
      </Script>
      <Script
        id="cloudflare-beacon"
        type="module"
        src="https://static.cloudflareinsights.com/beacon.min.js/v4513226cdae34746b4dedf0b4dfa099e1781791509496"
        integrity="sha512-ZE9pZaUXND66v380QUtch/5sE9tPFh2zg45pR2PB0CVkCtOREv2AJKkSidISWkysEuQ0EH8faUU5du78bx87UQ=="
        data-cf-beacon='{"version":"2024.11.0","token":"cd0b4b3a733644fc843ef0b185f98241","server_timing":{"name":{"cfCacheStatus":true,"cfEdge":true,"cfExtPri":true,"cfL4":true,"cfOrigin":true,"cfSpeedBrain":true},"location_startswith":null}}'
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  );
}
