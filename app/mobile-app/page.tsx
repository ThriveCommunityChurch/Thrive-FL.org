import { Metadata } from "next";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadphones,
  faNoteSticky,
  faRobot,
  faCalendarDays,
  faUsers,
  faBookBible,
  faMoon,
  faDownload,
  faWifi,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export const metadata: Metadata = {
  title: "Get the app | Thrive Community Church",
  description: "Download the Thrive Church Official App for iOS and Android. Stream sermons, take notes, get AI-powered study guides, and stay connected with your church community.",
  openGraph: {
    title: "Get the app | Thrive Community Church",
    description: "Stream sermons, take notes, and stay connected. Download the Thrive Church Official App.",
    url: "https://thrive-fl.org/mobile-app",
    images: [
      {
        url: "https://d2v6hk6f64og35.cloudfront.net/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Thrive Community Church App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Get the app | Thrive Community Church",
    description: "Stream sermons, take notes, and stay connected. Download the Thrive Church Official App.",
    images: ["https://d2v6hk6f64og35.cloudfront.net/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thrive-fl.org/mobile-app",
  },
};

interface AppFeature {
  icon: IconDefinition;
  title: string;
  description: string;
  highlights: string[];
}

const APP_FEATURES: AppFeature[] = [
  {
    icon: faHeadphones,
    title: "Listen",
    description: "Catch up on sermons anytime, even when your screen is off.",
    highlights: ["Download for offline listening", "Search by topic or series", "Adjust playback speed", "Pick up where you left off"],
  },
  {
    icon: faNoteSticky,
    title: "Notes",
    description: "Jot down thoughts during the message and keep them all in one place.",
    highlights: ["Notes linked to sermons", "Saves automatically", "Share with friends", "Easy formatting options"],
  },
  {
    icon: faRobot,
    title: "AI-Powered Content",
    description: "Get helpful AI-generated summaries and discussion questions for every sermon.",
    highlights: ["Quick sermon recaps", "Great for small groups", "Key Scripture references", "Weekly challenges"],
  },
  {
    icon: faCalendarDays,
    title: "Events",
    description: "See what's happening and add events straight to your calendar.",
    highlights: ["All the details you need", "One-tap calendar add", "Get directions", "Never miss a thing"],
  },
  {
    icon: faUsers,
    title: "Connect",
    description: "Find ways to get involved and stay in the loop.",
    highlights: ["Share prayer requests", "Join a small group", "Sign up to serve", "Stay up to date"],
  },
  {
    icon: faBookBible,
    title: "Bible",
    description: "Read and listen to Scripture right in the app.",
    highlights: ["ESV Bible included", "Listen to passages", "Links to YouVersion", "Jump to any verse"],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MobileApplication",
      "name": "Thrive Church Official App",
      "operatingSystem": "iOS",
      "applicationCategory": "LifestyleApplication",
      "description": "Stay connected with sermons, notes, events, and your church community—all in one place.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "installUrl": "https://apps.apple.com/us/app/thrive-church-official-app/id1138008288",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": 5,
        "ratingCount": 2
      }
    },
    {
      "@type": "MobileApplication",
      "name": "Thrive Church Official App",
      "operatingSystem": "Android",
      "applicationCategory": "LifestyleApplication",
      "description": "Stay connected with sermons, notes, events, and your church community—all in one place.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "installUrl": "https://play.google.com/store/apps/details?id=com.thrivefl.ThriveCommunityChurch"
    }
  ]
};

export default function AppPage() {
  return (
    <div className="page-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Page Hero Section */}
      <section className="page-hero page-hero-app">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Thrive Church Official App</h1>
          <p className="page-hero-subtitle">
            Stay connected with sermons, notes, events, and your church community—all in one place.
          </p>
        </div>
      </section>

      {/* Download Section */}
      <section className="section app-download-section">
        <div className="container">
          <div className="app-download-content">
            <div className="app-download-info">
              <span className="section-eyebrow">Download Now</span>
              <h2>Take us with you anywhere</h2>
              <p>
                Whether you&apos;re catching up on a sermon during your commute, taking notes
                during service, or checking upcoming events, the Thrive app keeps you
                connected wherever you go.
              </p>
              <div className="app-download-buttons">
                <a
                  href="https://apps.apple.com/us/app/thrive-church-official-app/id1138008288"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="app-store-btn app-store-btn-ios"
                >
                  <FontAwesomeIcon icon={faApple} />
                  <span>
                    <small>Download on the</small>
                    App Store
                  </span>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.thrivefl.ThriveCommunityChurch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="app-store-btn app-store-btn-android"
                >
                  <FontAwesomeIcon icon={faGooglePlay} />
                  <span>
                    <small>Get it on</small>
                    Google Play
                  </span>
                </a>
              </div>
            </div>
            <div className="app-download-preview">
              <Image
                src="https://d2v6hk6f64og35.cloudfront.net/app_promo1.png"
                alt="Thrive Church App on mobile device"
                width={450}
                height={450}
                className="app-preview-image"
                style={{ objectFit: "cover", marginLeft: "-0.5rem" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section app-features-section">
        <div className="container">
          <div className="section-header-centered">
            <span className="section-eyebrow">Features</span>
            <h2 className="section-title">Everything you need</h2>
            <p className="section-subtitle">
              Designed to help you grow in faith and stay connected with your church family.
            </p>
          </div>

          <div className="app-features-grid">
            {APP_FEATURES.map((feature, index) => (
              <div key={index} className="app-feature-card">
                <div className="app-feature-icon">
                  <FontAwesomeIcon icon={feature.icon} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <ul className="app-feature-highlights">
                  {feature.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="section app-highlights-section">
        <div className="container">
          <div className="app-highlights-grid">
            <div className="app-highlight-item">
              <FontAwesomeIcon icon={faDownload} />
              <h4>Offline Access</h4>
              <p>Download sermons for listening without internet</p>
            </div>
            <div className="app-highlight-item">
              <FontAwesomeIcon icon={faMoon} />
              <h4>Dark Mode</h4>
              <p>Easy on the eyes with automatic theme switching</p>
            </div>
            <div className="app-highlight-item">
              <FontAwesomeIcon icon={faWifi} />
              <h4>Background Play</h4>
              <p>Keep listening while using other apps</p>
            </div>
            <div className="app-highlight-item">
              <FontAwesomeIcon icon={faBell} />
              <h4>Notifications</h4>
              <p>Stay updated on new sermons and events</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section app-cta-section">
        <div className="container container-narrow">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>
              Download the Thrive Church Official App today and take your faith journey
              with you wherever you go.
            </p>
            <div className="cta-buttons">
              <a
                href="https://apps.apple.com/us/app/thrive-church-official-app/id1138008288"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-white"
              >
                <FontAwesomeIcon icon={faApple} /> App Store
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.thrivefl.ThriveCommunityChurch"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-white"
              >
                <FontAwesomeIcon icon={faGooglePlay} /> Google Play
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
