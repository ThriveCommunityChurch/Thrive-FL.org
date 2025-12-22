import { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCalendarDays,
  faCirclePlay,
  faChurch,
} from "@fortawesome/free-solid-svg-icons";
import { faYoutube, faFacebookF } from "@fortawesome/free-brands-svg-icons";

export const metadata: Metadata = {
  title: "Watch Live | Thrive Community Church",
  description: "Watch Thrive Community Church services live every Sunday at 10 AM. Stream on YouTube or Facebook.",
  openGraph: {
    title: "Watch Live | Thrive Community Church",
    description: "Join us live every Sunday at 10 AM on YouTube or Facebook.",
    url: "https://thrive-fl.org/watch-live",
  },
};

export default function WatchLivePage() {
  return (
    <div className="page-wrapper">
      {/* Page Hero Section */}
      <section className="page-hero page-hero-live">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Watch Live</h1>
          <p className="page-hero-subtitle">
            Join us from anywhere—stream our services live every Sunday
          </p>
        </div>
      </section>

      {/* Live Stream Info Section */}
      <section className="section intro-section">
        <div className="container container-narrow">
          <div className="intro-content">
            <h2 className="section-title">Can&apos;t Make It In Person?</h2>
            <p className="intro-lead">
              We&apos;d love for you to join us in person, but we know life happens.
              Whether you&apos;re traveling, sick, or just discovering Thrive for the
              first time, you can watch our services live from anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Stream Options Section */}
      <section className="section live-options-section">
        <div className="container">
          <div className="section-header-centered">
            <span className="section-eyebrow">Choose Your Platform</span>
            <h2 className="section-title">Where to Watch</h2>
            <p className="section-subtitle">
              We stream simultaneously on both YouTube and Facebook
            </p>
          </div>

          <div className="live-options-grid">
            <a
              href="https://www.youtube.com/channel/UC47Nme86YGrVy1lY15rF3ig"
              target="_blank"
              rel="noopener noreferrer"
              className="live-option-card live-option-youtube"
            >
              <div className="live-option-icon">
                <FontAwesomeIcon icon={faYoutube} />
              </div>
              <h3>Watch on YouTube</h3>
              <p>Subscribe to get notified when we go live</p>
              <span className="live-option-action">
                <FontAwesomeIcon icon={faCirclePlay} /> Open YouTube
              </span>
            </a>

            <a
              href="https://www.facebook.com/thriveFL"
              target="_blank"
              rel="noopener noreferrer"
              className="live-option-card live-option-facebook"
            >
              <div className="live-option-icon">
                <FontAwesomeIcon icon={faFacebookF} />
              </div>
              <h3>Watch on Facebook</h3>
              <p>Follow us to see when we&apos;re streaming</p>
              <span className="live-option-action">
                <FontAwesomeIcon icon={faCirclePlay} /> Open Facebook
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Service Time Section */}
      <section className="section live-schedule-section">
        <div className="container container-narrow">
          <div className="live-schedule-card">
            <div className="live-schedule-icon">
              <FontAwesomeIcon icon={faCalendarDays} />
            </div>
            <div className="live-schedule-info">
              <h3>Live Stream Schedule</h3>
              <div className="live-schedule-time">
                <FontAwesomeIcon icon={faClock} />
                <span>Sundays at 10:00 AM EST</span>
              </div>
              <p>
                Services typically last about an hour. Past services are available
                on our YouTube channel and <a href="/sermons">Sermons page</a>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section live-cta-section">
        <div className="container container-narrow">
          <div className="cta-content">
            <h2>Nothing Beats Being There</h2>
            <p>
              While we love that you can join us online, there&apos;s something special
              about worshiping together in person. We&apos;d love to meet you!
            </p>
            <div className="cta-buttons">
              <a href="/visit" className="btn btn-primary">
                <FontAwesomeIcon icon={faChurch} /> Plan Your Visit
              </a>
              <a href="/sermons" className="btn btn-outline-white">
                <FontAwesomeIcon icon={faCirclePlay} /> Watch Past Sermons
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

