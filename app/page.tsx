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
                <h1 className="mb-2">Welcome To Suites</h1>
                <h2 className="caption">Hotel &amp; Resort</h2>
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
                <h1 className="mb-2">Unique Experience</h1>
                <h2 className="caption">Enjoy With Us</h2>
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
                <h1 className="mb-2">Relaxing Room</h1>
                <h2 className="caption">Your Room, Your Stay</h2>
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
            <div className="col-md-6 col-lg-4 mb-5">
              <div className="hotel-room text-center">
                <a href="#" className="d-block mb-0 thumbnail">
                  <img src="/theme/images/img_1.jpg" alt="Image" className="img-fluid" fetchPriority="high" decoding="sync" />
                </a>
                <div className="hotel-room-body">
                  <h3 className="heading mb-0"><a href="#">Standard Room</a></h3>
                  <strong className="price">$350.00 / per night</strong>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-5">
              <div className="hotel-room text-center">
                <a href="#" className="d-block mb-0 thumbnail">
                  <img src="/theme/images/img_2.jpg" alt="Image" className="img-fluid" fetchPriority="high" decoding="sync" />
                </a>
                <div className="hotel-room-body">
                  <h3 className="heading mb-0"><a href="#">Family Room</a></h3>
                  <strong className="price">$400.00 / per night</strong>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-5">
              <div className="hotel-room text-center">
                <a href="#" className="d-block mb-0 thumbnail">
                  <img src="/theme/images/img_3.jpg" alt="Image" className="img-fluid" loading="lazy" decoding="async" />
                </a>
                <div className="hotel-room-body">
                  <h3 className="heading mb-0"><a href="#">Single Room</a></h3>
                  <strong className="price">$255.00 / per night</strong>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4 mb-5">
              <div className="hotel-room text-center">
                <a href="#" className="d-block mb-0 thumbnail">
                  <img src="/theme/images/img_1.jpg" alt="Image" className="img-fluid" loading="lazy" decoding="async" />
                </a>
                <div className="hotel-room-body">
                  <h3 className="heading mb-0"><a href="#">Deluxe Room</a></h3>
                  <strong className="price">$150.00 / per night</strong>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-5">
              <div className="hotel-room text-center">
                <a href="#" className="d-block mb-0 thumbnail">
                  <img src="/theme/images/img_2.jpg" alt="Image" className="img-fluid" loading="lazy" decoding="async" />
                </a>
                <div className="hotel-room-body">
                  <h3 className="heading mb-0"><a href="#">Luxury Room</a></h3>
                  <strong className="price">$200.00 / per night</strong>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-5">
              <div className="hotel-room text-center">
                <a href="#" className="d-block mb-0 thumbnail">
                  <img src="/theme/images/img_3.jpg" alt="Image" className="img-fluid" loading="lazy" decoding="async" />
                </a>
                <div className="hotel-room-body">
                  <h3 className="heading mb-0"><a href="#">Single Room</a></h3>
                  <strong className="price">$155.00 / per night</strong>
                </div>
              </div>
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
                <h2 className="mb-5">About Us</h2>
              </div>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, nisi Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Odit nobis magni eaque velit eum, id
                rem eveniet dolor possimus voluptas..
              </p>
              <p>
                <a href="https://vimeo.com/28959265" className="popup-vimeo text-uppercase">
                  Watch Video <span className="icon-arrow-right small"></span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto text-center mb-5 section-heading">
              <h2 className="mb-5">Hotel Features</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="text-center p-4 item">
                <span className="flaticon-pool display-3 mb-3 d-block text-primary"></span>
                <h2 className="h5">Swimming Pool</h2>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="text-center p-4 item">
                <span className="flaticon-desk display-3 mb-3 d-block text-primary"></span>
                <h2 className="h5">Hotel Teller</h2>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="text-center p-4 item">
                <span className="flaticon-exit display-3 mb-3 d-block text-primary"></span>
                <h2 className="h5">Fire Exit</h2>
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
                <h2 className="h5">Hair Dryer</h2>
              </div>
            </div>

            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="text-center p-4 item">
                <span className="flaticon-minibar display-3 mb-3 d-block text-primary"></span>
                <h2 className="h5">Minibar</h2>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="text-center p-4 item">
                <span className="flaticon-drink display-3 mb-3 d-block text-primary"></span>
                <h2 className="h5">Drinks</h2>
              </div>
            </div>
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="text-center p-4 item">
                <span className="flaticon-cab display-3 mb-3 d-block text-primary"></span>
                <h2 className="h5">Car Airport</h2>
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
              <h2 className="text-white">Summer Promo 50% Off</h2>
              <a href="#" className="text-white btn btn-outline-warning rounded-0 text-uppercase">
                Avail Now
              </a>
            </div>
            <div className="col-md-6">
              <span className="caption">The Promo will start in</span>
              <div id="date-countdown"></div>
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

      <div className="site-section block-15">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto text-center mb-5 section-heading">
              <h2>Upcoming Events</h2>
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
