import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNav from './sample-2/site-nav';
import ThemeRuntime from './sample-2/theme-runtime';
import AnalyticsScripts from '../analytics-scripts';

export const metadata: Metadata = {
  title: "Roosty's Homes — Comfort, Great Food & Peaceful Stays in Mbarara",
  description:
    "Roosty's Homes offers cozy cottages, modern apartments, a vibrant bar and restaurant, beautiful gardens and a kids' play area in Ruharo Nkokonjeru, Mbarara City.",
};

// Ported from Colorlib's "Montana" hotel template — header, footer and the
// site-wide "Book A Room" modal live here since Montana triggers the modal
// from every page. {children} is wrapped in <main> so ThemeRuntime's
// per-navigation init can scope room-card booking triggers separately from
// the header's own (bound once — see theme-runtime.tsx).
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-js">
      <head>
        <meta name="robots" content="noindex, nofollow" />
        {/* eslint-disable @next/next/no-css-tags -- vendored theme stylesheets, loaded in original template order */}
        <link rel="stylesheet" precedence="theme" href="/montana/css/bootstrap.min.css" />
        <link rel="stylesheet" precedence="theme" href="/montana/css/owl.carousel.min.css" />
        <link rel="stylesheet" precedence="theme" href="/montana/css/magnific-popup.css" />
        <link rel="stylesheet" precedence="theme" href="/montana/css/font-awesome.min.css" />
        <link rel="stylesheet" precedence="theme" href="/montana/css/themify-icons.css" />
        <link rel="stylesheet" precedence="theme" href="/montana/css/nice-select.css" />
        <link rel="stylesheet" precedence="theme" href="/montana/css/flaticon.css" />
        <link rel="stylesheet" precedence="theme" href="/montana/css/gijgo.css" />
        <link rel="stylesheet" precedence="theme" href="/montana/css/animate.css" />
        <link rel="stylesheet" precedence="theme" href="/montana/css/slicknav.css" />
        <link rel="stylesheet" precedence="theme" href="/montana/css/style.css" />
        {/* eslint-enable @next/next/no-css-tags */}
        {/*
          Montana's header floats transparent over the hero photo with plain
          white nav text and no scrim (`.header-area` has no background — see
          style.css). Colorlib's own demo photos happened to always be dark
          enough behind it; Roosty's real photos aren't (the drone shots have
          a bright sky right where the nav sits), so white-on-white text goes
          unreadable. Add a top-down scrim behind the header only — once
          scrolled, main.js already adds `.sticky` with a solid black
          background, which is unaffected by this.
        */}
        <style href="montana-header-scrim" precedence="theme">{`
          .header-area::before {
            content: '';
            position: absolute;
            inset: 0;
            z-index: -1;
            background: linear-gradient(to bottom, rgba(0,0,0,.55), rgba(0,0,0,0) 100%);
            pointer-events: none;
          }
        `}</style>
      </head>
      <body>
        <header className="site-header">
          <div className="header-area">
            <div id="sticky-header" className="main-header-area">
              <div className="container-fluid p-0">
                <div className="row align-items-center no-gutters">
                  <div className="col-xl-5 col-lg-6">
                    <div className="main-menu d-none d-lg-block">
                      <nav>
                        <SiteNav />
                      </nav>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2">
                    <div className="logo-img">
                      <Link href="/sample-2">
                        <img src="/roosty-photos/web-logo-main.jpg.png" alt="Roosty's Homes" fetchPriority="high" decoding="sync" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-xl-5 col-lg-4 d-none d-lg-block">
                    <div className="book_room">
                      <div className="socail_links">
                        <ul>
                          <li><a href="#"><i className="fa fa-facebook-square"></i></a></li>
                          <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                          <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                        </ul>
                      </div>
                      <div className="book_btn d-none d-lg-block">
                        <a className="popup-with-form" href="#test-form">Book A Room</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mobile_menu d-block d-lg-none"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer className="footer">
          <div className="footer_top">
            <div className="container">
              <div className="row">
                <div className="col-xl-3 col-md-6 col-lg-3">
                  <div className="footer_widget">
                    <h3 className="footer_title">address</h3>
                    <p className="footer_text">
                      Ruharo Nkokonjeru, <br /> Mbarara City, Uganda
                    </p>
                    <a
                      href="https://maps.google.com/?q=Ruharo+Nkokonjeru,+Mbarara+City"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="line-button"
                    >
                      Get Direction
                    </a>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 col-lg-3">
                  <div className="footer_widget">
                    <h3 className="footer_title">Reservation</h3>
                    <p className="footer_text">
                      +256 707 113630 <br /> +256 768 640830
                    </p>
                  </div>
                </div>
                <div className="col-xl-2 col-md-6 col-lg-2">
                  <div className="footer_widget">
                    <h3 className="footer_title">Navigation</h3>
                    <ul>
                      <li><Link href="/sample-2">Home</Link></li>
                      <li><Link href="/sample-2/rooms">Rooms</Link></li>
                      <li><Link href="/sample-2/about">About</Link></li>
                      <li><Link href="/sample-2/events">Events</Link></li>
                      <li><Link href="/sample-2/contact">Contact</Link></li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6 col-lg-4">
                  <div className="footer_widget">
                    <h3 className="footer_title">Newsletter</h3>
                    <form action="#" className="newsletter_form">
                      <input type="text" placeholder="Enter your mail" />
                      <button type="submit">Sign Up</button>
                    </form>
                    <p className="newsletter_text">Subscribe to get updates from Roosty&apos;s Homes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="copy-right_text">
            <div className="container">
              <div className="footer_border"></div>
              <div className="row">
                <div className="col-xl-8 col-md-7 col-lg-9">
                  <p className="copy_right">
                    {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                    Copyright &copy; {new Date().getFullYear()} Roosty&apos;s Homes. All rights reserved |
                    Template made with <i className="fa fa-heart-o" aria-hidden="true"></i> by{' '}
                    <a href="https://colorlib.com/" target="_blank" rel="noopener noreferrer">Colorlib</a>
                    {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  </p>
                </div>
                <div className="col-xl-4 col-md-5 col-lg-3">
                  <div className="socail_links">
                    <ul>
                      <li><a href="#"><i className="fa fa-facebook-square"></i></a></li>
                      <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                      <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Site-wide "Check Availability" booking modal — visual only, not wired
            to a backend. Opened via any .popup-with-form trigger (header button,
            room "book now" links). Montana's own markup wraps this in an outer
            <form>, but nesting a <form> inside another is invalid HTML and
            triggers a hydration error in Next.js — the outer element only
            needs to be *something* with id="test-form" for magnificPopup's
            inline popup to find it, so it's a <div> here instead. */}
        <div id="test-form" className="white-popup-block mfp-hide">
          <div className="popup_box">
            <div className="popup_inner">
              <h3>Check Availability</h3>
              <form action="#">
                <div className="row">
                  <div className="col-xl-6">
                    <input id="datepicker" placeholder="Check in date" />
                  </div>
                  <div className="col-xl-6">
                    <input id="datepicker2" placeholder="Check out date" />
                  </div>
                  <div className="col-xl-6">
                    <select className="form-select wide" id="default-select">
                      <option data-display="Adult">1</option>
                      <option value="1">2</option>
                      <option value="2">3</option>
                      <option value="3">4</option>
                    </select>
                  </div>
                  <div className="col-xl-6">
                    <select className="form-select wide" id="default-select">
                      <option data-display="Children">1</option>
                      <option value="1">2</option>
                      <option value="2">3</option>
                      <option value="3">4</option>
                    </select>
                  </div>
                  <div className="col-xl-12">
                    <select className="form-select wide" id="default-select">
                      <option data-display="Room type">Room type</option>
                      <option value="1">One Bedroom Occupancy</option>
                      <option value="2">Deluxe Cottage</option>
                      <option value="3">Two Bedroom Occupancy</option>
                      <option value="4">Family Suite</option>
                    </select>
                  </div>
                  <div className="col-xl-12">
                    <button type="submit" className="boxed-btn3">Check Availability</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <ThemeRuntime />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
