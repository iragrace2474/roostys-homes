const ROOMS = [
  { img: 'img_3.jpg', name: 'One Bedroom Occupancy', price: 'UGX 200,000', note: '2 Guests · 190 sqm' },
  { img: 'img_1.jpg', name: 'Deluxe Cottage', price: 'UGX 200,000', note: '2 Guests · 600 sqm' },
  { img: 'img_2.jpg', name: 'Two Bedroom Occupancy', price: 'UGX 250,000', note: '6 Guests · 150 sqm' },
  { img: 'img_4.jpg', name: 'Family Suite', price: 'UGX 360,000', note: '4 Guests · 400 sqm' },
];

const GALLERY = ['AT8A2436.jpg-scaled.jpg', 'g-9.jpg', 'AT8A2557.jpg.jpg', 'home.jpg', 'home-2.jpg'];

// Rooms page, ported from Montana's rooms.html: breadcrumb, room grid, phone
// CTA, photo grid. "book now" opens the shared booking modal in the layout
// (#test-form) rather than a per-room reservation sidebar — matching how
// Montana's own template handles booking site-wide.
export default function Rooms() {
  return (
    <>
      <div
        className="bradcam_area overlay"
        style={{ backgroundImage: 'url(/roosty-photos/DJI_0037.jpg.jpg)' }}
      >
        <h3>Rooms &amp; Cottages</h3>
      </div>

      <div className="features_room padding_top">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="section_title text-center mb-100">
                <span>Rooms &amp; Cottages</span>
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
                    <span>{room.price} / night &middot; {room.note}</span>
                    <h3>{room.name}</h3>
                  </div>
                  <a href="#test-form" className="line-button popup-with-form">book now</a>
                </div>
              </div>
            </div>
          ))}
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
