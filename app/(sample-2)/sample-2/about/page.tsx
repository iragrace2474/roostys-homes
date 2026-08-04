import OwlCarousel from '../../../owl-carousel';

// Same owl-carousel config Montana's main.js uses for .about_active.
const ABOUT_CAROUSEL_OPTIONS = {
  loop: true,
  margin: 0,
  items: 1,
  autoplay: true,
  navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
  nav: true,
  dots: false,
  autoplayHoverPause: true,
  autoplaySpeed: 800,
  responsive: {
    0: { items: 1, nav: false },
    767: { items: 1, nav: false },
    992: { items: 1 },
  },
};

const CAROUSEL_IMAGES = ['DJI_0037.jpg.jpg', 'gardens-2.jpg', 'g-6.jpg', 'roosty-10-1.jpg'];
const GALLERY = ['g-9.jpg', 'AT8A2436.jpg-scaled.jpg', 'AT8A2557.jpg.jpg', 'roosty-11.jpg', 'g-2.jpg'];

export default function About() {
  return (
    <>
      <div
        className="bradcam_area overlay"
        style={{ backgroundImage: 'url(/roosty-photos/home.jpg)' }}
      >
        <h3>About Roosty&apos;s Homes</h3>
      </div>

      <div className="about_area">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-5">
              <div className="about_info">
                <div className="section_title mb-20px">
                  <span>About Us</span>
                  <h3>Roosty&apos;s Homes, <br /> Perfect Service</h3>
                </div>
                <p>
                  Roosty&apos;s Homes offers a welcoming restaurant and bar serving delicious meals
                  and refreshing drinks, paired with comfortable accommodation. Enjoy a relaxing
                  stay with great hospitality, serene surroundings, quality service, and spaces
                  perfect for dining, leisure, family time, and peaceful rest.
                </p>
              </div>
            </div>
            <div className="col-xl-7 col-lg-7">
              <div className="about_thumb d-flex">
                <div className="img_1">
                  <img src="/roosty-photos/restaurant-1.jpg" alt="Roosty's Homes bar" fetchPriority="high" decoding="sync" />
                </div>
                <div className="img_2">
                  <img src="/roosty-photos/g-5.jpg" alt="Roosty's Homes restaurant" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about_info_area">
        <OwlCarousel className="about_active owl-carousel" options={ABOUT_CAROUSEL_OPTIONS}>
          {CAROUSEL_IMAGES.map((img) => (
            <div
              className="single_slider"
              key={img}
              style={{ backgroundImage: `url(/roosty-photos/${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
          ))}
        </OwlCarousel>
      </div>

      <div className="about_main_info">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-md-6">
              <div className="single_about_info">
                <h3>Great Food &amp; <br /> Great Company</h3>
                <p>
                  A vibrant bar and restaurant serving delicious meals and refreshing drinks,
                  set among beautiful gardens — spaces perfect for dining, leisure and family
                  time.
                </p>
              </div>
            </div>
            <div className="col-xl-6 col-md-6">
              <div className="single_about_info">
                <h3>Comfort &amp; <br /> Security</h3>
                <p>
                  Roosty&apos;s Homes ensures guest safety with secure premises, controlled access,
                  attentive staff, and well-maintained facilities, offering a peaceful, protected
                  environment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="forQuery">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 offset-xl-1 col-md-12">
              <div className="Query_border">
                <div className="row align-items-center justify-content-center">
                  <div className="col-xl-6 col-md-6">
                    <div className="Query_text">
                      <p>For Reservation or Query?</p>
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-6">
                    <div className="phone_num">
                      <a href="tel:+256707113630" className="mobile_no">+256 707 113630</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="instragram_area">
        {GALLERY.map((img) => (
          <div className="single_instagram" key={img}>
            <a href={`/roosty-photos/${img}`} className="popup-image">
              <img src={`/roosty-photos/${img}`} alt="Roosty's Homes" loading="lazy" decoding="async" />
              <div className="ovrelay">
                <i className="fa fa-search"></i>
              </div>
            </a>
          </div>
        ))}
      </div>
    </>
  );
}
