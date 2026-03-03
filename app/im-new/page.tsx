import { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPlay,
  faMusic,
  faBookOpen,
  faHandshake,
  faCircleQuestion,
  faDroplet,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "First Time? | Thrive Community Church",
  description: "New to Thrive? Here's what to expect. Relaxed atmosphere, great coffee, practical teaching, and Thrive Kids for your little ones. No pressure—just people.",
  openGraph: {
    title: "First Time? | Thrive Community Church",
    description: "New to Thrive? Here's what to expect—relaxed atmosphere, great coffee, practical teaching, and Thrive Kids for your little ones.",
    url: "https://thrive-fl.org/im-new",
    images: [
      {
        url: "https://static.thrive-fl.org/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Thrive Community Church",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "First Time? | Thrive Community Church",
    description: "New to Thrive? Here's what to expect—relaxed atmosphere, great coffee, practical teaching, and Thrive Kids for your little ones.",
    images: ["https://static.thrive-fl.org/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thrive-fl.org/im-new",
  },
};

export default function ImNewPage() {
  return (
    <div className="page-wrapper">
      {/* Page Hero Section */}
      <section className="page-hero">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">First Time?</h1>
          <p className="page-hero-subtitle">
            We get it—new places can feel awkward. Here&apos;s what to expect.
          </p>
        </div>
      </section>

      {/* Welcome Intro Section */}
      <section className="section intro-section">
        <div className="container container-narrow">
          <div className="intro-content">
            <h2 className="section-title">You&apos;re Welcome Here</h2>
            <p className="intro-lead">
              We believe church should be a place where you can be yourself.
              At Thrive, you&apos;ll find people walking through real life together—growing in
              faith, side by side.
            </p>
            <p>
              Whether you&apos;re exploring faith for the first time, returning after
              time away, or simply looking for a community where you truly belong—we&apos;d
              be honored to have you join us.
            </p>
            <div className="intro-cta">
              <Link href="/visit" className="btn btn-primary">
                <FontAwesomeIcon icon={faLocationDot} />
                Plan Your Visit
              </Link>
              <Link href="/sermons" className="btn btn-outline">
                <FontAwesomeIcon icon={faPlay} />
                Watch a Message
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="section im-new-expect-section">
        <div className="container">
          <div className="section-header-centered">
            <span className="section-eyebrow">Sunday Mornings</span>
            <h2 className="section-title">What to Expect</h2>
            <p className="section-subtitle">
              Here&apos;s what a typical Sunday looks like at Thrive
            </p>
          </div>

          <div className="im-new-expect-grid">
            <div className="im-new-expect-card">
              <div className="im-new-expect-icon">
                <FontAwesomeIcon icon={faMusic} />
              </div>
              <h3>Contemporary Worship</h3>
              <p>
                Our worship is heartfelt and accessible—music that invites you to
                connect with God, whether you prefer to sing along or simply listen
                and reflect.
              </p>
            </div>

            <div className="im-new-expect-card">
              <div className="im-new-expect-icon">
                <FontAwesomeIcon icon={faBookOpen} />
              </div>
              <h3>Thoughtful Sermons</h3>
              <p>
                Our messages are contemplative and grounded in Scripture. Pastor John
                offers teaching that speaks to everyday life—something to carry with
                you throughout the week.
              </p>
            </div>

            <div className="im-new-expect-card">
              <div className="im-new-expect-icon">
                <FontAwesomeIcon icon={faHandshake} />
              </div>
              <h3>A Welcoming Community</h3>
              <p>
                You&apos;ll be greeted warmly by people who are genuinely glad you&apos;re
                here. Please stay after the service for coffee and conversation—we&apos;d
                love to get to know you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="section im-new-links-section">
        <div className="container">
          <div className="im-new-links-grid">
            <Link href="/faq" className="im-new-link-card">
              <div className="im-new-link-icon">
                <FontAwesomeIcon icon={faCircleQuestion} />
              </div>
              <div className="im-new-link-content">
                <h3>Have Questions?</h3>
                <p>Check out our FAQ for answers to common questions about visiting, kids, and more.</p>
              </div>
              <span className="im-new-link-arrow">&rarr;</span>
            </Link>

            <Link href="/baptism" className="im-new-link-card">
              <div className="im-new-link-icon">
                <FontAwesomeIcon icon={faDroplet} />
              </div>
              <div className="im-new-link-content">
                <h3>Baptism</h3>
                <p>Already following Jesus? Learn about taking your next step through baptism.</p>
              </div>
              <span className="im-new-link-arrow">&rarr;</span>
            </Link>

            <Link href="/care" className="im-new-link-card">
              <div className="im-new-link-icon">
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <div className="im-new-link-content">
                <h3>Care &amp; Prayer</h3>
                <p>Walking through a difficult season? We&apos;re here to support you.</p>
              </div>
              <span className="im-new-link-arrow">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Location Quick Info */}
      <section className="section location-cta-section">
        <div className="container container-narrow">
          <div className="location-cta-content">
            <div className="location-cta-info">
              <h2>We&apos;d Love to See You</h2>
              <p className="location-cta-lead">
                Join us Sunday at 10 AM. Coffee is always ready.
              </p>
              <a href="/visit" className="btn btn-primary">
                <FontAwesomeIcon icon={faLocationDot} />
                Get Directions &amp; Details
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

