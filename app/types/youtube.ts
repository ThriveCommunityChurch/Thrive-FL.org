// app/types/youtube.ts

/**
 * YouTube Data API v3 - Search Response
 */
export interface YouTubeSearchResponse {
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YouTubeSearchItem[];
}

/**
 * Individual item from YouTube search results
 */
export interface YouTubeSearchItem {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: YouTubeThumbnail;
      medium: YouTubeThumbnail;
      high: YouTubeThumbnail;
    };
    channelTitle: string;
    liveBroadcastContent: 'live' | 'upcoming' | 'none';
  };
}

/**
 * YouTube thumbnail object
 */
export interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

/**
 * Simplified livestream status for component use
 */
export interface LivestreamStatus {
  isLive: boolean;
  isLoading: boolean;
  error: string | null;
  videoId: string | null;
  title: string | null;
  thumbnail: string | null;
}

/**
 * Props for LivestreamPlayer component
 */
export interface LivestreamPlayerProps {
  /** YouTube channel ID to monitor */
  channelId?: string;
  /** Polling interval in milliseconds (default: 60000-90000ms randomized) */
  pollInterval?: number;
  /** Callback when stream status changes */
  onStatusChange?: (status: LivestreamStatus) => void;
  /** Show status info box below player */
  showStatusInfo?: boolean;
}

/**
 * Props for LivestreamOffline component
 */
export interface LivestreamOfflineProps {
  /** Custom heading text */
  heading?: string;
  /** Custom subtext */
  subtext?: string;
  /** Link for the CTA button */
  ctaLink?: string;
  /** Text for the CTA button */
  ctaText?: string;
}

/**
 * Props for LivestreamSkeleton component
 */
export interface LivestreamSkeletonProps {
  /** Whether to show the status info skeleton */
  showStatusInfo?: boolean;
}

