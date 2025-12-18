"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import SermonMessageList from "../../components/sermons/SermonMessageList";
import SermonSkeleton from "../../components/sermons/SermonSkeleton";
import { getSeriesById, formatSeriesDateRange } from "../../services/sermonService";
import { SermonSeries, SermonMessage } from "../../types/sermons";
import { useAudioPlayer } from "../../contexts/AudioPlayerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faExclamationTriangle,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

interface PageProps {
  params: { seriesId: string };
}

export default function SeriesDetailPage({ params }: PageProps) {
  const [series, setSeries] = useState<SermonSeries | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { playMessage } = useAudioPlayer();

  useEffect(() => {
    async function loadSeries() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getSeriesById(params.seriesId);
        setSeries(data);
      } catch (err) {
        console.error('Failed to load series:', err);
        setError('Failed to load series. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    loadSeries();
  }, [params.seriesId]);

  const handlePlayMessage = (message: SermonMessage) => {
    if (series) {
      playMessage(message, series.Name, series.ArtUrl || series.Thumbnail || '');
    }
  };

  const dateRange = series ? formatSeriesDateRange(series.StartDate, series.EndDate) : '';
  const isOngoing = series && !series.EndDate;

  return (
    <div className="page-wrapper">
      {/* Breadcrumb */}
      <nav className="breadcrumb-nav">
        <div className="container">
          <a href="/sermons" className="breadcrumb-link">
            <FontAwesomeIcon icon={faArrowLeft} />
            All Series
          </a>
        </div>
      </nav>

      {/* Series Detail Content */}
      <section className="section series-detail-section">
        <div className="container">
          {error ? (
            <div className="sermon-error-state">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <h3>Unable to Load Series</h3>
              <p>{error}</p>
              <a href="/sermons" className="btn btn-primary">Back to Sermons</a>
            </div>
          ) : isLoading ? (
            <div className="series-detail-loading">
              <div className="series-header-skeleton">
                <div className="skeleton-artwork skeleton-pulse"></div>
                <div className="skeleton-info">
                  <div className="skeleton-title skeleton-pulse"></div>
                  <div className="skeleton-meta skeleton-pulse"></div>
                  <div className="skeleton-description skeleton-pulse"></div>
                </div>
              </div>
              <SermonSkeleton variant="message-list" count={5} />
            </div>
          ) : series ? (
            <>
              {/* Series Header */}
              <div className="series-detail-header">
                <div className="series-detail-artwork">
                  <Image
                    src={series.ArtUrl || series.Thumbnail}
                    alt={series.Name}
                    width={400}
                    height={400}
                    style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                    unoptimized
                  />
                  {isOngoing && (
                    <span className="series-badge series-badge--current">Current Series</span>
                  )}
                </div>
                <div className="series-detail-info">
                  <h1 className="series-detail-title">{series.Name}</h1>
                  <p className="series-detail-meta">
                    <span className="series-detail-date">
                      <FontAwesomeIcon icon={faCalendar} />
                      {dateRange}
                    </span>
                    <span className="series-detail-count">
                      <FontAwesomeIcon icon={faMicrophone} />
                      {series.Messages.length} {series.Messages.length === 1 ? 'Message' : 'Messages'}
                    </span>
                  </p>
                  {series.Summary && (
                    <p className="series-detail-summary">{series.Summary}</p>
                  )}
                </div>
              </div>
              {/* Messages List */}
              <div className="series-messages-section">
                <h2 className="series-messages-title">Messages in this Series</h2>
                <SermonMessageList
                  messages={series.Messages}
                  seriesArtUrl={series.ArtUrl}
                  onPlayMessage={handlePlayMessage}
                />
              </div>
            </>
          ) : null}
        </div>
      </section>
    </div>
  );
}

