"use client";

import Link from 'next/link';
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
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

export default function SermonMessageCard({
  message,
  seriesId,
  onPlay,
  isPlaying = false,
  index = 0
}: SermonMessageCardProps) {
  const duration = formatDuration(message.AudioDuration);
  const date = formatSermonDate(message.Date);

  // A message has content if it has audio OR video
  const hasContent = Boolean(message.AudioUrl || message.VideoUrl);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onPlay && message.AudioUrl) {
      onPlay(message);
    }
  };

  return (
    <div
      className={`sermon-message-card ${isPlaying ? 'sermon-message-card--playing' : ''} ${!hasContent ? 'sermon-message-card--no-content' : ''}`}
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
        {hasContent ? (
          <>
            <span className="sermon-message-card__duration">
              <FontAwesomeIcon icon={faClock} />
              {duration}
            </span>

            <div className="sermon-message-card__buttons">
              <Link
                href={`/sermons/${seriesId}/${message.MessageId}`}
                className="sermon-message-card__action-btn"
                title="View Details, Transcript & Notes"
              >
                <FontAwesomeIcon icon={faFileAlt} />
              </Link>
              {message.VideoUrl && (
                <Link
                  href={`/sermons/${seriesId}/${message.MessageId}/video`}
                  className="sermon-message-card__action-btn"
                  title="Watch Video"
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </Link>
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
          </>
        ) : (
          <span className="sermon-message-card__no-recording">
            No recording available
          </span>
        )}
      </div>
    </div>
  );
}

