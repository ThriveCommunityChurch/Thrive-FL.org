import { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
  faClock,
  faLocationDot,
  faArrowRight,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import LivestreamPlayer from "../components/live/LivestreamPlayer";

export const metadata: Metadata = {
  title: "Watch Live | Thrive Community Church",
  description: "Watch our Sunday worship service live every week at 10:00 AM. Can't make it in person? Join us online from wherever you are.",
  openGraph: {
    title: "Watch Live | Thrive Community Church",
    description: "Watch our Sunday worship service live every week at 10:00 AM.",
    url: "https://thrive-fl.org/live",
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
    title: "Watch Live | Thrive Community Church",
    description: "Watch our Sunday worship service live every week at 10:00 AM.",
    images: ["https://d2v6hk6f64og35.cloudfront.net/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thrive-fl.org/live",
  },
};

export default function LivePage() {
  return (
    <div className="page-wrapper">
      {/* Page Hero Section */}
      <section className="page-hero page-hero-live">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Watch Live</h1>
          <p className="page-hero-subtitle">
            Join us for worship every Sunday at 10:00 AM
          </p>
        </div>
      </section>

      {/* Livestream Section */}
      <section className="section livestream-section">
        <div className="container">
          <LivestreamPlayer showStatusInfo={true} />
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="section live-info-section">
        <div className="container">
          <div className="live-info-cards">
            <div className="live-card">
              <div className="live-card-icon">
                <FontAwesomeIcon icon={faClock} />
              </div>
              <h3>Every Sunday</h3>
              <p className="live-card-detail">
                Our stream goes live a few minutes before service starts. No account needed—just click play.
              </p>
            </div>

            <div className="live-card">
              <div className="live-card-icon">
                <FontAwesomeIcon icon={faYoutube} />
              </div>
              <h3>Watch Anytime</h3>
              <p className="live-card-detail">
                Missed a service? Past sermons are available on YouTube and our sermons page.
              </p>
              <a
                href="https://www.youtube.com/channel/UC47Nme86YGrVy1lY15rF3ig"
                target="_blank"
                rel="noopener noreferrer"
                className="live-card-link"
              >
                Visit YouTube Channel <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>

            <div className="live-card">
              <div className="live-card-icon">
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              <h3>Join Us In Person</h3>
              <p className="live-card-detail">
                We&apos;d love to meet you! Nothing beats worshiping together in person.
              </p>
              <a href="/visit" className="live-card-link">
                Plan Your Visit <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section live-cta">
        <div className="container container-narrow">
          <h2>Can&apos;t Make It Live?</h2>
          <p>Browse our full sermon library and watch anytime.</p>
          <div className="cta-buttons">
            <a href="/sermons" className="btn btn-primary">
              <FontAwesomeIcon icon={faPlay} />
              Browse Sermons
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

