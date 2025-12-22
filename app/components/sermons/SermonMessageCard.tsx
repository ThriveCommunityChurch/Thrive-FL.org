"use client";

import { SermonMessageCardProps } from '../../types/sermons';
import { formatDuration, formatSermonDate } from '../../services/sermonService';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faUser,
  faBookBible,
  faDownload,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

export default function SermonMessageCard({ 
  message, 
  onPlay, 
  isPlaying = false,
  index = 0 
}: SermonMessageCardProps) {
  const duration = formatDuration(message.AudioDuration);
  const date = formatSermonDate(message.Date);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onPlay && message.AudioUrl) {
      onPlay(message);
    }
  };

  return (
    <div 
      className={`sermon-message-card ${isPlaying ? 'sermon-message-card--playing' : ''}`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <button
        className="sermon-message-card__play-button"
        onClick={handlePlayClick}
        disabled={!message.AudioUrl}
        aria-label={isPlaying ? `Pause ${message.Title}` : `Play ${message.Title}`}
      >
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
      </button>

      <div className="sermon-message-card__info">
        <h4 className="sermon-message-card__title">{message.Title}</h4>
        <div className="sermon-message-card__details">
          <span className="sermon-message-card__speaker">
            <FontAwesomeIcon icon={faUser} />
            {message.Speaker}
          </span>
          {date && (
            <span className="sermon-message-card__date">
              <FontAwesomeIcon icon={faCalendar} />
              {date}
            </span>
          )}
          {message.PassageRef && (
            <a
              href={`https://www.biblegateway.com/passage/?search=${encodeURIComponent(message.PassageRef)}&version=ESV`}
              target="_blank"
              rel="noopener noreferrer"
              className="sermon-message-card__passage sermon-message-card__passage--link"
              title={`Read ${message.PassageRef} on BibleGateway`}
            >
              <FontAwesomeIcon icon={faBookBible} />
              {message.PassageRef}
              <FontAwesomeIcon icon={faExternalLinkAlt} className="sermon-message-card__passage-link-icon" />
            </a>
          )}
        </div>
      </div>

      <div className="sermon-message-card__actions">
        <span className="sermon-message-card__duration">
          <FontAwesomeIcon icon={faClock} />
          {duration}
        </span>

        <div className="sermon-message-card__buttons">
          {message.VideoUrl && (
            <a
              href={message.VideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sermon-message-card__action-btn"
              title="Watch on YouTube"
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          )}
          {message.AudioUrl && (
            <a
              href={message.AudioUrl}
              download
              className="sermon-message-card__action-btn"
              title="Download Audio"
            >
              <FontAwesomeIcon icon={faDownload} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

