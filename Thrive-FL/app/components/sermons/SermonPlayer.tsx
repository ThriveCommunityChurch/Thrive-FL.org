"use client";

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { SermonPlayerProps } from '../../types/sermons';
import { formatDuration } from '../../services/sermonService';

export default function SermonPlayer({ 
  message, 
  seriesArtUrl,
  onClose,
  autoPlay = true 
}: SermonPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !message?.AudioUrl) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    if (autoPlay) {
      audio.play().catch(() => setIsPlaying(false));
    }

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [message?.AudioUrl, autoPlay]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleClose = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    onClose?.();
  };

  if (!message) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const thumbnail = seriesArtUrl || '/ThriveLogo.png';

  return (
    <div className="sermon-player">
      <audio ref={audioRef} src={message.AudioUrl || undefined} preload="metadata" />
      
      <div className="sermon-player__thumbnail">
        <Image
          src={thumbnail}
          alt={message.Title}
          width={60}
          height={60}
          style={{ objectFit: 'cover' }}
          unoptimized={thumbnail.startsWith('http')}
        />
      </div>

      <div className="sermon-player__info">
        <h4 className="sermon-player__title">{message.Title}</h4>
        <p className="sermon-player__speaker">{message.Speaker}</p>
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
        onClick={handleClose}
        aria-label="Close player"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
}

