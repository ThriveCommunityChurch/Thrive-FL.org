"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeezer } from "@fortawesome/free-brands-svg-icons";

interface PodcastPlatform {
  name: string;
  url: string;
  iconName?: string;
  imageUrl?: string;
  type: "simple-icon" | "fontawesome" | "image";
  color: string;
}

// Podcast platform data
const PODCAST_PLATFORMS: PodcastPlatform[] = [
  {
    name: "Apple Podcasts",
    url: "https://podcasts.apple.com/us/podcast/thrive-community-church/id1483883780",
    iconName: "SiApplepodcasts",
    type: "simple-icon",
    color: "#A855F7",
  },
  {
    name: "Spotify",
    url: "https://open.spotify.com/show/1V7A8wNhRFqn67yxCXKX9e",
    iconName: "SiSpotify",
    type: "simple-icon",
    color: "#1DB954",
  },
  {
    name: "Amazon Music",
    url: "https://music.amazon.com/podcasts/e56e423a-7f79-4596-a8da-7b2ae829fe98/thrive-community-church",
    imageUrl: "https://m.media-amazon.com/images/G/01/music/logo/1.0/amazon_music_410x82px.svg",
    type: "image",
    color: "#FF9900",
  },
  {
    name: "iHeartRadio",
    url: "https://iheart.com/podcast/314021185/",
    iconName: "SiIheartradio",
    type: "simple-icon",
    color: "#C6002B",
  },
  {
    name: "Pandora",
    url: "https://www.pandora.com/podcast/thrive-community-church/PC:1001112226",
    iconName: "SiPandora",
    type: "simple-icon",
    color: "#3668FF",
  },
  {
    name: "Deezer",
    url: "https://deezer.com/show/1002469392",
    type: "fontawesome",
    color: "#FF0092",
  },
  {
    name: "Player FM",
    url: "https://player.fm/series/thrive-community-church-3707697",
    iconName: "SiPlayerfm",
    type: "simple-icon",
    color: "#E91E63",
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

export default function PodcastPage() {
  return (
    <div className="page-wrapper">
      <section className="page-hero page-hero-podcast">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Thrive Podcast</h1>
          <p className="page-hero-subtitle">
            Listen to our weekly messages wherever you are
          </p>
        </div>
      </section>

      <section className="section podcast-subscribe-section">
        <div className="container">
          <div className="podcast-subscribe-intro">
            <h2 className="section-title">Listen On The Go</h2>
            <p className="section-subtitle">
              Take our messages with you wherever you go. Listen via our mobile app or subscribe on any of these popular podcast platforms:
            </p>
          </div>

          <div className="podcast-platforms-grid">
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
                  {platform.type === "simple-icon" && platform.iconName ? (
                    <SimpleIcon iconName={platform.iconName} size={48} />
                  ) : platform.type === "fontawesome" ? (
                    <FontAwesomeIcon icon={faDeezer} />
                  ) : platform.type === "image" && platform.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={platform.imageUrl} alt={platform.name} className="podcast-platform-img" />
                  ) : null}
                </div>
                <span className="podcast-platform-name">{platform.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
