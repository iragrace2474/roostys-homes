import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNav from './site-nav';
import ThemeRuntime from './theme-runtime';
import AnalyticsScripts from './analytics-scripts';

export const metadata: Metadata = {
  title: 'Suite — Colorlib Website Template',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex, nofollow" />
        {/*
          Hero images are large and download after the hero box is already
          sized, which used to flash a white box until the image arrived. Give
          every hero a dark ocean-toned background so any gap before the image
          reads as an intentional dark hero, not a white splash, and preload the
          first hero image so it paints as early as possible.
        */}
        <style
          dangerouslySetInnerHTML={{
            __html: `.site-blocks-cover{background-color:#2c4a57;}`,
          }}
        />
        <link rel="preload" as="image" href="/theme/images/hero_1.jpg" />
        {/* eslint-disable @next/next/no-css-tags -- vendored theme stylesheets, loaded in original template order */}
        <link rel="stylesheet" href="/theme/fonts/icomoon/style.css" />
        <link rel="stylesheet" href="/theme/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/theme/css/magnific-popup.css" />
        <link rel="stylesheet" href="/theme/css/jquery-ui.css" />
        <link rel="stylesheet" href="/theme/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/theme/css/owl.theme.default.min.css" />
        <link rel="stylesheet" href="/theme/css/bootstrap-datepicker.css" />
        <link rel="stylesheet" href="/theme/css/animate.css" />
        <link rel="stylesheet" href="/theme/mediaelement/mediaelementplayer.min.css" />
        <link rel="stylesheet" href="/theme/fonts/flaticon/font/flaticon.css" />
        <link rel="stylesheet" href="/theme/css/aos.css" />
        <link rel="stylesheet" href="/theme/css/fonts.css" />
        <link rel="stylesheet" href="/theme/css/style.css" />
        {/* eslint-enable @next/next/no-css-tags */}
      </head>
      <body>
        <div className="site-wrap">
          <div className="site-mobile-menu">
            <div className="site-mobile-menu-header">
              <div className="site-mobile-menu-close mt-3">
                <span className="icon-close2 js-menu-toggle"></span>
              </div>
            </div>
            <div className="site-mobile-menu-body"></div>
          </div>

          <div className="site-navbar-wrap js-site-navbar bg-white">
            <div className="container">
              <div className="site-navbar bg-light">
                <div className="py-1">
                  <div className="row align-items-center">
                    <div className="col-2">
                      <h2 className="mb-0 site-logo">
                        <Link href="/">Suites</Link>
                      </h2>
                    </div>
                    <div className="col-10">
                      <nav className="site-navigation text-right" role="navigation">
                        <div className="container">
                          <div className="d-inline-block d-lg-none  ml-md-0 mr-auto py-3">
                            <a href="#" className="site-menu-toggle js-menu-toggle">
                              <span className="icon-menu h3"></span>
                            </a>
                          </div>
                          <SiteNav />
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {children}

          <footer className="site-footer">
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <h3 className="footer-heading mb-4 text-white">About</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat quos rem
                    ullam, placeat amet.
                  </p>
                  <p>
                    <a href="#" className="btn btn-primary pill text-white px-4">
                      Read More
                    </a>
                  </p>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-6">
                      <h3 className="footer-heading mb-4 text-white">Quick Menu</h3>
                      <ul className="list-unstyled">
                        <li><a href="#">About</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Approach</a></li>
                        <li><a href="#">Sustainability</a></li>
                        <li><a href="#">News</a></li>
                        <li><a href="#">Careers</a></li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <h3 className="footer-heading mb-4 text-white">Ministries</h3>
                      <ul className="list-unstyled">
                        <li><a href="#">Children</a></li>
                        <li><a href="#">Women</a></li>
                        <li><a href="#">Bible Study</a></li>
                        <li><a href="#">Church</a></li>
                        <li><a href="#">Missionaries</a></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="col-md-12">
                    <h3 className="footer-heading mb-4 text-white">Social Icons</h3>
                  </div>
                  <div className="col-md-12">
                    <p>
                      <a href="#" className="pb-2 pr-2 pl-0">
                        <span className="icon-facebook"></span>
                      </a>
                      <a href="#" className="p-2">
                        <span className="icon-twitter"></span>
                      </a>
                      <a href="#" className="p-2">
                        <span className="icon-instagram"></span>
                      </a>
                      <a href="#" className="p-2">
                        <span className="icon-vimeo"></span>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="row pt-5 mt-5 text-center">
                <div className="col-md-12">
                  <p>
                    {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                    Copyright &copy; {new Date().getFullYear()} All Rights Reserved | This template is made
                    with <i className="icon-heart text-primary" aria-hidden="true"></i> by{' '}
                    <a href="https://colorlib.com/" target="_blank" rel="noopener noreferrer">
                      Colorlib
                    </a>
                    {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>

        <ThemeRuntime />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
