"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { TheocologyEpisode, formatDuration, formatDate } from "../../services/theocologyService";

interface EpisodesListClientProps {
  episodes: TheocologyEpisode[];
  error: string | null;
}

export default function EpisodesListClient({ episodes, error }: EpisodesListClientProps) {
  if (error) {
    return (
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
    );
  }

  return (
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
  );
}

