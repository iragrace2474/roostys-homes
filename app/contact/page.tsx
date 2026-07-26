export default function Contact() {
  return (
    <>
      <div
        className="site-blocks-cover overlay"
        style={{ backgroundImage: 'url(/theme/images/hero_1.jpg)' }}
        data-stellar-background-ratio="0.5"
      >
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-7 text-center" data-aos="fade">
              <span className="caption mb-3">Chat With Us</span>
              <h1 className="mb-4">Get In Touch</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section site-section-sm">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8 mb-5">
              <form action="#" className="p-5 bg-white">
                <div className="row form-group">
                  <div className="col-md-12 mb-3 mb-md-0">
                    <label className="font-weight-bold" htmlFor="fullname">Full Name</label>
                    <input type="text" id="fullname" className="form-control" placeholder="Full Name" />
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-12">
                    <label className="font-weight-bold" htmlFor="email">Email</label>
                    <input type="email" id="email" className="form-control" placeholder="Email Address" />
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-md-12 mb-3 mb-md-0">
                    <label className="font-weight-bold" htmlFor="phone">Phone</label>
                    <input type="text" id="phone" className="form-control" placeholder="Phone #" />
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-md-12">
                    <label className="font-weight-bold" htmlFor="message">Message</label>
                    <textarea name="message" id="message" cols={30} rows={5} className="form-control" placeholder="Say hello to us"></textarea>
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-md-12">
                    <input type="submit" value="Send Message" className="btn btn-primary pill px-4 py-2" />
                  </div>
                </div>
              </form>
            </div>

            <div className="col-lg-4">
              <div className="p-4 mb-3 bg-white">
                <h3 className="h5 text-black mb-3">Contact Info</h3>
                <p className="mb-0 font-weight-bold">Address</p>
                <p className="mb-4">203 Fake St. Mountain View, San Francisco, California, USA</p>

                <p className="mb-0 font-weight-bold">Phone</p>
                <p className="mb-4"><a href="#">+1 232 3235 324</a></p>

                <p className="mb-0 font-weight-bold">Email Address</p>
                <p className="mb-0"><a href="#">youremail@domain.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
