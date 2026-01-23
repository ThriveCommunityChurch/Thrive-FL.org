import { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPlay,
  faMugHot,
  faArrowRight,
  faShirt,
  faChildReaching,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "First Time? | Thrive Community Church",
  description: "New to Thrive? Here's what to expect. Relaxed atmosphere, great coffee, practical teaching, and Thrive Kids for your little ones. No pressure—just people.",
  openGraph: {
    title: "First Time? | Thrive Community Church",
    description: "New to Thrive? Here's what to expect. Relaxed atmosphere, great coffee, and practical teaching.",
    url: "https://thrive-fl.org/im-new",
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
    title: "First Time? | Thrive Community Church",
    description: "New to Thrive? Here's what to expect. Relaxed atmosphere, great coffee, and practical teaching.",
    images: ["https://d2v6hk6f64og35.cloudfront.net/og-image.jpg"],
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
            <h2 className="section-title">No Pressure. Just People.</h2>
            <p className="intro-lead">
              Church shouldn&apos;t feel like a performance you&apos;re not dressed for.
              At Thrive, we&apos;re just regular people figuring out life, faith, and
              everything in between—together.
            </p>
            <p>
              Whether you&apos;re exploring faith for the first time, coming back after
              years away, or just looking for a community that actually feels like
              community—you&apos;re welcome here. No strings attached.
            </p>
            <div className="intro-cta">
              <a href="/visit" className="btn btn-primary">
                <FontAwesomeIcon icon={faLocationDot} />
                See You Sunday
              </a>
              <a href="/sermons" className="btn btn-outline">
                <FontAwesomeIcon icon={faPlay} />
                Watch a Message
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="container">
          <h2 className="section-title">
            FAQ
          </h2>
          <div className="faq-grid">
            <div className="faq-card">
              <div className="faq-icon">
                <FontAwesomeIcon icon={faMugHot} />
              </div>
              <h3>What&apos;s the atmosphere like?</h3>
              <p>
                Warm and welcoming. Grab a coffee when you arrive (it&apos;s on us), find a seat
                anywhere you&apos;re comfortable, and enjoy heartfelt worship. Our messages are
                practical and rooted in Scripture—teaching you can apply to your daily life.
                The service is about an hour.
              </p>
              <a href="/sermons" className="faq-link">
                Preview a recent message <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>

            <div className="faq-card">
              <div className="faq-icon">
                <FontAwesomeIcon icon={faShirt} />
              </div>
              <h3>What do people wear?</h3>
              <p>
                Come as you are. Jeans and a t-shirt are fine. Dressed up? That&apos;s great
                too. You&apos;ll find a mix of both on any given Sunday. What matters most
                is that you&apos;re here, not what you&apos;re wearing.
              </p>
            </div>

            <div className="faq-card">
              <div className="faq-icon">
                <FontAwesomeIcon icon={faChildReaching} />
              </div>
              <h3>What about my kids?</h3>
              <p>
                They&apos;re in great hands. Thrive Kids offers age-appropriate teaching,
                caring leaders, and engaging activities designed just for them. Available
                for ages 6 months through 5th grade every Sunday.
              </p>
              <a href="/ministries/kids" className="faq-link">
                More about Thrive Kids <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>

            <div className="faq-card">
              <div className="faq-icon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <h3>How do I actually connect?</h3>
              <p>
                Sunday is just the starting point. Every week we gather at the
                pastor&apos;s home for a meal, fellowship, and meaningful conversation—it&apos;s a
                great way to get to know people in a relaxed setting. We also have Home
                Huddles (small groups) that meet throughout the week to share life and
                support each other.
              </p>
              <a href="/small-groups" className="faq-link">
                Learn more <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Links */}
      <section className="section">
        <div className="container container-narrow">
          <p>
            Already following Jesus and wondering about baptism?{" "}
            <a href="/baptism">Learn about Baptism &rarr;</a>
          </p>
          <p>
            Walking through something heavy?{" "}
            <a href="/care">Get Care &amp; Prayer &rarr;</a>
          </p>
        </div>
      </section>

      {/* Location Quick Info */}
      <section className="section location-cta-section">
        <div className="container container-narrow">
          <div className="location-cta-content">
            <div className="location-cta-info">
              <h2>Ready to check us out?</h2>
              <p className="location-cta-lead">
                Sundays at 10. Coffee&apos;s on us.
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

