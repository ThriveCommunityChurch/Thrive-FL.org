"use client";

import { LivestreamSkeletonProps } from '../../types/youtube';

/**
 * Skeleton loading component for the livestream player
 * Matches the 16:9 aspect ratio of the video container
 */
export default function LivestreamSkeleton({ showStatusInfo = false }: LivestreamSkeletonProps) {
  return (
    <div className="livestream-skeleton">
      {/* Video container skeleton */}
      <div className="livestream-video-skeleton">
        <div className="skeleton-pulse livestream-video-placeholder">
          <div className="skeleton-play-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="64" height="64">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div className="skeleton-text">Checking stream status...</div>
        </div>
      </div>

      {/* Status info skeleton */}
      {showStatusInfo && (
        <div className="livestream-status-skeleton">
          <div className="skeleton-pulse skeleton-status-badge"></div>
          <div className="skeleton-pulse skeleton-status-text"></div>
        </div>
      )}
    </div>
  );
}

