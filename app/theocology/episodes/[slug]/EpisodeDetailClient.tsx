"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faClock, faCalendar, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useAudioPlayer } from "../../../contexts/AudioPlayerContext";
import { SermonMessage } from "../../../types/sermons";

const RSS_FEED_URL = "https://feeds.buzzsprout.com/1803195.rss";

interface Episode {
  id: string;
  title: string;
  slug: string;
  description: string;
  pubDate: string;
  duration: number;
  audioUrl: string;
  imageUrl: string;
  season?: number;
  episode?: number;
}

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function formatDuration(seconds: number): string {
  const minutes = Math.round(seconds / 60);
  return `${minutes} min`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

interface EpisodeDetailClientProps {
  slug: string;
}

export default function EpisodeDetailClient({ slug }: EpisodeDetailClientProps) {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { playMessage, currentMessage, isPlaying } = useAudioPlayer();

  useEffect(() => {
    async function fetchEpisode() {
      try {
        const response = await fetch(RSS_FEED_URL);
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");
        const items = xml.querySelectorAll("item");

        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const title = item.querySelector("title")?.textContent || "";
          if (createSlug(title) !== slug) continue;

          const guid = item.querySelector("guid")?.textContent || "";
          const description =
            item.querySelector("content\\:encoded")?.textContent ||
            item.querySelector("encoded")?.textContent ||
            item.querySelector("description")?.textContent ||
            "";
          const pubDate = item.querySelector("pubDate")?.textContent || "";
          const durationEl = item.getElementsByTagName("itunes:duration")[0];
          const duration = parseInt(durationEl?.textContent || "0");
          const enclosure = item.querySelector("enclosure");
          const audioUrl = enclosure?.getAttribute("url") || "";
          const imageEl = item.getElementsByTagName("itunes:image")[0];
          const imageUrl =
            imageEl?.getAttribute("href") ||
            "https://static.thrive-fl.org/Theocology.png";
          const seasonEl = item.getElementsByTagName("itunes:season")[0];
          const season = parseInt(seasonEl?.textContent || "0") || undefined;
          const episodeEl = item.getElementsByTagName("itunes:episode")[0];
          const episodeNum = parseInt(episodeEl?.textContent || "0") || undefined;

          setEpisode({
            id: guid,
            title,
            slug: createSlug(title),
            description,
            pubDate,
            duration,
            audioUrl,
            imageUrl,
            season,
            episode: episodeNum,
          });
          setLoading(false);
          return;
        }

        setNotFound(true);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchEpisode();
  }, [slug]);

  const isCurrentEpisode = currentMessage?.Title === episode?.title;
  const isEpisodePlaying = isCurrentEpisode && isPlaying;

  const handlePlay = () => {
    if (!episode) return;
    const sermonMessage: SermonMessage = {
      MessageId: episode.id,
      SeriesId: "theocology",
      Title: episode.title,
      Speaker: "Theocology",
      Date: episode.pubDate,
      PassageRef: null,
      AudioUrl: episode.audioUrl,
      AudioDuration: episode.duration,
      AudioFileSize: null,
      VideoUrl: null,
      Summary: episode.description.replace(/<[^>]*>/g, ""),
      PlayCount: 0,
      Tags: ["theocology", "podcast"],
      WaveformData: null,
    };

    playMessage(sermonMessage, "Theocology", "https://static.thrive-fl.org/Theocology.png");
  };

  if (loading) {
    return (
      <div className="page-wrapper">
        <section className="section">
          <div className="container">
            <div className="theocology-loading">Loading episode...</div>
          </div>
        </section>
      </div>
    );
  }

  if (notFound || !episode) {
    return (
      <div className="page-wrapper">
        <section className="section">
          <div className="container">
            <div className="sermon-error-state">
              <h3>Episode Not Found</h3>
              <p>The episode you&apos;re looking for could not be found.</p>
              <Link href="/theocology/episodes" className="btn btn-primary">
                Browse All Episodes
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }
  return (
    <div className="page-wrapper">
      {/* Back Link */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <Link href="/ministries/college/podcast" className="episode-back-link">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Theocology
          </Link>
        </div>
      </section>

      {/* Episode Hero */}
      <section className="section episode-hero">
        <div className="container">
          <div className="episode-hero-content">
            <Image
              src="https://static.thrive-fl.org/Theocology.png"
              alt="Theocology Podcast"
              width={300}
              height={300}
              style={{ objectFit: "cover" }}
              priority
            />
            <div className="episode-info">
              <h1 className="episode-title">{episode.title}</h1>
              <div className="episode-meta">
                <span>
                  <FontAwesomeIcon icon={faCalendar} /> {formatDate(episode.pubDate)}
                </span>
                <span>
                  <FontAwesomeIcon icon={faClock} /> {formatDuration(episode.duration)}
                </span>
                {episode.season && episode.episode && (
                  <span>Season {episode.season}, Episode {episode.episode}</span>
                )}
              </div>
              <button
                onClick={handlePlay}
                className={`btn btn-primary ${isEpisodePlaying ? "playing" : ""}`}
              >
                <FontAwesomeIcon icon={isEpisodePlaying ? faPause : faPlay} />
                {isEpisodePlaying ? "Pause Episode" : "Play Episode"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Episode Description */}
      <section className="section episode-description-section">
        <div className="container container-narrow">
          <h2>About This Episode</h2>
          <div
            className="episode-description"
            dangerouslySetInnerHTML={{ __html: episode.description }}
          />
        </div>
      </section>

      {/* Links Section */}
      <section className="section episode-links-section">
        <div className="container container-narrow">
          <div className="episode-links-grid">
            <Link href="/ministries/college" className="episode-link-card">
              <h3>ThriveFGCU</h3>
              <p>Learn more about our college ministry and young adult community</p>
            </Link>
            <Link href="/ministries/college/podcast" className="episode-link-card">
              <h3>More Episodes</h3>
              <p>Browse all Theocology episodes and subscribe on your favorite platform</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

