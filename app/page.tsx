import { Metadata } from "next";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCalendarCheck,
  faCirclePlay,
  faChevronDown,
  faSun,
  faChild,
  faGraduationCap,
  faArrowRight,
  faPlay,
  faHouse,
  faHeart,
  faHandshakeAngle,
  faLocationDot,
  faBuilding,
  faPhone,
  faEnvelope,
  faDiamondTurnRight,
  faPodcast,
  faDroplet,
  faHandsPraying,
} from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Thrive Community Church | Estero, FL - You Belong",
  description: "Join us at Thrive Community Church in Estero, FL. Contemporary worship, biblical teaching, and genuine community. Sundays at 10 AM. A congregation of the Lutheran Church—Missouri Synod.",
  openGraph: {
    title: "Thrive Community Church | Estero, FL",
    description: "Contemporary worship, biblical teaching, and genuine community. Sundays at 10 AM in Estero, FL.",
    url: "https://thrive-fl.org",
    images: [
      {
        url: "https://d2v6hk6f64og35.cloudfront.net/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Thrive Community Church",
      },
    ],
  },
};

import { OrganizationJsonLd, WebSiteJsonLd } from "./components/JsonLd";

export default function HomePage() {
  return (
    <div className="page-wrapper">
      {/* JSON-LD Structured Data for SEO */}
      <OrganizationJsonLd />
      <WebSiteJsonLd />

      {/* Hero Section with Background Video */}
      <section className="hero-section">
        {/* Video Background */}
        <div className="hero-video-container">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://d2v6hk6f64og35.cloudfront.net/Still.jpg"
            alt=""
            className="hero-poster-preload"
            fetchPriority="high"
            style={{ display: 'none' }}
            aria-hidden="true"
          />
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            poster="https://d2v6hk6f64og35.cloudfront.net/Still.jpg"
          >
            <source src="https://d2v6hk6f64og35.cloudfront.net/home.mp4" type="video/mp4" />
          </video>
          {/* Fallback image for mobile or when video fails */}
          <div className="hero-image-fallback"></div>
          {/* Dark overlay for text readability */}
          <div className="hero-overlay"></div>
        </div>

        {/* Hero Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-welcome">Welcome to</span>
            Thrive Community Church
          </h1>
          <p className="hero-tagline">You Belong</p>
          <div className="hero-info">
            <p className="hero-service-time">
              <FontAwesomeIcon icon={faClock} />
              Sundays at 10 AM
            </p>
            <p className="hero-location">
              <FontAwesomeIcon icon={faLocationDot} />
              Estero, FL
            </p>
          </div>
          <div className="hero-cta">
            <a href="/im-new" className="btn btn-primary">
              <FontAwesomeIcon icon={faCalendarCheck} />
              Join Us This Sunday
            </a>
            <a href="/sermons" className="btn btn-secondary">
              <FontAwesomeIcon icon={faCirclePlay} />
              Watch a Message
            </a>
          </div>
          {/* Scroll indicator */}
          <div className="scroll-indicator">
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
      </section>

      {/* Location Bar */}
      <section className="plan-visit-section">
        <div className="container">
          <div className="plan-visit-banner">
            <div className="plan-visit-item">
              <FontAwesomeIcon icon={faLocationDot} className="plan-visit-icon" />
              <span>20041 S. Tamiami Trail, Estero, FL 33928</span>
            </div>
            <a
              href="https://maps.google.com/maps/dir//Thrive+Community+Church+20041+S+Tamiami+Trl+%23+1+Estero,+FL+33928/@26.4487313,-81.8159419,15z"
              target="_blank"
              rel="noopener noreferrer"
              className="plan-visit-cta"
            >
              <FontAwesomeIcon icon={faDiamondTurnRight} />
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Service Times Section */}
      <section className="section service-times-section">
        <div className="container">
          <h2 className="section-title">
            Service Times
          </h2>
          <div className="service-times-grid">
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faSun} />
              </div>
              <h3>Sunday Worship</h3>
              <p className="service-time">10:00 AM</p>
              <p className="service-description">
                Contemporary worship, biblical teaching, and genuine community
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faChild} />
              </div>
              <h3>Thrive Kids</h3>
              <p className="service-time">During Service</p>
              <p className="service-description">
                Age-appropriate Bible teaching for children 6 months through 5th grade
              </p>
            </div>
            <a href="/ministries/college" className="service-card service-card-link">
              <div className="service-icon">
                <FontAwesomeIcon icon={faGraduationCap} />
              </div>
              <h3>ThriveFGCU</h3>
              <p className="service-time">Multiple Weekly Gatherings</p>
              <p className="service-description">
                Faith, friends, and fun for FGCU students
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="section welcome-section">
        <div className="container">
          <div className="welcome-content">
            <div className="welcome-text">
              <h2 className="section-title">A Church For Our City</h2>
              <p className="welcome-lead">
                Thrive is more than just a meeting to attend. It&apos;s a diverse,
                spiritually growing family to be a part of, centered on the person
                and mission of Jesus Christ.
              </p>
              <p>
                We&apos;re actively working to build a great city, renewed by the truth,
                grace, and changing power of the gospel. Whether you&apos;re exploring
                faith for the first time or looking for a church home, you&apos;ll find
                a warm welcome here.
              </p>
              <a href="/im-new" className="btn btn-outline">
                Learn More About Us
                <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>
            <div className="welcome-image">
              <div className="image-placeholder">
                <Image
                  src="https://d2v6hk6f64og35.cloudfront.net/Estero.jpg"
                  alt="Welcome to Thrive"
                  width={600}
                  height={400}
                  sizes="(max-width: 768px) 100vw, 600px"
                  quality={75}
                  priority
                  style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="section quicklinks-section">
        <div className="container">
          <h2 className="section-title">Get Connected</h2>
          <div className="quicklinks-grid">
            <a href="/sermons" className="quicklink-card">
              <div className="quicklink-icon">
                <FontAwesomeIcon icon={faPlay} />
              </div>
              <h3>Listen to Sermons</h3>
              <p>Watch sermons in HD or re-watch a message if you missed something</p>
              <span className="quicklink-action">Browse Messages</span>
            </a>
            <a href="/small-groups" className="quicklink-card">
              <div className="quicklink-icon">
                <FontAwesomeIcon icon={faHouse} />
              </div>
              <h3>Join a Small Group</h3>
              <p>Home Huddles for everyone with any schedule - join one today</p>
              <span className="quicklink-action">Find a Group</span>
            </a>
            <a href="/ministries/kids" className="quicklink-card">
              <div className="quicklink-icon">
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <h3>Thrive Kids</h3>
              <p>Available every Sunday for all your little ones</p>
              <span className="quicklink-action">Learn More</span>
            </a>
            <a href="/get-involved" className="quicklink-card">
              <div className="quicklink-icon">
                <FontAwesomeIcon icon={faHandshakeAngle} />
              </div>
              <h3>Get Involved</h3>
              <p>Use your gifts to serve and make a difference at Thrive</p>
              <span className="quicklink-action">Serve With Us</span>
            </a>
            <a href="/baptism" className="quicklink-card">
              <div className="quicklink-icon">
                <FontAwesomeIcon icon={faDroplet} />
              </div>
              <h3>Baptism</h3>
              <p>Ready for your next step in following Jesus?</p>
              <span className="quicklink-action">Learn About Baptism</span>
            </a>
            <a href="/care" className="quicklink-card">
              <div className="quicklink-icon">
                <FontAwesomeIcon icon={faHandsPraying} />
              </div>
              <h3>Care &amp; Prayer</h3>
              <p>You&apos;re not a burden. Let us walk with you in prayer and care.</p>
              <span className="quicklink-action">Get Care &amp; Prayer</span>
            </a>
            <a href="/podcast" className="quicklink-card">
              <div className="quicklink-icon">
                <FontAwesomeIcon icon={faPodcast} />
              </div>
              <h3>Listen to Our Podcast</h3>
              <p>Subscribe on Apple Podcasts, Spotify, and more</p>
              <span className="quicklink-action">Subscribe Now</span>
            </a>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="section location-section">
        <div className="container">
          <div className="location-content">
            <div className="location-info">
              <h2 className="section-title">
                <FontAwesomeIcon icon={faLocationDot} />
                Find Us
              </h2>
              <div className="location-details">
                <div className="location-item">
                  <div className="location-item-icon">
                    <FontAwesomeIcon icon={faBuilding} />
                  </div>
                  <div>
                    <strong>20041 S. Tamiami Trail #1</strong>
                    <p>Estero, FL 33928</p>
                  </div>
                </div>
                <div className="location-item">
                  <div className="location-item-icon">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <div>
                    <a href="tel:+12396873430">(239) 687-3430</a>
                  </div>
                </div>
                <div className="location-item">
                  <div className="location-item-icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div>
                    <a href="mailto:info@thrive-fl.org">info@thrive-fl.org</a>
                  </div>
                </div>
              </div>
              <a
                href="https://maps.google.com/maps/dir//Thrive+Community+Church+20041+S+Tamiami+Trl+%23+1+Estero,+FL+33928/@26.4487313,-81.8159419,15z/data=!4m5!4m4!1m0!1m2!1m1!1s0x88db168c655e1ef7:0x82f0ad091c85ad3a"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <FontAwesomeIcon icon={faDiamondTurnRight} />
                Get Directions
              </a>
            </div>
            <div className="location-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4609.462053318237!2d-81.81851682376421!3d26.44873607987428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88db168c655e1ef7%3A0x82f0ad091c85ad3a!2sThrive%20Community%20Church!5e0!3m2!1sen!2sus!4v1766075584314!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Thrive Community Church Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


