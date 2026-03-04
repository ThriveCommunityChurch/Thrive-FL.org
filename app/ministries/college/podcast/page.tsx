"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faClock, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useAudioPlayer } from "../../../contexts/AudioPlayerContext";
import { SermonMessage } from "../../../types/sermons";

interface PodcastPlatform {
  name: string;
  url: string;
  iconName?: string;
  type: "simple-icon";
  color: string;
}

interface Episode {
  title: string;
  slug: string;
  description: string;
  pubDate: string;
  duration: string;
  audioUrl: string;
  imageUrl: string;
}

const THEOCOLOGY_LOGO = "https://static.thrive-fl.org/Theocology.png";

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
    url: "https://podcasts.apple.com/us/podcast/theocology/id1572688057",
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

// Helper to format duration from seconds to "XX min"
function formatDuration(seconds: number): string {
  const minutes = Math.round(seconds / 60);
  return `${minutes} min`;
}

// Helper to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function TheocologyPodcastPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const { playMessage, currentMessage, isPlaying } = useAudioPlayer();

  // Convert Episode to SermonMessage format for the shared player
  const playEpisode = (episode: Episode) => {
    const sermonMessage: SermonMessage = {
      MessageId: episode.title, // Use title as unique ID
      SeriesId: "theocology",
      Title: episode.title,
      Speaker: "Theocology",
      Date: episode.pubDate,
      PassageRef: null,
      AudioUrl: episode.audioUrl,
      AudioDuration: null,
      AudioFileSize: null,
      VideoUrl: null,
      Summary: episode.description,
      PlayCount: 0,
      Tags: ["theocology", "podcast"],
      WaveformData: null,
    };

    // Use episode image if available, otherwise fall back to Theocology logo
    playMessage(sermonMessage, "Theocology", episode.imageUrl);
  };

  useEffect(() => {
    async function fetchEpisodes() {
      try {
        const response = await fetch("https://feeds.buzzsprout.com/1803195.rss");
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");
        const items = xml.querySelectorAll("item");

        const latestEpisodes: Episode[] = [];
        for (let i = 0; i < Math.min(5, items.length); i++) {
          const item = items[i];
          const title = item.querySelector("title")?.textContent || "";
          const description = item.querySelector("description")?.textContent || "";
          const pubDate = item.querySelector("pubDate")?.textContent || "";
          const durationEl = item.getElementsByTagName("itunes:duration")[0];
          const duration = durationEl?.textContent || "0";
          const enclosure = item.querySelector("enclosure");
          const audioUrl = enclosure?.getAttribute("url") || "";

          // Get episode image (itunes:image) or fall back to channel image
          const imageEl = item.getElementsByTagName("itunes:image")[0];
          const imageUrl = imageEl?.getAttribute("href") || THEOCOLOGY_LOGO;

          // Create slug from title
          const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

          // Clean HTML tags and decode entities
          let cleanDesc = description
            .replace(/<[^>]*>/g, "")
            .replace(/&apos;/g, "'")
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, "&")
            .replace(/&nbsp;/g, " ");

          // Truncate at word boundary around 360 chars
          if (cleanDesc.length > 360) {
            cleanDesc = cleanDesc.substring(0, 360);
            const lastSpace = cleanDesc.lastIndexOf(" ");
            if (lastSpace > 200) {
              cleanDesc = cleanDesc.substring(0, lastSpace);
            }
            cleanDesc += "...";
          }

          latestEpisodes.push({
            title,
            slug,
            description: cleanDesc,
            pubDate,
            duration: formatDuration(parseInt(duration)),
            audioUrl,
            imageUrl,
          });
        }

        setEpisodes(latestEpisodes);
      } catch (error) {
        console.error("Failed to fetch episodes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEpisodes();
  }, []);

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
              Theocology is the podcast from ThriveFGCU that explores the
              questions that matter most during your college years and beyond.
            </p>
            <p>
              Whether you&apos;re wrestling with questions, seeking connection,
              or simply want to think more deeply about what you believe—this
              podcast is for you. Episodes are around 40 minutes, perfect for
              a commute or study break.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Episodes Section */}
      <section className="section theocology-latest-section">
        <div className="container">
          <div className="section-header-centered">
            <span className="section-eyebrow">Latest Episodes</span>
            <h2 className="section-title">Listen Now</h2>
            <p className="section-subtitle">
              Catch up on our most recent conversations
            </p>
          </div>

          {loading ? (
            <div className="theocology-loading">Loading episodes...</div>
          ) : (
            <div className="theocology-latest-grid">
              {episodes.map((episode, index) => {
                const isCurrentEpisode = currentMessage?.Title === episode.title;
                const isEpisodePlaying = isCurrentEpisode && isPlaying;

                return (
                  <div
                    key={index}
                    className={`theocology-latest-card ${isCurrentEpisode ? "theocology-latest-card-active" : ""}`}
                  >
                    <button
                      className={`theocology-latest-play ${isEpisodePlaying ? "theocology-latest-play-active" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        playEpisode(episode);
                      }}
                      aria-label={isEpisodePlaying ? "Pause episode" : "Play episode"}
                    >
                      <FontAwesomeIcon icon={isEpisodePlaying ? faPause : faPlay} />
                    </button>
                    <Link href={`/theocology/episodes/${episode.slug}`} className="theocology-latest-content">
                      <h3>{episode.title}</h3>
                      <p>{episode.description}</p>
                      <div className="theocology-latest-meta">
                        <span>
                          <FontAwesomeIcon icon={faClock} /> {episode.duration}
                        </span>
                        <span>
                          <FontAwesomeIcon icon={faCalendar} /> {formatDate(episode.pubDate)}
                        </span>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="section podcast-subscribe-section">
        <div className="container">
          <div className="podcast-subscribe-intro">
            <h2 className="section-title">Listen On The Go</h2>
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
              <span className="section-eyebrow">Your Hosts</span>
              <h2 className="section-title-left">The Theocology Team</h2>
              <p>
                <strong>Kellen Hicks</strong> is the current host of Theocology and
                a pastoral intern at Thrive Community Church. With a heart for college
                students and a passion for honest conversations about faith, Kellen
                brings fresh perspectives to each episode.
              </p>
              <p>
                <strong>Pastor John Roth</strong>, who founded Theocology, serves as
                both pastor of Thrive Community Church and professor at Florida Gulf
                Coast University. John continues to join conversations and guide the
                podcast&apos;s vision for helping students connect faith to everyday life.
              </p>
              <p>
                Each week during the academic year, the team gathers with FGCU students
                to explore topics that matter—from navigating peer pressure to discovering
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

