"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendar, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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

export default function EpisodesListClient() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEpisodes() {
      try {
        const response = await fetch(RSS_FEED_URL);
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");
        const items = xml.querySelectorAll("item");

        const parsed: Episode[] = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const title = item.querySelector("title")?.textContent || "";
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

          parsed.push({
            id: guid,
            title,
            slug: createSlug(title),
            description,
            pubDate,
            duration,
            audioUrl,
            imageUrl,
          });
        }

        setEpisodes(parsed);
      } catch {
        setError("Failed to load episodes. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchEpisodes();
  }, []);

  return (
    <div className="page-wrapper">
      {/* Page Hero */}
      <section className="page-hero page-hero-theocology">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Theocology Episodes</h1>
          <p className="page-hero-subtitle">
            All episodes from the ThriveFGCU podcast
          </p>
        </div>
      </section>

      {/* Back Link */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <Link href="/ministries/college/podcast" className="episode-back-link">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Theocology
          </Link>
        </div>
      </section>

      {/* Episodes List */}
      {error ? (
        <section className="section theocology-episodes-list-section">
          <div className="container">
            <div className="sermon-error-state">
              <h3>Unable to Load Episodes</h3>
              <p>{error}</p>
              <Link href="/ministries/college/podcast" className="btn btn-primary">
                Back to Theocology
              </Link>
            </div>
          </div>
        </section>
      ) : loading ? (
        <section className="section theocology-episodes-list-section">
          <div className="container">
            <div className="theocology-loading">Loading episodes...</div>
          </div>
        </section>
      ) : (
        <section className="section theocology-episodes-list-section">
          <div className="container">
            <div className="theocology-episodes-count">
              {episodes.length} {episodes.length === 1 ? "Episode" : "Episodes"}
            </div>
            <div className="theocology-episodes-list">
              {episodes.map((episode, index) => (
                <Link
                  key={episode.id}
                  href={`/theocology/episodes/${episode.slug}`}
                  className="theocology-episode-list-item"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="theocology-episode-list-artwork">
                    <Image
                      src="https://static.thrive-fl.org/Theocology.png"
                      alt="Theocology Podcast"
                      width={120}
                      height={120}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="theocology-episode-list-content">
                    <h3>{episode.title}</h3>
                    <p>
                      {episode.description
                        .replace(/<[^>]*>/g, "")
                        .replace(/&apos;/g, "'")
                        .replace(/&quot;/g, '"')
                        .replace(/&amp;/g, "&")
                        .replace(/&nbsp;/g, " ")}
                    </p>
                    <div className="theocology-episode-list-meta">
                      <span>
                        <FontAwesomeIcon icon={faCalendar} /> {formatDate(episode.pubDate)}
                      </span>
                      <span>
                        <FontAwesomeIcon icon={faClock} /> {formatDuration(episode.duration)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section theocology-cta-section">
        <div className="container container-narrow">
          <div className="cta-content">
            <h2>Subscribe to Theocology</h2>
            <p>
              Never miss an episode. Subscribe on your favorite podcast platform.
            </p>
            <Link href="/ministries/college/podcast" className="btn btn-primary">
              Subscribe Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

