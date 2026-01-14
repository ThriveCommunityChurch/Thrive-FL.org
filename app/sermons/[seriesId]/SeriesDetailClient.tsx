"use client";

import SermonMessageList from "../../components/sermons/SermonMessageList";
import { SermonSeries, SermonMessage } from "../../types/sermons";
import { useAudioPlayer } from "../../contexts/AudioPlayerContext";

interface SeriesDetailClientProps {
  series: SermonSeries;
}

export default function SeriesDetailClient({ series }: SeriesDetailClientProps) {
  const { playMessage } = useAudioPlayer();

  const handlePlayMessage = (message: SermonMessage) => {
    playMessage(message, series.Name, series.ArtUrl || series.Thumbnail || '');
  };

  return (
    <div className="series-messages-section">
      <h2 className="series-messages-title">Messages in this Series</h2>
      <SermonMessageList
        messages={series.Messages}
        seriesArtUrl={series.ArtUrl}
        onPlayMessage={handlePlayMessage}
      />
    </div>
  );
}

