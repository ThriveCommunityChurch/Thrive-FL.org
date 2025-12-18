"use client";

import { SermonMessageCardProps } from '../../types/sermons';
import { formatDuration, formatSermonDate } from '../../services/sermonService';

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
        <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
      </button>

      <div className="sermon-message-card__info">
        <h4 className="sermon-message-card__title">{message.Title}</h4>
        <div className="sermon-message-card__details">
          <span className="sermon-message-card__speaker">
            <i className="fa-solid fa-user"></i>
            {message.Speaker}
          </span>
          {date && (
            <span className="sermon-message-card__date">
              <i className="fa-regular fa-calendar"></i>
              {date}
            </span>
          )}
          {message.PassageRef && (
            <span className="sermon-message-card__passage">
              <i className="fa-solid fa-book-bible"></i>
              {message.PassageRef}
            </span>
          )}
        </div>
      </div>

      <div className="sermon-message-card__actions">
        <span className="sermon-message-card__duration">
          <i className="fa-regular fa-clock"></i>
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
              <i className="fa-brands fa-youtube"></i>
            </a>
          )}
          {message.AudioUrl && (
            <a 
              href={message.AudioUrl} 
              download
              className="sermon-message-card__action-btn"
              title="Download Audio"
            >
              <i className="fa-solid fa-download"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

