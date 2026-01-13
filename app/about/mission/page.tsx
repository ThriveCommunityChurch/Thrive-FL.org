import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faCompass,
  faHeart,
  faLightbulb,
  faHandHoldingHeart,
  faGraduationCap,
  faHouseChimney,
  faMapLocationDot,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Our Mission | Thrive Community Church",
  description: "Thrive exists to bless and disciple people so they thrive in their relationship with Jesus Christ and others. Reaching the FGCU campus and Estero community with hope and faith.",
  openGraph: {
    title: "Our Mission | Thrive Community Church",
    description: "A beacon of hope and faith for the FGCU campus and Estero community.",
    url: "https://thrive-fl.org/about/mission",
  },
};

export default function MissionPage() {
  return (
    <div className="page-wrapper">
      {/* Page Hero Section */}
      <section className="page-hero page-hero-mission">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Our Mission</h1>
          <p className="page-hero-subtitle">
            A beacon of hope and faith for our community
          </p>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="section mission-statement-section">
        <div className="container container-narrow">
          <div className="mission-statement-content">
            <span className="section-eyebrow">The Mission</span>
            <h2 className="mission-statement-text">
              Thrive exists to <span className="highlight">bless and disciple people</span> so 
              that they thrive in their relationship with Jesus Christ and others, 
              creating Christian community.
            </h2>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section mission-vision-section">
        <div className="container">
          <div className="mission-vision-layout">
            <div className="mission-vision-content">
              <span className="section-eyebrow">The Vision</span>
              <h2 className="section-title-left">A Beacon of Hope</h2>
              <p className="mission-vision-lead">
                We envision a church that is a <strong>beacon of hope and faith</strong> for 
                the FGCU campus, the Estero community, and beyond.
              </p>
              <p>
                Our vision is to help people find their <strong>purpose and calling</strong> through 
                Christ—to discover who God made them to be and live out that calling in 
                every area of their lives.
              </p>
              <p>
                Whether you&apos;re a college student navigating the challenges of young 
                adulthood, a family seeking a place to grow together, or someone searching 
                for meaning and community, Thrive is a place where you can belong, grow, 
                and find your way.
              </p>
            </div>
            <div className="mission-vision-image">
              <Image
                src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80"
                alt="Lighthouse beacon at sunset"
                width={800}
                height={600}
                style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Pillars */}
      <section className="section mission-pillars-section">
        <div className="container">
          <div className="section-header-centered">
            <span className="section-eyebrow">How We Live It Out</span>
            <h2 className="section-title">Three Mission Pillars</h2>
            <p className="section-subtitle">
              Our mission comes to life through these three focus areas
            </p>
          </div>

          <div className="mission-pillars-grid">
            <div className="mission-pillar-card">
              <div className="mission-pillar-icon">
                <FontAwesomeIcon icon={faGraduationCap} />
              </div>
              <h3>Reaching the Campus</h3>
              <p>
                Thrive was born on the FGCU campus, and we remain committed to reaching 
                college students with the love of Christ. Through ThriveFGCU, we provide 
                community, mentorship, and a place to explore faith during a pivotal 
                season of life.
              </p>
              <Link href="/ministries/college" className="mission-pillar-link">
                Learn about ThriveFGCU <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>

            <div className="mission-pillar-card">
              <div className="mission-pillar-icon">
                <FontAwesomeIcon icon={faHouseChimney} />
              </div>
              <h3>Serving Our Community</h3>
              <p>
                We want Estero, San Carlos, and Southwest Florida to be better because 
                Thrive is here. Through local outreach, partnerships, and simply being 
                good neighbors, we seek to make a tangible difference in the lives of 
                those around us.
              </p>
              <Link href="/connect/get-involved" className="mission-pillar-link">
                Get Involved <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>

            <div className="mission-pillar-card">
              <div className="mission-pillar-icon">
                <FontAwesomeIcon icon={faHandHoldingHeart} />
              </div>
              <h3>Discipling People</h3>
              <p>
                We don&apos;t just want people to attend—we want them to grow. Through 
                worship, small groups, mentorship, and serving, we help people deepen 
                their relationship with Jesus and discover their unique calling.
              </p>
              <Link href="/connect/small-groups" className="mission-pillar-link">
                Join a Small Group <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose Section */}
      <section className="section mission-purpose-section">
        <div className="container">
          <div className="mission-purpose-layout">
            <div className="mission-purpose-image">
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
                alt="Mountain sunrise representing purpose and calling"
                width={800}
                height={600}
                style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
              />
            </div>
            <div className="mission-purpose-content">
              <span className="section-eyebrow">Finding Your Purpose</span>
              <h2 className="section-title-left">You Were Made for More</h2>
              <p>
                We believe that every person is created by God with a unique purpose. 
                Our job isn&apos;t to tell you what that purpose is—it&apos;s to help you 
                discover it for yourself through a relationship with Jesus.
              </p>
              <p>
                At Thrive, you&apos;ll find a community that encourages you to ask the 
                big questions: <em>Why am I here? What am I made for? How can I make 
                a difference?</em>
              </p>
              <p>
                Whether you&apos;re just starting to explore faith or you&apos;ve been 
                following Jesus for years, there&apos;s always more to discover about 
                who God made you to be.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section mission-cta">
        <div className="container container-narrow">
          <div className="cta-content">
            <h2>Be Part of the Mission</h2>
            <p>
              We&apos;d love to have you join us. Come see what Thrive is all about 
              and discover how you can be part of what God is doing in Estero.
            </p>
            <div className="cta-buttons">
              <a href="/visit" className="btn btn-primary">
                <FontAwesomeIcon icon={faMapLocationDot} /> Plan Your Visit
              </a>
              <Link href="/about/values" className="btn btn-outline-white">
                <FontAwesomeIcon icon={faHeart} /> Explore Our Values
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

