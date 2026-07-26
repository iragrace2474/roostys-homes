import Link from 'next/link';
import OwlCarousel from './owl-carousel';

// Owl Carousel configs, copied verbatim from the theme's main.js so the
// carousels behave identically to the original template.
const HERO_OPTIONS = {
  center: false,
  items: 1,
  loop: true,
  stagePadding: 0,
  margin: 0,
  autoplay: true,
  pauseOnHover: false,
  animateOut: 'fadeOut',
  animateIn: 'fadeIn',
  nav: true,
  navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
};

const TESTIMONIALS_OPTIONS = {
  center: false,
  items: 1,
  loop: true,
  stagePadding: 0,
  autoplay: true,
  margin: 20,
  nav: true,
  dots: true,
  navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
  responsive: {
    600: { margin: 20, stagePadding: 0, items: 1 },
    1000: { margin: 20, stagePadding: 0, items: 2 },
  },
};

const EVENTS_OPTIONS = {
  center: false,
  items: 1,
  loop: true,
  stagePadding: 0,
  autoplay: true,
  margin: 20,
  nav: true,
  dots: true,
  navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
  responsive: {
    600: { margin: 20, stagePadding: 0, items: 1, nav: false, dots: true },
    1000: { margin: 20, stagePadding: 0, items: 2, nav: true, dots: true },
    1200: { margin: 20, stagePadding: 0, items: 3, nav: true, dots: true },
  },
};

