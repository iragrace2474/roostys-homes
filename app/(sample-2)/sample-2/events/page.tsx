// PLACEHOLDER PAGE — the post cards below are template filler (Lorem Ipsum,
// sample dates/authors), ported from Montana's blog.html article-card layout
// (category/tag/search sidebar and comment counts dropped — there's no real
// taxonomy to back them). Replace with real Roosty's Homes news, events, or
// blog posts when available. Roosty's gardens are also available for
// weddings, parties and functions — this page could showcase those instead.
const POSTS = [
  { img: 'img_1.jpg', day: '15', month: 'Jan' },
  { img: 'img_2.jpg', day: '15', month: 'Jan' },
  { img: 'img_3.jpg', day: '15', month: 'Jan' },
  { img: 'img_4.jpg', day: '15', month: 'Jan' },
  { img: 'img_5.jpg', day: '15', month: 'Jan' },
  { img: 'img_6.jpg', day: '15', month: 'Jan' },
];

export default function Events() {
  return (
    <>
      <div
        className="bradcam_area overlay"
        style={{ backgroundImage: 'url(/roosty-photos/gardens-1.jpg)' }}
      >
        <h3>Events &amp; Updates</h3>
      </div>

      <section className="blog_area section-padding">
        <div className="container">
          <div className="row">
            {POSTS.map((post) => (
              <div className="col-md-6 col-lg-4" key={post.img}>
                <article className="blog_item">
                  <div className="blog_item_img">
                    <img className="card-img rounded-0" src={`/theme/images/${post.img}`} alt="" loading="lazy" decoding="async" />
                    <a href="#" className="blog_item_date">
                      <h3>{post.day}</h3>
                      <p>{post.month}</p>
                    </a>
                  </div>
                  <div className="blog_details">
                    <a className="d-inline-block" href="#">
                      <h2>Lorem Ipsum Dolor Sit Amet</h2>
                    </a>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio dolores culpa
                      qui aliquam placeat nobis veritatis tempora natus rerum obcaecati.
                    </p>
                    <ul className="blog-info-link">
                      <li><a href="#"><i className="fa fa-user"></i> Roosty&apos;s Homes</a></li>
                    </ul>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
