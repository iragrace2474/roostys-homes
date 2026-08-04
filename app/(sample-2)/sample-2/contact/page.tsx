// Contact form below is visual-only (no backend wired up), matching the rest
// of the site's forms. The map is a key-less Google Maps embed for the same
// address already linked from the header/footer elsewhere on the site.
export default function Contact() {
  return (
    <>
      <div
        className="bradcam_area overlay"
        style={{ backgroundImage: 'url(/roosty-photos/AT8A2629.jpg-scaled.jpg)' }}
      >
        <h3>Get in Touch</h3>
      </div>

      <section className="contact-section">
        <div className="container">
          <div className="d-none d-sm-block mb-5 pb-4">
            <iframe
              title="Roosty's Homes location"
              src="https://www.google.com/maps?q=Ruharo+Nkokonjeru,+Mbarara+City&output=embed"
              style={{ height: '480px', width: '100%', border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="row">
            <div className="col-12">
              <h2 className="contact-title">Get in Touch</h2>
            </div>
            <div className="col-lg-8">
              <form className="form-contact contact_form" action="#">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input className="form-control" name="name" id="name" type="text" placeholder="Full Name" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input className="form-control" name="email" id="email" type="email" placeholder="Email address" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input className="form-control" name="phone" id="phone" type="text" placeholder="Phone #" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <input className="form-control" name="subject" id="subject" type="text" placeholder="Subject" />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <textarea className="form-control w-100" name="message" id="message" cols={30} rows={7} placeholder="Say hello to us"></textarea>
                    </div>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <button type="submit" className="button button-contactForm boxed-btn">Send</button>
                </div>
              </form>
            </div>
            <div className="col-lg-3 offset-lg-1">
              <div className="media contact-info">
                <span className="contact-info__icon"><i className="ti-home"></i></span>
                <div className="media-body">
                  <h3>Ruharo Nkokonjeru</h3>
                  <p>Mbarara City, Uganda</p>
                </div>
              </div>
              <div className="media contact-info">
                <span className="contact-info__icon"><i className="ti-tablet"></i></span>
                <div className="media-body">
                  <h3><a href="tel:+256707113630">+256 707 113630</a></h3>
                  <p><a href="tel:+256768640830">+256 768 640830</a></p>
                </div>
              </div>
              <div className="media contact-info">
                <span className="contact-info__icon"><i className="ti-email"></i></span>
                <div className="media-body">
                  <h3><a href="mailto:info@roostyshomes.com">info@roostyshomes.com</a></h3>
                  <p><a href="mailto:roostyshomes@gmail.com">roostyshomes@gmail.com</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
