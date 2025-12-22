import {
  SiApplepodcasts,
  SiSpotify,
  SiIheartradio,
  SiPandora,
  SiPlayerfm,
} from "@icons-pack/react-simple-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeezer } from "@fortawesome/free-brands-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface PodcastPlatform {
  name: string;
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon?: any;
  icon?: IconDefinition;
  type: "simple-icon" | "fontawesome";
  color: string;
}

// Podcast platform data
const PODCAST_PLATFORMS: PodcastPlatform[] = [
  {
    name: "Apple Podcasts",
    url: "https://podcasts.apple.com/us/podcast/thrive-community-church/id1483883780",
    Icon: SiApplepodcasts,
    type: "simple-icon",
    color: "#A855F7",
  },
  {
    name: "Spotify",
    url: "https://open.spotify.com/show/1V7A8wNhRFqn67yxCXKX9e",
    Icon: SiSpotify,
    type: "simple-icon",
    color: "#1DB954",
  },
  {
    name: "iHeartRadio",
    url: "https://iheart.com/podcast/314021185/",
    Icon: SiIheartradio,
    type: "simple-icon",
    color: "#C6002B",
  },
  {
    name: "Pandora",
    url: "https://www.pandora.com/podcast/thrive-community-church/PC:1001112226",
    Icon: SiPandora,
    type: "simple-icon",
    color: "#3668FF",
  },
  {
    name: "Deezer",
    url: "https://deezer.com/show/1002469392",
    icon: faDeezer,
    type: "fontawesome",
    color: "#FF0092",
  },
  {
    name: "Player FM",
    url: "https://player.fm/series/thrive-community-church-3707697",
    Icon: SiPlayerfm,
    type: "simple-icon",
    color: "#E91E63",
  },
];

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
                  {platform.type === "simple-icon" && platform.Icon ? (
                    <platform.Icon size={48} />
                  ) : platform.icon ? (
                    <FontAwesomeIcon icon={platform.icon} />
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