export default function Home() {
  return (
    <>
      {/*
        owl-carousel's own CSS sets display:none on .owl-carousel until its JS
        adds the .owl-loaded class, so this hero collapses to zero height and
        the section below jumps up until the carousel initializes — unlike the
        other pages' hero, which is a plain .site-blocks-cover with no such
        gate. This shows the first slide (at its normal full size) immediately
        and hides the other two until owl-carousel takes over, so there's no
        gap for it to fill in later.
      */}
      <style>{`
        .home-slider.owl-carousel:not(.owl-loaded) { display: block; }
        .home-slider.owl-carousel:not(.owl-loaded) > .site-blocks-cover ~ .site-blocks-cover { display: none; }
      `}</style>
      <OwlCarousel className="slide-one-item home-slider owl-carousel" options={HERO_OPTIONS}>
        <div
          className="site-blocks-cover overlay"
          style={{ backgroundImage: 'url(/theme/images/hero_1.jpg)' }}
          data-stellar-background-ratio="0.5"
        >
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-7 text-center" data-aos="fade">
                <h1 className="mb-2">Discover Comfort</h1>
                <h2 className="caption">Welcome to Roosty&apos;s Homes</h2>
              </div>
            </div>
          </div>
        </div>

        <div
          className="site-blocks-cover overlay"
          style={{ backgroundImage: 'url(/theme/images/hero_2.jpg)' }}
          data-stellar-background-ratio="0.5"
        >
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-7 text-center" data-aos="fade">
                <h1 className="mb-2">Great Food &amp; Drinks</h1>
                <h2 className="caption">Bar &bull; Restaurant &bull; Gardens</h2>
              </div>
            </div>
          </div>
        </div>

        <div
          className="site-blocks-cover overlay"
          style={{ backgroundImage: 'url(/theme/images/hero_3.jpg)' }}
          data-stellar-background-ratio="0.5"
        >
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="col-md-7 text-center" data-aos="fade">
                <h1 className="mb-2">Peaceful Stays</h1>
                <h2 className="caption">Cottages &amp; Apartments</h2>
              </div>
            </div>
          </div>
        </div>
      </OwlCarousel>

      <div className="site-section bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto text-center mb-5 section-heading">
              <h2 className="mb-5">Our Rooms</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-3 mb-5">
              <div className="hotel-room text-center">
                <Link href="/rooms" className="d-block mb-0 thumbnail">
                  <img src="/theme/images/img_3.jpg" alt="One Bedroom Occupancy" className="img-fluid" fetchPriority="high" decoding="sync" />
                </Link>
                <div className="hotel-room-body">
                  <h3 className="heading mb-0"><Link href="/rooms">One Bedroom Occupancy</Link></h3>
                  <strong className="price">UGX 200,000 / per night</strong>
                  <span className="d-block text-muted small mt-2">2 Guests &middot; 190 sqm</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-5">
              <div className="hotel-room text-center">
                <Link href="/rooms" className="d-block mb-0 thumbnail">
                  <img src="/theme/images/img_1.jpg" alt="Deluxe Cottage" className="img-fluid" fetchPriority="high" decoding="sync" />
                </Link>
                <div className="hotel-room-body">
                  <h3 className="heading mb-0"><Link href="/rooms">Deluxe Cottage</Link></h3>
                  <strong className="price">UGX 200,000 / per night</strong>
                  <span className="d-block text-muted small mt-2">2 Guests &middot; 600 sqm</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-5">
              <div className="hotel-room text-center">
                <Link href="/rooms" className="d-block mb-0 thumbnail">
                  <img src="/theme/images/img_2.jpg" alt="Two Bedroom Occupancy" className="img-fluid" loading="lazy" decoding="async" />
                </Link>
                <div className="hotel-room-body">
                  <h3 className="heading mb-0"><Link href="/rooms">Two Bedroom Occupancy</Link></h3>
                  <strong className="price">UGX 250,000 / per night</strong>
                  <span className="d-block text-muted small mt-2">6 Guests &middot; 150 sqm</span>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-5">
              <div className="hotel-room text-center">
                <Link href="/rooms" className="d-block mb-0 thumbnail">
                  <img src="/theme/images/img_4.jpg" alt="Family Suite" className="img-fluid" loading="lazy" decoding="async" />
                </Link>
                <div className="hotel-room-body">
                  <h3 className="heading mb-0"><Link href="/rooms">Family Suite</Link></h3>
                  <strong className="price">UGX 360,000 / per night</strong>
                  <span className="d-block text-muted small mt-2">4 Guests &middot; 400 sqm</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <Link href="/rooms" className="btn btn-primary pill text-white px-4">
                View All Rooms
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-5 mb-md-0">
              <div className="img-border">
                <a href="https://vimeo.com/28959265" className="popup-vimeo image-play">
                  <span className="icon-wrap">
                    <span className="icon icon-play"></span>
                  </span>
                  <img src="/theme/images/img_2.jpg" alt="" className="img-fluid" loading="lazy" decoding="async" />
                </a>
              </div>

              <img src="/theme/images/img_1.jpg" alt="Image" className="img-fluid image-absolute" loading="lazy" decoding="async" />
            </div>
            <div className="col-md-5 ml-auto">
              <div className="section-heading text-left">
                <h2 className="mb-5">About Roosty&apos;s Homes</h2>
              </div>
              <p className="mb-4">
                Experience the ultimate getaway at Roosty&apos;s Homes. From cozy cottages and
                modern apartments to our vibrant bar, restaurant, lush gardens, and fun kids&apos;
                play area &mdash; where comfort meets great food, refreshing drinks, and peaceful
                stays.
              </p>
              <p>
                <Link href="/about" className="text-uppercase">
                  Learn More <span className="icon-arrow-right small"></span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto text-center mb-5 section-heading">
              <h2 className="mb-5">Our Amenities</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="text-center p-4 item">
                <span className="flaticon-pool display-3 mb-3 d-block text-primary"></span>
                <h2 className="h5">Pool Table</h2>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="text-center p-4 item">
                <span className="flaticon-desk display-3 mb-3 d-block text-primary"></span>
                <h2 className="h5">24/7 Reservation</h2>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="text-center p-4 item">
                <span className="flaticon-exit display-3 mb-3 d-block text-primary"></span>
                <h2 className="h5">Secure Premises</h2>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="text-center p-4 item">
                <span className="flaticon-parking display-3 mb-3 d-block text-primary"></span>
                <h2 className="h5">Car Parking</h2>
              </div>
            </div>

            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="text-center p-4 item">
                <span className="flaticon-hair-dryer display-3 mb-3 d-block text-primary"></span>
                <h2 className="h5">Room Service</h2>
              </div>
            </div>

            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="text-center p-4 item">
                <span className="flaticon-minibar display-3 mb-3 d-block text-primary"></span>
                <h2 className="h5">Bar &amp; Restaurant</h2>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="text-center p-4 item">
                <span className="flaticon-drink display-3 mb-3 d-block text-primary"></span>
                <h2 className="h5">Cocktails &amp; Fresh Juice</h2>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="text-center p-4 item">
                <span className="flaticon-cab display-3 mb-3 d-block text-primary"></span>
                <h2 className="h5">Online Booking</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="py-5 upcoming-events"
        style={{ backgroundImage: "url('/theme/images/hero_1.jpg')", backgroundAttachment: 'fixed' }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2 className="text-white">Host Your Event With Us</h2>
              <Link href="/contact" className="text-white btn btn-outline-warning rounded-0 text-uppercase">
                Enquire Now
              </Link>
            </div>
            <div className="col-md-6">
              <span className="caption">Gardens available for hire</span>
              <h3 className="text-white">Weddings, Parties &amp; Functions</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto text-center mb-5 section-heading">
              <h2 className="mb-5">Our Gallery</h2>
            </div>
          </div>
          <div className="row no-gutters">
            <div className="col-md-6 col-lg-3">
              <a href="/theme/images/img_1.jpg" className="image-popup img-opacity">
                <img src="/theme/images/img_1.jpg" alt="Image" className="img-fluid" loading="lazy" decoding="async" />
              </a>
            </div>
            <div className="col-md-6 col-lg-3">
              <a href="/theme/images/img_2.jpg" className="image-popup img-opacity">
                <img src="/theme/images/img_2.jpg" alt="Image" className="img-fluid" loading="lazy" decoding="async" />
              </a>
            </div>
            <div className="col-md-6 col-lg-3">
              <a href="/theme/images/img_3.jpg" className="image-popup img-opacity">
                <img src="/theme/images/img_3.jpg" alt="Image" className="img-fluid" loading="lazy" decoding="async" />
              </a>
            </div>
            <div className="col-md-6 col-lg-3">
              <a href="/theme/images/img_4.jpg" className="image-popup img-opacity">
                <img src="/theme/images/img_4.jpg" alt="Image" className="img-fluid" loading="lazy" decoding="async" />
              </a>
            </div>

            <div className="col-md-6 col-lg-3">
              <a href="/theme/images/img_4.jpg" className="image-popup img-opacity">
                <img src="/theme/images/img_4.jpg" alt="Image" className="img-fluid" loading="lazy" decoding="async" />
              </a>
            </div>
            <div className="col-md-6 col-lg-3">
              <a href="/theme/images/img_5.jpg" className="image-popup img-opacity">
                <img src="/theme/images/img_5.jpg" alt="Image" className="img-fluid" loading="lazy" decoding="async" />
              </a>
            </div>
            <div className="col-md-6 col-lg-3">
              <a href="/theme/images/img_6.jpg" className="image-popup img-opacity">
                <img src="/theme/images/img_6.jpg" alt="Image" className="img-fluid" loading="lazy" decoding="async" />
              </a>
            </div>
            <div className="col-md-6 col-lg-3">
              <a href="/theme/images/img_7.jpg" className="image-popup img-opacity">
                <img src="/theme/images/img_7.jpg" alt="Image" className="img-fluid" loading="lazy" decoding="async" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/*
        PLACEHOLDER SECTION — "Latest Updates" cards below use template filler
        text (Lorem Ipsum, sample dates/authors). Replace with real Roosty's
        Homes news/blog posts, or delete this whole section, when ready.
      */}
      <div className="site-section block-15">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto text-center mb-5 section-heading">
              <h2>Latest Updates</h2>
            </div>
          </div>

          <OwlCarousel className="nonloop-block-15 owl-carousel" options={EVENTS_OPTIONS}>
            <div className="media-with-text p-md-5">
              <div className="img-border-sm mb-4">
                <a href="#" className="popup-vimeo image-play">
                  <img src="/theme/images/img_1.jpg" alt="" className="img-fluid" loading="lazy" decoding="async" />
                </a>
              </div>
              <h2 className="heading mb-0"><a href="#">Lorem Ipsum Dolor Sit Amet</a></h2>
              <span className="mb-3 d-block post-date">Dec 20th, 2018 &bull; By <a href="#">Admin</a></span>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolores culpa qui aliquam placeat nobis veritatis tempora natus rerum obcaecati.</p>
            </div>

            <div className="media-with-text p-md-4">
              <div className="img-border-sm mb-4">
                <a href="#" className="popup-vimeo image-play">
                  <img src="/theme/images/img_2.jpg" alt="" className="img-fluid" loading="lazy" decoding="async" />
                </a>
              </div>
              <h2 className="heading mb-0"><a href="#">Lorem Ipsum Dolor Sit Amet</a></h2>
              <span className="mb-3 d-block post-date">Dec 20th, 2018 &bull; By <a href="#">Admin</a></span>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolores culpa qui aliquam placeat nobis veritatis tempora natus rerum obcaecati.</p>
            </div>

            <div className="media-with-text p-md-4">
              <div className="img-border-sm mb-4">
                <a href="#" className="popup-vimeo image-play">
                  <img src="/theme/images/img_3.jpg" alt="" className="img-fluid" loading="lazy" decoding="async" />
                </a>
              </div>
              <h2 className="heading mb-0"><a href="#">Lorem Ipsum Dolor Sit Amet</a></h2>
              <span className="mb-3 d-block post-date">Dec 20th, 2018 &bull; By <a href="#">Admin</a></span>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolores culpa qui aliquam placeat nobis veritatis tempora natus rerum obcaecati.</p>
            </div>

            <div className="media-with-text p-md-4">
              <div className="img-border-sm mb-4">
                <a href="#" className="popup-vimeo image-play">
                  <img src="/theme/images/img_1.jpg" alt="" className="img-fluid" loading="lazy" decoding="async" />
                </a>
              </div>
              <h2 className="heading mb-0"><a href="#">Lorem Ipsum Dolor Sit Amet</a></h2>
              <span className="mb-3 d-block post-date">Dec 20th, 2018 &bull; By <a href="#">Admin</a></span>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolores culpa qui aliquam placeat nobis veritatis tempora natus rerum obcaecati.</p>
            </div>

            <div className="media-with-text p-md-4">
              <div className="img-border-sm mb-4">
                <a href="#" className="popup-vimeo image-play">
                  <img src="/theme/images/img_2.jpg" alt="" className="img-fluid" loading="lazy" decoding="async" />
                </a>
              </div>
              <h2 className="heading mb-0"><a href="#">Lorem Ipsum Dolor Sit Amet</a></h2>
              <span className="mb-3 d-block post-date">Dec 20th, 2018 &bull; By <a href="#">Admin</a></span>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolores culpa qui aliquam placeat nobis veritatis tempora natus rerum obcaecati.</p>
            </div>

            <div className="media-with-text p-md-4">
              <div className="img-border-sm mb-4">
                <a href="#" className="popup-vimeo image-play">
                  <img src="/theme/images/img_3.jpg" alt="" className="img-fluid" loading="lazy" decoding="async" />
                </a>
              </div>
              <h2 className="heading mb-0"><a href="#">Lorem Ipsum Dolor Sit Amet</a></h2>
              <span className="mb-3 d-block post-date">Dec 20th, 2018 &bull; By <a href="#">Admin</a></span>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolores culpa qui aliquam placeat nobis veritatis tempora natus rerum obcaecati.</p>
            </div>

            <div className="media-with-text p-md-4">
              <div className="img-border-sm mb-4">
                <a href="#" className="popup-vimeo image-play">
                  <img src="/theme/images/img_1.jpg" alt="" className="img-fluid" loading="lazy" decoding="async" />
                </a>
              </div>
              <h2 className="heading mb-0"><a href="#">Lorem Ipsum Dolor Sit Amet</a></h2>
              <span className="mb-3 d-block post-date">Dec 20th, 2018 &bull; By <a href="#">Admin</a></span>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolores culpa qui aliquam placeat nobis veritatis tempora natus rerum obcaecati.</p>
            </div>

            <div className="media-with-text p-md-4">
              <div className="img-border-sm mb-4">
                <a href="#" className="popup-vimeo image-play">
                  <img src="/theme/images/img_2.jpg" alt="" className="img-fluid" loading="lazy" decoding="async" />
                </a>
              </div>
              <h2 className="heading mb-0"><a href="#">Lorem Ipsum Dolor Sit Amet</a></h2>
              <span className="mb-3 d-block post-date">Dec 20th, 2018 &bull; By <a href="#">Admin</a></span>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolores culpa qui aliquam placeat nobis veritatis tempora natus rerum obcaecati.</p>
            </div>

            <div className="media-with-text p-md-4">
              <div className="img-border-sm mb-4">
                <a href="#" className="popup-vimeo image-play">
                  <img src="/theme/images/img_3.jpg" alt="" className="img-fluid" loading="lazy" decoding="async" />
                </a>
              </div>
              <h2 className="heading mb-0"><a href="#">Lorem Ipsum Dolor Sit Amet</a></h2>
              <span className="mb-3 d-block post-date">Dec 20th, 2018 &bull; By <a href="#">Admin</a></span>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolores culpa qui aliquam placeat nobis veritatis tempora natus rerum obcaecati.</p>
            </div>
          </OwlCarousel>
        </div>
      </div>

      {/*
        PLACEHOLDER SECTION — testimonials below are template filler with
        invented names/quotes. Replace with real guest reviews, or delete this
        whole section, before going live.
      */}
      <div className="site-section block-14 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto text-center mb-5 section-heading">
              <h2>What People Say</h2>
            </div>
          </div>

          <OwlCarousel className="nonloop-block-14 owl-carousel" options={TESTIMONIALS_OPTIONS}>
            <div className="p-4">
              <div className="d-flex block-testimony">
                <div className="person mr-3">
                  <img src="/theme/images/person_1.jpg" alt="Image" className="img-fluid rounded" loading="lazy" decoding="async" />
                </div>
                <div>
                  <h2 className="h5">Katie Johnson</h2>
                  <blockquote>&ldquo;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias accusantium qui optio, possimus necessitatibus voluptate aliquam velit nostrum tempora ipsam!&rdquo;</blockquote>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="d-flex block-testimony">
                <div className="person mr-3">
                  <img src="/theme/images/person_2.jpg" alt="Image" className="img-fluid rounded" loading="lazy" decoding="async" />
                </div>
                <div>
                  <h2 className="h5">Jane Mars</h2>
                  <blockquote>&ldquo;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias accusantium qui optio, possimus necessitatibus voluptate aliquam velit nostrum tempora ipsam!&rdquo;</blockquote>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="d-flex block-testimony">
                <div className="person mr-3">
                  <img src="/theme/images/person_3.jpg" alt="Image" className="img-fluid rounded" loading="lazy" decoding="async" />
                </div>
                <div>
                  <h2 className="h5">Shane Holmes</h2>
                  <blockquote>&ldquo;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias accusantium qui optio, possimus necessitatibus voluptate aliquam velit nostrum tempora ipsam!&rdquo;</blockquote>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="d-flex block-testimony">
                <div className="person mr-3">
                  <img src="/theme/images/person_4.jpg" alt="Image" className="img-fluid rounded" loading="lazy" decoding="async" />
                </div>
                <div>
                  <h2 className="h5">Mark Johnson</h2>
                  <blockquote>&ldquo;Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias accusantium qui optio, possimus necessitatibus voluptate aliquam velit nostrum tempora ipsam!&rdquo;</blockquote>
                </div>
              </div>
            </div>
          </OwlCarousel>
        </div>
      </div>
    </>
  );
}
