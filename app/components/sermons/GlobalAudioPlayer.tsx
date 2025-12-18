"use client";

import Image from 'next/image';
import { useAudioPlayer } from '../../contexts/AudioPlayerContext';
import { formatDuration } from '../../services/sermonService';

export default function GlobalAudioPlayer() {
  const {
    currentMessage,
    seriesTitle,
    seriesArtwork,
    isPlayerVisible,
    isPlaying,
    currentTime,
    duration,
    togglePlayPause,
    seek,
    closePlayer
  } = useAudioPlayer();

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    seek(newTime);
  };

  if (!isPlayerVisible || !currentMessage) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const thumbnail = seriesArtwork || '/ThriveLogo.png';

  return (
    <div className="sermon-player">
      <div className="sermon-player__thumbnail">
        <Image
          src={thumbnail}
          alt={currentMessage.Title}
          width={60}
          height={60}
          style={{ objectFit: 'cover' }}
          unoptimized={thumbnail.startsWith('http')}
        />
      </div>

      <div className="sermon-player__info">
        <h4 className="sermon-player__title">{currentMessage.Title}</h4>
        <p className="sermon-player__speaker">{seriesTitle}</p>
      </div>

      <div className="sermon-player__controls">
        <button
          className="sermon-player__play-btn"
          onClick={togglePlayPause}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
        </button>

        <div className="sermon-player__progress-container">
          <span className="sermon-player__time">{formatDuration(currentTime)}</span>
          <input
            type="range"
            className="sermon-player__progress"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            style={{ '--progress': `${progress}%` } as React.CSSProperties}
          />
          <span className="sermon-player__time">{formatDuration(duration)}</span>
        </div>
      </div>

      <button
        className="sermon-player__close"
        onClick={closePlayer}
        aria-label="Close player"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
}

