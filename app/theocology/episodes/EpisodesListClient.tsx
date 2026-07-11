import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendar, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  formatDate,
  formatDuration,
  type TheocologyEpisode,
} from "../../services/theocologyService";

interface EpisodesListClientProps {
  episodes: TheocologyEpisode[];
}

export default function EpisodesListClient({ episodes }: EpisodesListClientProps) {
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
      {episodes.length === 0 ? (
        <section className="section theocology-episodes-list-section">
          <div className="container">
            <div className="sermon-error-state">
              <h3>Unable to Load Episodes</h3>
              <p>Episodes are temporarily unavailable. Please try again later.</p>
              <Link href="/ministries/college/podcast" className="btn btn-primary">
                Back to Theocology
              </Link>
            </div>
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
