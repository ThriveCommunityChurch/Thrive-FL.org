"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faClock, faCalendar, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useAudioPlayer } from "../../../contexts/AudioPlayerContext";
import { SermonMessage } from "../../../types/sermons";
import { TheocologyEpisode, formatDuration, formatDate } from "../../../services/theocologyService";

interface EpisodeDetailClientProps {
  episode: TheocologyEpisode;
}

export default function EpisodeDetailClient({ episode }: EpisodeDetailClientProps) {
  const { playMessage, currentMessage, isPlaying } = useAudioPlayer();

  const isCurrentEpisode = currentMessage?.Title === episode.title;
  const isEpisodePlaying = isCurrentEpisode && isPlaying;

  const handlePlay = () => {
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

    // Always use Theocology logo
    playMessage(sermonMessage, "Theocology", "https://static.thrive-fl.org/Theocology.png");
  };

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

