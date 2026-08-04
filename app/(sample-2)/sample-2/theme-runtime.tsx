'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { markThemeReady, themeReady } from '../../theme-ready';

// The Montana theme's jQuery libraries. NOTE: the theme's own main.js is
// deliberately NOT loaded — its logic is reimplemented below, split into "run
// once" (layout behaviors bound to persistent elements: sticky header,
// mobile (slicknav) menu, scroll-to-top button, the booking modal's date
// pickers and select styling — all of which live in the layout and are never
// swapped by navigation) and "run per navigation" (popups that attach to page
// content, which IS swapped on every client-side route change). Loading
// main.js as-is would double-bind the slicknav menu and re-wrap the booking
// modal's <select> elements on every navigation. The owl carousels are
// handled separately by the <OwlCarousel> component so React controls their
// lifecycle. isotope/waypoints/counterUp/wow/scrollIt from the original
// main.js are skipped entirely — none of the site's pages use the markup
// (.grid, .counter, .wow, .page) those plugins target, and scrollIt in
// particular binds global arrow-key scroll handling that would only get in
// the way here.
const VENDOR_SCRIPTS = [
  '/montana/js/vendor/modernizr-3.5.0.min.js',
  '/montana/js/vendor/jquery-1.12.4.min.js',
  '/montana/js/popper.min.js',
  '/montana/js/bootstrap.min.js',
  '/montana/js/owl.carousel.min.js',
  '/montana/js/jquery.scrollUp.min.js',
  '/montana/js/nice-select.min.js',
  '/montana/js/jquery.slicknav.min.js',
  '/montana/js/jquery.magnific-popup.min.js',
  '/montana/js/gijgo.min.js',
];

export default function ThemeRuntime() {
  // Load the vendor bundle exactly once for the app's lifetime.
  useEffect(() => {
    if ((window as any).__themeLibsLoading) return;
    (window as any).__themeLibsLoading = true;

    const scripts = VENDOR_SCRIPTS.map((src) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = false; // preserve execution order (jQuery before its plugins)
      return s;
    });
    scripts[scripts.length - 1].onload = () => {
      onceInit();
      markThemeReady();
    };
    scripts.forEach((s) => document.body.appendChild(s));
  }, []);

  // Re-run the page-content widgets on every client-side navigation, once the
  // libs are ready. Also covers the first page load.
  const pathname = usePathname();
  useEffect(() => {
    let cancelled = false;
    themeReady.then(() => {
      if (!cancelled) perNavInit();
    });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}

// ---- Run once: layout-level behaviors (bound to persistent elements) --------
function onceInit() {
  const $ = (window as any).jQuery;

  // Sticky header: add/remove `.sticky` on #sticky-header past 400px scroll.
  $(window).on('scroll', function () {
    const scroll = $(window).scrollTop();
    if (scroll < 400) {
      $('#sticky-header').removeClass('sticky');
    } else {
      $('#sticky-header').addClass('sticky');
    }
  });

  // Mobile menu: convert the desktop nav into a slicknav off-canvas menu.
  // Runs once — slicknav moves/wraps the persistent header nav, so calling it
  // again on navigation would double-wrap it.
  const $menu = $('ul#navigation');
  if ($menu.length) {
    $menu.slicknav({
      prependTo: '.mobile_menu',
      closedSymbol: '+',
      openedSymbol: '-',
    });
  }

  // Back-to-top button (creates its own persistent #scrollUp element).
  $.scrollUp({
    scrollName: 'scrollUp',
    topDistance: '400',
    topSpeed: 300,
    animation: 'fade',
    animationInSpeed: 200,
    animationOutSpeed: 200,
    scrollText: '<i class="fa fa-angle-double-up"></i>',
    activeOverlay: false,
  });

  // "Book A Room" trigger in the persistent header — bound once, separately
  // from the per-navigation room-card triggers below, so it never gets a
  // second (stacking) click handler across navigations.
  $('.site-header .popup-with-form').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#name',
    callbacks: {
      beforeOpen: function (this: any) {
        this.st.focus = $(window).width() < 700 ? false : '#name';
      },
    },
  });

  // The booking modal itself (#test-form) is persistent layout markup, so its
  // widgets are initialized once, here, rather than per navigation.
  $('#datepicker').datepicker({
    iconsLibrary: 'fontawesome',
    icons: { rightIcon: '<span class="fa fa-caret-down"></span>' },
  });
  $('#datepicker2').datepicker({
    iconsLibrary: 'fontawesome',
    icons: { rightIcon: '<span class="fa fa-caret-down"></span>' },
  });
  if (document.getElementById('default-select')) {
    $('select').niceSelect();
  }
}

// ---- Run per navigation: widgets attached to (swapped) page content ---------
function perNavInit() {
  const $ = (window as any).jQuery;

  // Photo grids (Instagram-style / gallery) opened as a lightbox.
  $('.popup-image, .img-pop-up').magnificPopup({
    type: 'image',
    gallery: { enabled: true },
  });

  // Video CTA popup (home page).
  $('.popup-video').magnificPopup({ type: 'iframe' });

  // "book now" triggers inside page content (room cards) — the header's own
  // trigger is bound once in onceInit() above, so it's excluded here to avoid
  // double-binding it.
  $('main .popup-with-form').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#name',
    callbacks: {
      beforeOpen: function (this: any) {
        this.st.focus = $(window).width() < 700 ? false : '#name';
      },
    },
  });
}
