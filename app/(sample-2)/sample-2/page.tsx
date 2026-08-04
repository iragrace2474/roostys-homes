import Link from 'next/link';
import OwlCarousel from '../../owl-carousel';

// Montana's owl-carousel config for the hero (.slider_active), copied from
// the theme's own main.js so it behaves identically to the original template.
const HERO_OPTIONS = {
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

const AMENITIES = [
  { icon: 'fa-gamepad', label: 'Pool Table' },
  { icon: 'fa-clock-o', label: '24/7 Reservation' },
  { icon: 'fa-shield', label: 'Secure Premises' },
  { icon: 'fa-car', label: 'Car Parking' },
  { icon: 'fa-bell', label: 'Room Service' },
  { icon: 'fa-cutlery', label: 'Bar & Restaurant' },
  { icon: 'fa-glass', label: 'Cocktails & Fresh Juice' },
  { icon: 'fa-calendar-check-o', label: 'Online Booking' },
];

const ROOMS = [
  { img: 'img_3.jpg', name: 'One Bedroom Occupancy', price: 'UGX 200,000', note: '2 Guests · 190 sqm' },
  { img: 'img_1.jpg', name: 'Deluxe Cottage', price: 'UGX 200,000', note: '2 Guests · 600 sqm' },
  { img: 'img_2.jpg', name: 'Two Bedroom Occupancy', price: 'UGX 250,000', note: '6 Guests · 150 sqm' },
  { img: 'img_4.jpg', name: 'Family Suite', price: 'UGX 360,000', note: '4 Guests · 400 sqm' },
];

const GALLERY = ['g-2.jpg', 'g-6.jpg', 'gardens-2.jpg', 'g-7.jpg', 'DJI_0037.jpg.jpg'];

export default function Home() {
  return (
    <>
      <style>{`
        .amenity-card { padding: 40px 20px; }
        .amenity-icon { display: block; font-size: 46px; color: #009DFF; margin-bottom: 18px; }
        .amenity-card h3 { font-size: 18px; }
      `}</style>

      {/* Hero slider */}
      <div className="slider_area">
        <OwlCarousel className="slider_active owl-carousel" options={HERO_OPTIONS}>
          <div
            className="single_slider d-flex align-items-center justify-content-center"
            style={{ backgroundImage: 'url(/roosty-photos/DJI_0002.jpg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="slider_text text-center">
                    <h3>Roosty&apos;s Homes</h3>
                    <p>Comfort, Great Food &amp; Peaceful Stays in Mbarara</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="single_slider d-flex align-items-center justify-content-center"
            style={{ backgroundImage: 'url(/roosty-photos/DJI_0021.jpg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="slider_text text-center">
                    <h3>Cottages &amp; Gardens</h3>
                    <p>Ruharo Nkokonjeru, Mbarara City</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="single_slider d-flex align-items-center justify-content-center"
            style={{ backgroundImage: 'url(/roosty-photos/restaurant.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="slider_text text-center">
                    <h3>Bar &amp; Restaurant</h3>
                    <p>Great Food, Refreshing Drinks, Good Company</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </OwlCarousel>
      </div>

      {/* About */}
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
                <Link href="/sample-2/about" className="line-button">Learn More</Link>
              </div>
            </div>
            <div className="col-xl-7 col-lg-7">
              <div className="about_thumb d-flex">
                <div className="img_1">
                  <img src="/roosty-photos/home.jpg" alt="Roosty's Homes exterior" fetchPriority="high" decoding="sync" />
                </div>
                <div className="img_2">
                  <img src="/roosty-photos/home-2.jpg" alt="Roosty's Homes cottage" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Amenities (replaces Montana's fabricated "Ongoing Offers" discount cards) */}
      <div className="offers_area">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="section_title text-center mb-100">
                <span>What We Offer</span>
                <h3>Our Amenities</h3>
              </div>
            </div>
          </div>
          <div className="row">
            {AMENITIES.map((a) => (
              <div className="col-sm-6 col-md-6 col-lg-3" key={a.label}>
                <div className="single_offers amenity-card text-center">
                  <span className="amenity-icon"><i className={`fa ${a.icon}`}></i></span>
                  <h3>{a.label}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*
        PLACEHOLDER — reuses the site's existing stand-in Vimeo clip (not real
        Roosty's Homes footage) for the video-popup band. Replace with a real
        property video, or drop this section, when one exists.
      */}
      <div
        className="video_area video_bg overlay"
        style={{ backgroundImage: 'url(/roosty-photos/gardens-1.jpg)' }}
      >
        <div className="video_area_inner text-center">
          <span>Roosty&apos;s Homes</span>
          <h3>Relax and Enjoy your <br /> Stay With Us</h3>
          <a href="https://vimeo.com/28959265" className="video_btn popup-video">
            <i className="fa fa-play"></i>
          </a>
        </div>
      </div>

      {/* About — comfort & safety */}
      <div className="about_area">
        <div className="container">
          <div className="row">
            <div className="col-xl-7 col-lg-7">
              <div className="about_thumb2 d-flex">
                <div className="img_1">
                  <img src="/roosty-photos/AT8A2629.jpg-scaled.jpg" alt="Roosty's Homes reception" loading="lazy" decoding="async" />
                </div>
                <div className="img_2">
                  <img src="/roosty-photos/g-4.jpg" alt="Roosty's Homes bar and restaurant" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-5">
              <div className="about_info">
                <div className="section_title mb-20px">
                  <span>Your Comfort</span>
                  <h3>Comfort, Security <br /> &amp; Peace of Mind</h3>
                </div>
                <p>
                  Roosty&apos;s Homes ensures guest safety with secure premises, controlled access,
                  attentive staff, and well-maintained facilities, offering a peaceful, protected
                  environment for you and your family.
                </p>
                <Link href="/sample-2/about" className="line-button">Learn More</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured rooms */}
      <div className="features_room">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="section_title text-center mb-100">
                <span>Featured Rooms</span>
                <h3>Choose a Better Room</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="rooms_here">
          {ROOMS.map((room) => (
            <div className="single_rooms" key={room.name}>
              <div className="room_thumb">
                <img src={`/theme/images/${room.img}`} alt={room.name} loading="lazy" decoding="async" />
                <div className="room_heading d-flex justify-content-between align-items-center">
                  <div className="room_heading_inner">
                    <span>{room.price} / night</span>
                    <h3>{room.name}</h3>
                  </div>
                  <a href="#test-form" className="line-button popup-with-form">book now</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center mt-5">
              <Link href="/sample-2/rooms" className="book_now">View All Rooms</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Reservation phone CTA */}
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

      {/* Photo grid */}
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
