"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

interface PodcastPlatform {
  name: string;
  url: string;
  iconName?: string;
  type: "simple-icon";
  color: string;
}

// Theocology podcast platforms
const PODCAST_PLATFORMS: PodcastPlatform[] = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/show/2YoutWBhOwEhk3N5m88a6b",
    iconName: "SiSpotify",
    type: "simple-icon",
    color: "#1DB954",
  },
  {
    name: "Apple Podcasts",
    url: "https://podcasts.apple.com/us/podcast/theocology/id1560878098",
    iconName: "SiApplepodcasts",
    type: "simple-icon",
    color: "#A855F7",
  },
];

// Component to render simple-icons only on client side
function SimpleIcon({ iconName, size }: { iconName: string; size: number }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [IconComponent, setIconComponent] = useState<any>(null);

  useEffect(() => {
    import("@icons-pack/react-simple-icons").then((mod) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setIconComponent(() => (mod as any)[iconName]);
    });
  }, [iconName]);

  if (!IconComponent) {
    return <div style={{ width: size, height: size }} />;
  }

  return <IconComponent size={size} />;
}

export default function TheocologyPodcastPage() {
  return (
    <div className="page-wrapper">
      {/* Page Hero Section */}
      <section className="page-hero page-hero-theocology">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Theocology</h1>
          <p className="page-hero-subtitle">
            Why theology matters during your college years—actually always.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="section intro-section">
        <div className="container container-narrow">
          <div className="intro-content">
            <h2 className="section-title">Faith &amp; Life Conversations</h2>
            <p className="intro-lead">
              Theocology is the podcast from ThriveFGCU that dives into the
              questions that matter most during your college years and beyond.
            </p>
            <p>
              Hosted by Pastor John Roth, who also serves as a professor at
              Florida Gulf Coast University, Theocology brings together students
              to discuss matters of faith and life each week during the academic
              year. Whether you&apos;re wrestling with doubt, seeking community,
              or just want to think deeper about what you believe—this podcast
              is for you.
            </p>
          </div>
        </div>
      </section>

      {/* Episodes Section */}
      <section className="section theocology-episodes-section">
        <div className="container">
          <div className="section-header-centered">
            <span className="section-eyebrow">Recent Conversations</span>
            <h2 className="section-title">What We&apos;re Talking About</h2>
            <p className="section-subtitle">
              Real conversations about faith and college life—no fluff, just honest discussions
            </p>
          </div>

          <div className="theocology-episodes-grid">
            <div className="theocology-episode-card">
              <h3>Owning Your Faith</h3>
              <p>
                What does it look like to move from your parents&apos; faith to your own?
                We talk about walking with God when no one&apos;s watching.
              </p>
            </div>

            <div className="theocology-episode-card">
              <h3>Parties, Peer Pressure, &amp; Purpose</h3>
              <p>
                College parties are everywhere—but what does it look like to enjoy
                social life while honoring God? We dive into setting boundaries.
              </p>
            </div>

            <div className="theocology-episode-card">
              <h3>When Plans Crumble</h3>
              <p>
                What happens when life doesn&apos;t go as planned? We discuss trusting
                God through unexpected turns and disappointments.
              </p>
            </div>

            <div className="theocology-episode-card">
              <h3>Competing Identities</h3>
              <p>
                In a world full of things to place your identity in, how do you
                find who you really are in Christ?
              </p>
            </div>

            <div className="theocology-episode-card">
              <h3>First Things First</h3>
              <p>
                Between classes, work, and social life—how do you make time for God
                without feeling overwhelmed?
              </p>
            </div>

            <div className="theocology-episode-card">
              <h3>The Importance of Community</h3>
              <p>
                Why does being in Christian community matter? We explore finding
                your people and doing life together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Listen Section */}
      <section className="section podcast-subscribe-section">
        <div className="container">
          <div className="podcast-subscribe-intro">
            <h2 className="section-title">Listen Now</h2>
            <p className="section-subtitle">
              Subscribe on your favorite podcast platform and never miss an episode
            </p>
          </div>

          <div className="podcast-platforms-grid theocology-platforms">
            {PODCAST_PLATFORMS.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="podcast-platform-card"
                style={{ "--platform-color": platform.color } as React.CSSProperties}
              >
                <div className="podcast-platform-icon">
                  <SimpleIcon iconName={platform.iconName!} size={48} />
                </div>
                <span className="podcast-platform-name">{platform.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Host Section */}
      <section className="section theocology-host-section">
        <div className="container">
          <div className="welcome-content">
            <div className="welcome-text">
              <span className="section-eyebrow">Your Host</span>
              <h2 className="section-title-left">Pastor John Roth</h2>
              <p>
                Pastor John Roth serves as the pastor of Thrive Community Church
                and as a professor at Florida Gulf Coast University. With a passion
                for helping college students connect their faith to everyday life,
                John creates a space where real questions are welcome and honest
                conversations happen.
              </p>
              <p>
                Each week during the academic year, John sits down with FGCU students
                to explore topics that matter—from navigating peer pressure to finding
                your identity in Christ.
              </p>
            </div>
            <div className="welcome-image">
              <Image
                  src="https://static.thrive-fl.org/Theocology.png"
                  alt="Theocology Podcast Cover"
                  width={400}
                  height={400}
                  sizes="(max-width: 768px) 100vw, 400px"
                  quality={75}
                  style={{ objectFit: "cover", width: "100%", height: "auto" }}
                />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section college-cta-section">
        <div className="container container-narrow">
          <div className="cta-content">
            <h2>Join the Conversation</h2>
            <p>
              Have a topic you&apos;d like us to cover? Want to get involved with
              ThriveFGCU? Connect with us on Instagram or come to one of our
              weekly gatherings!
            </p>
            <div className="cta-buttons">
              <a
                href="https://www.instagram.com/thrivefgcu/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <FontAwesomeIcon icon={faInstagram} /> @thrivefgcu
              </a>
              <a href="/ministries/college" className="btn btn-outline-white">
                Learn About ThriveFGCU
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

