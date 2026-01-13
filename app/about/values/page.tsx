import { Metadata } from "next";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPeopleGroup,
  faCity,
  faSeedling,
  faMagnifyingGlassLocation,
  faGlobe,
  faMapLocationDot,
  faBookBible,
} from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Our Values | Thrive Community Church",
  description: "Discover the six core values that shape everything we do at Thrive Community Church: compassion, relationships, community, growth, love for the lost, and global mission.",
  openGraph: {
    title: "Our Values | Thrive Community Church",
    description: "Six core values that shape everything we do at Thrive Community Church.",
    url: "https://thrive-fl.org/about/values",
  },
};

export default function ValuesPage() {
  return (
    <div className="page-wrapper">
      {/* Page Hero Section */}
      <section className="page-hero page-hero-values">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Our Values</h1>
          <p className="page-hero-subtitle">
            These aren&apos;t just words on a wall—they shape everything we do.
          </p>
        </div>
      </section>

      {/* Values Introduction */}
      <section className="section values-intro-section">
        <div className="container">
          <div className="values-intro-layout">
            <div className="values-intro-content">
              <span className="section-eyebrow">Our Foundation</span>
              <h2 className="section-title-left">Six Core Values</h2>
              <p className="values-intro-lead">
                Values aren&apos;t just nice ideas—they&apos;re the <strong>compass that guides our decisions</strong>,
                shapes our community, and keeps us moving in the right direction.
              </p>
              <p>
                Rooted in our Lutheran heritage—where grace is free, faith is a gift, and
                every person matters to God—these six values define who we are and who
                we&apos;re becoming. They&apos;re the heartbeat of Thrive Community Church.
              </p>
            </div>
            <div className="values-intro-image">
              <Image
                src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&q=80"
                alt="Community gathering together"
                width={800}
                height={600}
                style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid - First Row (3 values) */}
      <section className="section values-grid-section">
        <div className="container">
          <div className="values-grid-modern">
            <div className="value-card-modern">
              <div className="value-card-icon">
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <h3>Compassion for All People</h3>
              <p>
                Everyone&apos;s broken. Everyone needs love. Just like Jesus had compassion
                on the crowds, we want to meet people where they are—no judgment, no pretense.
              </p>
              <span className="value-scripture">Mark 6:34 &bull; 2 Corinthians 1:3-7</span>
            </div>

            <div className="value-card-modern">
              <div className="value-card-icon">
                <FontAwesomeIcon icon={faPeopleGroup} />
              </div>
              <h3>Thriving Relationships</h3>
              <p>
                Relationships are everything—with God and with each other. We&apos;re not just
                about attendance; we&apos;re about real connection that actually matters.
              </p>
              <span className="value-scripture">Ephesians 4:1-16 &bull; Colossians 3:12-17</span>
            </div>

            <div className="value-card-modern">
              <div className="value-card-icon">
                <FontAwesomeIcon icon={faCity} />
              </div>
              <h3>Thriving Community</h3>
              <p>
                We want Estero, San Carlos, and FGCU to be better because we&apos;re here.
                Our faith should make a tangible difference in our neighborhoods.
              </p>
              <span className="value-scripture">Jeremiah 29:7 &bull; 1 Timothy 2:1-3</span>
            </div>
          </div>
        </div>
      </section>

      {/* Image Break - Scripture Quote */}
      <section className="values-image-section">
        <div className="values-image-container">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80"
            alt="Sunrise over mountains"
            className="values-hero-image"
            width={1600}
            height={900}
            style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
          />
          <div className="values-image-overlay">
            <blockquote className="values-quote">
              &ldquo;But seek first the kingdom of God and his righteousness, and all these things will be added to you.&rdquo;
              <cite>— Matthew 6:33</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Values Grid - Second Row (3 values) */}
      <section className="section values-grid-section values-grid-section-alt">
        <div className="container">
          <div className="values-grid-modern">
            <div className="value-card-modern">
              <div className="value-card-icon">
                <FontAwesomeIcon icon={faSeedling} />
              </div>
              <h3>Life-long Growth</h3>
              <p>
                We&apos;re not done yet—and neither are you. Thriving means continually
                growing in character, knowledge, and skills. Always learning. Always stretching.
              </p>
              <span className="value-scripture">Ephesians 4:1-16 &bull; Philippians 3:12-14</span>
            </div>

            <div className="value-card-modern">
              <div className="value-card-icon">
                <FontAwesomeIcon icon={faMagnifyingGlassLocation} />
              </div>
              <h3>Love for Lost People</h3>
              <p>
                We&apos;re biased toward people who aren&apos;t here yet. We want everyone
                to know Jesus and experience what it means to live in authentic community.
              </p>
              <span className="value-scripture">Luke 15 &bull; Luke 5:27-31</span>
            </div>

            <div className="value-card-modern">
              <div className="value-card-icon">
                <FontAwesomeIcon icon={faGlobe} />
              </div>
              <h3>Global &amp; Local Kingdom</h3>
              <p>
                We&apos;re both a local movement and part of something global. God&apos;s mission
                extends beyond Estero—and we want to be part of it everywhere.
              </p>
              <span className="value-scripture">Matthew 6:33 &bull; John 20:19-23</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section values-cta">
        <div className="container container-narrow">
          <div className="cta-content">
            <h2>Ready to See These Values in Action?</h2>
            <p>
              Come see what we&apos;re all about. Sundays at 10.
            </p>
            <div className="cta-buttons">
              <a href="/visit" className="btn btn-primary">
                <FontAwesomeIcon icon={faMapLocationDot} /> Join Us Sunday
              </a>
              <a href="/about/beliefs" className="btn btn-secondary">
                <FontAwesomeIcon icon={faBookBible} /> Explore Our Beliefs
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}