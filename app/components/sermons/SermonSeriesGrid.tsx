"use client";

import { SermonSeriesGridProps } from '../../types/sermons';
import SermonSeriesCard from './SermonSeriesCard';
import SermonSkeleton from './SermonSkeleton';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";

export default function SermonSeriesGrid({ series, isLoading = false }: SermonSeriesGridProps) {
  if (isLoading) {
    return <SermonSkeleton variant="series-grid" count={6} />;
  }

  if (!series || series.length === 0) {
    return (
      <div className="sermon-empty-state">
        <FontAwesomeIcon icon={faVideoSlash} />
        <h3>No Sermon Series Found</h3>
        <p>Check back soon for new content.</p>
      </div>
    );
  }

  return (
    <div className="sermon-series-grid">
      {series.map((s, index) => (
        <SermonSeriesCard key={s.Id} series={s} index={index} />
      ))}
    </div>
  );
}

