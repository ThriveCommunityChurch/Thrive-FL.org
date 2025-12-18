import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Beliefs | Thrive Community Church",
  description: "Grace alone. Faith alone. Scripture alone. Explore the foundational beliefs of Thrive Community Church, a congregation of the Lutheran Church—Missouri Synod.",
  openGraph: {
    title: "Our Beliefs | Thrive Community Church",
    description: "Grace alone. Faith alone. Scripture alone. Discover our Lutheran heritage and what we believe.",
    url: "https://thrive-fl.org/about/beliefs",
  },
};

export default function BeliefsPage() {
  return (
    <div className="page-wrapper">
      {/* Page Hero Section */}
      <section className="page-hero page-hero-beliefs">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Our Beliefs</h1>
          <p className="page-hero-subtitle">
            Grace. Faith. Scripture. That&apos;s it.
          </p>
        </div>
      </section>

      {/* Core Message - Three Pillars */}
      <section className="section beliefs-pillars-section">
        <div className="container">
          <div className="beliefs-pillars-grid">
            <div className="beliefs-pillar-card">
              <div className="beliefs-pillar-icon">
                <i className="fa-solid fa-heart"></i>
              </div>
              <h3>Grace Alone</h3>
              <p>
                Rescued from sin purely by the <strong>undeserved mercy of God</strong>.
                Period. No earning it. No deserving it. Just receiving it.
              </p>
            </div>
            <div className="beliefs-pillar-card">
              <div className="beliefs-pillar-icon">
                <i className="fa-solid fa-hands-praying"></i>
              </div>
              <h3>Faith Alone</h3>
              <p>
                Through faith—a relationship of dependence on Jesus that <strong>God Himself gives us</strong>—forgiveness
                and new life become ours.
              </p>
            </div>
            <div className="beliefs-pillar-card">
              <div className="beliefs-pillar-icon">
                <i className="fa-solid fa-book-bible"></i>
              </div>
              <h3>Scripture Alone</h3>
              <p>
                God&apos;s Word stands over us as ultimate—making us aware of sin,
                filling us with faith, and <strong>guiding us in faith-filled living</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Break - Community */}
      <section className="beliefs-image-section">
        <div className="beliefs-image-container">
          <Image
            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1600&q=80"
            alt="Community gathered in worship"
            className="beliefs-hero-image"
            width={1600}
            height={900}
            style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
          />
          <div className="beliefs-image-overlay">
            <blockquote className="beliefs-quote">
              &ldquo;For by grace you have been saved through faith. And this is not your own doing; it is the gift of God.&rdquo;
              <cite>— Ephesians 2:8</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* The Apostles' Creed */}
      <section className="section beliefs-creed-section">
        <div className="container">
          <div className="beliefs-creed-layout">
            <div className="beliefs-creed-image">
              <Image
                src="https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80"
                alt="Cross silhouette at sunrise"
                width={800}
                height={600}
                style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
              />
            </div>
            <div className="beliefs-creed-content">
              <span className="section-eyebrow">What We Confess</span>
              <h2 className="section-title-left">The Apostles&apos; Creed</h2>
              <p className="beliefs-creed-intro">
                For nearly 2,000 years, Christians have confessed these foundational truths together.
              </p>
              <div className="creed-card">
                <p className="creed-text">
                  <strong>I believe in God</strong>, the Father Almighty, Maker of heaven and earth,
                </p>
                <p className="creed-text">
                  and in <strong>Jesus Christ</strong>, His only Son, our Lord: Who was conceived by the Holy Spirit,
                  born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried.
                  He descended into hell. On the third day He rose again from the dead. He ascended into heaven
                  and sits at the right hand of God the Father Almighty, from there He shall come to judge
                  the living and the dead.
                </p>
                <p className="creed-text">
                  I believe in <strong>the Holy Spirit</strong>, the Holy Christian Church, the communion of saints,
                  the forgiveness of sins, the resurrection of the body, and the life everlasting.
                </p>
                <p className="creed-amen">Amen.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Tradition */}
      <section className="section beliefs-heritage-section">
        <div className="container">
          <div className="beliefs-heritage-layout">
            <div className="beliefs-heritage-content">
              <span className="section-eyebrow">Our Roots</span>
              <h2 className="section-title-left">Lutheran Heritage</h2>
              <p className="heritage-lead">
                <strong>Lutheran.</strong> That&apos;s us. Specifically, we&apos;re part of the
                Lutheran Church—Missouri Synod (LCMS).
              </p>
              <p>
                Being Lutheran simply means we hold to the scriptural truths that sparked the
                Reformation in the 16th century—a renewed focus on the Gospel that changed everything.
              </p>
              <p>
                We believe in an <strong>extravagant and mysterious view of God&apos;s love</strong>:
                that people are saved purely by God&apos;s grace through faith alone, apart from works.
              </p>
              <div className="heritage-features">
                <div className="heritage-feature">
                  <i className="fa-solid fa-droplet"></i>
                  <span>Baptism</span>
                </div>
                <div className="heritage-feature">
                  <i className="fa-solid fa-wheat-awn"></i>
                  <span>Lord&apos;s Supper</span>
                </div>
                <div className="heritage-feature">
                  <i className="fa-solid fa-book-open"></i>
                  <span>God&apos;s Word</span>
                </div>
              </div>
              <a href="https://www.lcms.org/about/beliefs" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Learn More About the LCMS <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </div>
            <div className="beliefs-heritage-image">
              <Image
                src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80"
                alt="Open Bible on wooden table"
                width={800}
                height={600}
                style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contemporary Expression */}
      <section className="section beliefs-contemporary-section">
        <div className="container">
          <div className="beliefs-contemporary-layout">
            <div className="beliefs-contemporary-content">
              <span className="section-eyebrow">How We Worship</span>
              <h2 className="section-title-left">Ancient Truth, Contemporary Expression</h2>
              <p className="contemporary-lead">
                <strong>Same gospel. Different style.</strong> We hold to the historic Christian faith passed down
                through generations of Lutherans—but we express it in ways that connect with people today.
              </p>
              <p>
                You&apos;ll hear contemporary music, see people in jeans and t-shirts, and experience
                a relaxed atmosphere. But don&apos;t let the style fool you: the substance is
                deeply rooted in Scripture and the Lutheran confessions.
              </p>
              <p>
                Lutheran theology has always distinguished between what&apos;s essential and what&apos;s
                not. Doctrine matters—worship style is a matter of freedom. This principle,
                called <em>adiaphora</em>, means churches can adapt how they gather without
                compromising what they believe.
              </p>
              <p>
                At Thrive, we leverage that freedom intentionally. We want to remove every
                unnecessary barrier between people and the life-changing message of Jesus—while
                never compromising the truth of that message itself.
              </p>
            </div>
            <div className="beliefs-contemporary-features">
              <div className="contemporary-feature">
                <i className="fa-solid fa-music"></i>
                <div>
                  <strong>Contemporary Worship</strong>
                  <p>Modern music that helps you engage with timeless truths</p>
                </div>
              </div>
              <div className="contemporary-feature">
                <i className="fa-solid fa-comments"></i>
                <div>
                  <strong>Practical Teaching</strong>
                  <p>Biblical preaching applied to everyday life</p>
                </div>
              </div>
              <div className="contemporary-feature">
                <i className="fa-solid fa-users"></i>
                <div>
                  <strong>Welcoming Environment</strong>
                  <p>Casual atmosphere where everyone can belong</p>
                </div>
              </div>
              <div className="contemporary-feature">
                <i className="fa-solid fa-book-bible"></i>
                <div>
                  <strong>Confessional Foundation</strong>
                  <p>Grounded in Scripture and Lutheran theology</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learn More CTA */}
      <section className="section cta-section beliefs-cta">
        <div className="container container-narrow">
          <div className="cta-content">
            <h2>Questions About What We Believe?</h2>
            <p>
              We&apos;d love to talk. Faith isn&apos;t about having all the answers—it&apos;s about
              walking together as we figure it out.
            </p>
            <div className="cta-buttons">
              <a href="/contact" className="btn btn-primary">
                <i className="fa-solid fa-comments"></i> Start a Conversation
              </a>
              <a href="/visit" className="btn btn-outline-white">
                <i className="fa-solid fa-calendar"></i> Visit Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}