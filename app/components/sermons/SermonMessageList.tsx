"use client";

import { SermonMessage } from '../../types/sermons';
import SermonMessageCard from './SermonMessageCard';
import SermonSkeleton from './SermonSkeleton';
import { useAudioPlayer } from '../../contexts/AudioPlayerContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";

interface SermonMessageListProps {
  messages: SermonMessage[];
  seriesId: string;
  seriesArtUrl?: string;
  onPlayMessage: (message: SermonMessage) => void;
  isLoading?: boolean;
}

export default function SermonMessageList({
  messages,
  seriesId,
  seriesArtUrl,
  onPlayMessage,
  isLoading = false
}: SermonMessageListProps) {
  const { currentMessage } = useAudioPlayer();
  if (isLoading) {
    return <SermonSkeleton variant="message-list" count={5} />;
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="sermon-empty-state sermon-empty-state--compact">
        <FontAwesomeIcon icon={faMicrophoneSlash} />
        <h4>No Messages Available</h4>
        <p>Messages for this series will be added soon.</p>
      </div>
    );
  }

  // Sort messages by date, most recent first
  const sortedMessages = [...messages].sort((a, b) => {
    if (!a.Date || !b.Date) return 0;
    return new Date(b.Date).getTime() - new Date(a.Date).getTime();
  });

  return (
    <div className="sermon-message-list">
      {sortedMessages.map((message, index) => (
        <SermonMessageCard
          key={message.MessageId}
          message={message}
          seriesId={seriesId}
          seriesArtUrl={seriesArtUrl}
          onPlay={onPlayMessage}
          isPlaying={currentMessage?.MessageId === message.MessageId}
          index={index}
        />
      ))}
    </div>
  );
}

