"use client";

import { SermonSkeletonProps } from '../../types/sermons';

export default function SermonSkeleton({ variant, count = 6 }: SermonSkeletonProps) {
  if (variant === 'series-card') {
    return (
      <div className="sermon-skeleton-card">
        <div className="skeleton-image skeleton-pulse"></div>
        <div className="skeleton-content">
          <div className="skeleton-title skeleton-pulse"></div>
          <div className="skeleton-meta skeleton-pulse"></div>
        </div>
      </div>
    );
  }

  if (variant === 'series-grid') {
    return (
      <div className="sermon-series-grid">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="sermon-skeleton-card" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="skeleton-image skeleton-pulse"></div>
            <div className="skeleton-content">
              <div className="skeleton-title skeleton-pulse"></div>
              <div className="skeleton-meta skeleton-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'message-card') {
    return (
      <div className="sermon-skeleton-message">
        <div className="skeleton-play-button skeleton-pulse"></div>
        <div className="skeleton-message-content">
          <div className="skeleton-title skeleton-pulse"></div>
          <div className="skeleton-meta skeleton-pulse"></div>
        </div>
        <div className="skeleton-duration skeleton-pulse"></div>
      </div>
    );
  }

  if (variant === 'message-list') {
    return (
      <div className="sermon-message-list">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="sermon-skeleton-message" style={{ animationDelay: `${index * 50}ms` }}>
            <div className="skeleton-play-button skeleton-pulse"></div>
            <div className="skeleton-message-content">
              <div className="skeleton-title skeleton-pulse"></div>
              <div className="skeleton-meta skeleton-pulse"></div>
            </div>
            <div className="skeleton-duration skeleton-pulse"></div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

