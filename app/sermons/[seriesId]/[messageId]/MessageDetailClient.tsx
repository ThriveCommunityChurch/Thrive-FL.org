"use client";

import { useState } from "react";
import { SermonMessage, SermonSeries, TranscriptResponse } from "../../../types/sermons";
import { useAudioPlayer } from "../../../contexts/AudioPlayerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faFileAlt,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

interface MessageDetailClientProps {
  message: SermonMessage;
  series: SermonSeries;
  transcript: TranscriptResponse | null;
}

export default function MessageDetailClient({
  message,
  series,
  transcript,
}: MessageDetailClientProps) {
  const { playMessage, currentMessage, isPlaying } = useAudioPlayer();
  const [showTranscript, setShowTranscript] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const isCurrentlyPlaying = currentMessage?.MessageId === message.MessageId && isPlaying;

  const handlePlayClick = () => {
    if (message.AudioUrl) {
      playMessage(message, series.Name, series.ArtUrl || series.Thumbnail || '');
    }
  };

  // Generate Bible Gateway link for passage reference
  const getBibleGatewayUrl = (passage: string) => {
    const encodedPassage = encodeURIComponent(passage);
    return `https://www.biblegateway.com/passage/?search=${encodedPassage}&version=ESV`;
  };

  return (
    <div className="message-detail-client">
      {/* Play Button */}
      {message.AudioUrl && (
        <div className="message-detail__actions">
          <button
            className={`btn btn-primary btn-lg ${isCurrentlyPlaying ? 'message-detail__play-btn--playing' : ''}`}
            onClick={handlePlayClick}
          >
            <FontAwesomeIcon icon={isCurrentlyPlaying ? faPause : faPlay} />
            {isCurrentlyPlaying ? 'Now Playing' : 'Play Message'}
          </button>
        </div>
      )}

      {/* Collapsible Sections */}

      {/* Sermon Notes Section */}
      {transcript?.Notes && (
        <div className="message-detail__collapsible">
          <button
            className="message-detail__collapsible-header"
            onClick={() => setShowNotes(!showNotes)}
            aria-expanded={showNotes}
          >
            <span className="message-detail__collapsible-title">
              <FontAwesomeIcon icon={faFileAlt} />
              Sermon Notes
            </span>
            <FontAwesomeIcon icon={showNotes ? faChevronUp : faChevronDown} />
          </button>
          {showNotes && (
            <div className="message-detail__collapsible-content">
              <div className="sermon-notes">
                {transcript.Notes.MainScripture && (
                  <p className="sermon-notes__scripture">
                    <strong>Main Scripture:</strong>{' '}
                    <a
                      href={getBibleGatewayUrl(transcript.Notes.MainScripture)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {transcript.Notes.MainScripture}
                    </a>
                  </p>
                )}

                {transcript.Notes.Summary && (
                  <div className="sermon-notes__section">
                    <h3>Summary</h3>
                    <p>{transcript.Notes.Summary}</p>
                  </div>
                )}

                {transcript.Notes.KeyPoints && transcript.Notes.KeyPoints.length > 0 && (
                  <div className="sermon-notes__section">
                    <h3>Key Points</h3>
                    <ul className="sermon-notes__key-points">
                      {transcript.Notes.KeyPoints.map((point, index) => (
                        <li key={index}>
                          <strong>{point.Point}</strong>
                          {point.Scripture && (
                            <span className="sermon-notes__point-scripture">
                              {' — '}
                              <a
                                href={getBibleGatewayUrl(point.Scripture)}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {point.Scripture}
                              </a>
                            </span>
                          )}
                          {point.Detail && <p>{point.Detail}</p>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {transcript.Notes.Quotes && transcript.Notes.Quotes.length > 0 && (
                  <div className="sermon-notes__section">
                    <h3>Notable Quotes</h3>
                    <div className="sermon-notes__quotes">
                      {transcript.Notes.Quotes.map((quote, index) => (
                        <blockquote key={index} className="sermon-notes__quote">
                          <p>&ldquo;{quote.Text}&rdquo;</p>
                          {quote.Context && <cite>— {quote.Context}</cite>}
                        </blockquote>
                      ))}
                    </div>
                  </div>
                )}

                {transcript.Notes.ApplicationPoints && transcript.Notes.ApplicationPoints.length > 0 && (
                  <div className="sermon-notes__section">
                    <h3>Application Points</h3>
                    <ul className="sermon-notes__application">
                      {transcript.Notes.ApplicationPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Transcript Section */}
      {transcript?.FullText && (
        <div className="message-detail__collapsible">
          <button
            className="message-detail__collapsible-header"
            onClick={() => setShowTranscript(!showTranscript)}
            aria-expanded={showTranscript}
          >
            <span className="message-detail__collapsible-title">
              <FontAwesomeIcon icon={faFileAlt} />
              Full Transcript
              <span className="message-detail__word-count">
                ({transcript.WordCount.toLocaleString()} words)
              </span>
            </span>
            <FontAwesomeIcon icon={showTranscript ? faChevronUp : faChevronDown} />
          </button>
          {showTranscript && (
            <div className="message-detail__collapsible-content">
              <div className="message-detail__transcript">
                {transcript.FullText.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

