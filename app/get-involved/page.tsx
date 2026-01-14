import { Metadata } from "next";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChurch,
  faComments,
  faDoorOpen,
  faEnvelope,
  faHand,
  faHandHoldingHeart,
  faLaptop,
  faMugHot,
  faMusic,
  faPhone,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export const metadata: Metadata = {
  title: "Get Involved | Thrive Community Church",
  description: "Serve at Thrive Community Church. Discover volunteer opportunities in worship, kids ministry, hospitality, tech, and more. Use your gifts to make a difference.",
  openGraph: {
    title: "Get Involved | Thrive Community Church",
    description: "Use your gifts to make a difference. Find your place to serve at Thrive.",
    url: "https://thrive-fl.org/get-involved",
    images: [
      {
        url: "https://d2v6hk6f64og35.cloudfront.net/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Thrive Community Church",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Involved | Thrive Community Church",
    description: "Use your gifts to make a difference. Find your place to serve at Thrive.",
    images: ["https://d2v6hk6f64og35.cloudfront.net/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thrive-fl.org/get-involved",
  },
};

export default function GetInvolvedPage() {
	  const ministryAreas: { icon: IconDefinition; title: string; description: string; image: string }[] = [
    {
      icon: faMusic,
      title: "Worship Team",
      description: "Share your musical gifts—vocals, instruments, or running sound. Help create an atmosphere where people can connect with God.",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80"
    },
    {
      icon: faDoorOpen,
      title: "Greeter / Usher",
      description: "Be a friendly face at the door, hand out bulletins, help visitors find a seat, and make everyone feel welcome.",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80"
    },
    {
      icon: faMugHot,
      title: "Hospitality",
      description: "Serve coffee, set up snacks, and create a warm atmosphere where people can connect before and after service.",
      image: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=600&q=80"
    },
    {
      icon: faLaptop,
      title: "Tech & Media",
      description: "Run slides, manage live stream, or help with video production. Keep our services running smoothly.",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&q=80"
    },
    {
      icon: faHandHoldingHeart,
      title: "Outreach & Service",
      description: "Help coordinate community service projects, outreach events, and ways we can love our neighbors well.",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80"
    },
    {
      icon: faComments,
      title: "Small Group Leader",
      description: "Lead a Home Huddle and help others grow in community and faith. Training provided!",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80"
    }
  ];

  return (
    <div className="page-wrapper">
      {/* Page Hero Section */}
      <section className="page-hero page-hero-involved">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Get Involved</h1>
          <p className="page-hero-subtitle">
            Everyone has something to offer. Find your place.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section intro-section">
        <div className="container container-narrow">
          <div className="intro-content">
            <h2 className="section-title">You Were Made for This</h2>
            <p className="intro-lead">
              We believe everyone has gifts and talents meant to be shared. When you
              serve, you&apos;re not just filling a slot—you&apos;re using what God gave
              you to make a real difference in people&apos;s lives.
            </p>
            <p>
              The best part? Serving is where some of the deepest friendships happen.
              There&apos;s something about working alongside others toward a common
              purpose that bonds people together.
            </p>
          </div>
        </div>
      </section>

      {/* Ministry Areas Section */}
      <section className="section involved-areas-section">
        <div className="container">
          <div className="section-header-centered">
            <span className="section-eyebrow">Ways to Serve</span>
            <h2 className="section-title">Find Your Fit</h2>
            <p className="section-subtitle">
              Not sure where you belong? That&apos;s okay—we&apos;ll help you figure it out.
            </p>
          </div>

          <div className="involved-areas-grid">
            {ministryAreas.map((area, index) => (
              <div key={index} className="involved-area-card">
                <div className="involved-area-image">
                  <Image
                    src={area.image}
                    alt={area.title}
                    width={600}
                    height={400}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                  <div className="involved-area-icon">
                    <FontAwesomeIcon icon={area.icon} />
                  </div>
                </div>
                <div className="involved-area-content">
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Serve Section */}
      <section className="section involved-why-section">
        <div className="container">
          <div className="involved-why-content">
            <div className="involved-why-image">
              <Image
                src="https://images.unsplash.com/photo-1593113630400-ea4288922497?w=800&q=80"
                alt="Volunteers serving together"
                width={800}
                height={600}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
            <div className="involved-why-text">
              <span className="section-eyebrow">Why Serve?</span>
              <h2>More Than Helping Out</h2>
              <p>
                When you serve at Thrive, you&apos;re not just checking a box or
                filling a need. You&apos;re part of something bigger.
              </p>
              <ul className="involved-why-list">
                <li>
                  <FontAwesomeIcon icon={faStar} />
                  <span><strong>Use your gifts</strong> in ways that actually matter</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faStar} />
                  <span><strong>Build friendships</strong> with people who share your values</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faStar} />
                  <span><strong>Grow spiritually</strong> as you step out in faith</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faStar} />
                  <span><strong>Make an impact</strong> on people&apos;s lives every week</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section involved-cta-section">
        <div className="container container-narrow">
          <div className="cta-content">
            <h2>Ready to Jump In?</h2>
            <p>
              Whether you know exactly where you want to serve or you&apos;re still
              figuring it out, we&apos;d love to chat. No pressure—just a conversation
              about how you might fit.
            </p>
	            <div className="cta-buttons">
	              <a href="/contact?subject=volunteer#contact-form" className="btn btn-primary btn-lg">
                <FontAwesomeIcon icon={faHand} /> I Want to Serve
              </a>
            </div>
            <p className="cta-note">
              You can also talk to anyone on Sunday—just ask how to get involved!
            </p>
          </div>
        </div>
      </section>

      {/* Give Section */}
      <section className="section involved-give-section">
        <div className="container container-narrow">
          <div className="involved-give-content">
            <div className="involved-give-text">
              <span className="section-eyebrow">Another Way to Give</span>
              <h2>Support the Mission</h2>
              <p>
                Not everyone can give their time—and that&apos;s okay. Your generosity
                helps us reach more people, support families in need, and keep our
                doors open for anyone seeking hope.
              </p>
              <a
                href="/give"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline involved-give-btn"
              >
                <FontAwesomeIcon icon={faHandHoldingHeart} />
                Give Online
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="section involved-contact-section">
        <div className="container">
          <div className="involved-contact-grid">
            <div className="involved-contact-card">
              <div className="involved-contact-icon">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <h3>Call Us</h3>
              <p><a href="tel:+12396873430">(239) 687-3430</a></p>
            </div>

            <div className="involved-contact-card">
              <div className="involved-contact-icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <h3>Email Us</h3>
              <p><a href="mailto:info@thrive-fl.org">info@thrive-fl.org</a></p>
            </div>

            <div className="involved-contact-card">
              <div className="involved-contact-icon">
                <FontAwesomeIcon icon={faChurch} />
              </div>
              <h3>Visit Sunday</h3>
              <p>10 AM at our Estero location</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

