"use client";

import Link from 'next/link';
import { SermonSeriesCardProps } from '../../types/sermons';
import { formatSeriesDateRange } from '../../services/sermonService';

export default function SermonSeriesCard({ series, index = 0 }: SermonSeriesCardProps) {
  const dateRange = formatSeriesDateRange(series.StartDate, series.EndDate);
  const isOngoing = !series.EndDate;

  return (
    <Link 
      href={`/sermons/${series.Id}`}
      className="sermon-series-card"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="sermon-series-card__image-wrapper">
        <img
          src={series.ArtUrl}
          alt={series.Title}
          className="sermon-series-card__image"
          loading="lazy"
        />
        {isOngoing && (
          <span className="sermon-series-card__badge sermon-series-card__badge--current">
            Current Series
          </span>
        )}
        {series.MessageCount && series.MessageCount > 0 && (
          <span className="sermon-series-card__badge sermon-series-card__badge--count">
            {series.MessageCount} {series.MessageCount === 1 ? 'Message' : 'Messages'}
          </span>
        )}
      </div>
      <div className="sermon-series-card__content">
        <h3 className="sermon-series-card__title">{series.Title}</h3>
        <p className="sermon-series-card__meta">{dateRange}</p>
      </div>
    </Link>
  );
}

