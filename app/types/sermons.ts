// ============================================
// SERMON SERIES TYPES
// ============================================

/**
 * Summary view of a sermon series (used in list/grid views)
 * Returned by GET /api/Sermons
 */
export interface SermonSeriesSummary {
  Id: string;
  Title: string;
  StartDate: string;           // ISO date string
  LastUpdated: string;         // ISO date string
  ArtUrl: string;              // Series artwork image URL
  EndDate: string | null;      // null if series is ongoing
  MessageCount: number | null; // Number of messages in series
}

/**
 * Individual sermon message within a series
 */
export interface SermonMessage {
  MessageId: string;
  SeriesId: string;
  Title: string;
  Speaker: string;
  Date: string | null;         // ISO date string
  PassageRef: string | null;   // Scripture reference (e.g., "Genesis 3: 1 - 15")
  AudioUrl: string | null;     // MP3 URL (S3 hosted)
  AudioDuration: number | null; // Duration in seconds
  AudioFileSize: number | null; // File size in MB
  VideoUrl: string | null;     // YouTube or video URL
  Summary: string | null;
  PlayCount: number;
  Tags: string[];              // Topic tags
  WaveformData: number[] | null; // Audio waveform (for visualizations)
}

/**
 * Full sermon series with messages (used in detail view)
 * Returned by GET /api/Sermons/series/{SeriesId}
 */
export interface SermonSeries {
  Id: string;
  Name: string;
  Year: string;
  StartDate: string | null;
  EndDate: string | null;
  Slug: string;
  Thumbnail: string;
  ArtUrl: string | undefined;
  LastUpdated: string;
  Messages: SermonMessage[];
  Tags: string[];              // Topic tags
  Summary: string | null;
}

// ============================================
// API RESPONSE TYPES
// ============================================

/**
 * Response from GET /api/Sermons (all summaries)
 */
export interface AllSermonsSummaryResponse {
  Summaries: SermonSeriesSummary[];
}

// ============================================
// COMPONENT PROP TYPES
// ============================================

export interface SermonSeriesCardProps {
  series: SermonSeriesSummary;
  index?: number;              // For staggered animations
}

export interface SermonSeriesGridProps {
  series: SermonSeriesSummary[];
  isLoading?: boolean;
}

export interface SermonMessageCardProps {
  message: SermonMessage;
  seriesId: string;            // Series ID for linking to message detail page
  seriesArtUrl?: string;       // Fallback image
  onPlay?: (message: SermonMessage) => void;
  isPlaying?: boolean;
  index?: number;
}

export interface SermonMessageListProps {
  messages: SermonMessage[];
  seriesArtUrl?: string;
  currentlyPlaying?: string;   // MessageId of currently playing
  onPlayMessage?: (message: SermonMessage) => void;
}

export interface SermonPlayerProps {
  message: SermonMessage | null;
  seriesArtUrl?: string;
  onClose?: () => void;
  autoPlay?: boolean;
}

export interface SermonSkeletonProps {
  variant: 'series-card' | 'series-grid' | 'message-card' | 'message-list';
  count?: number;              // For grid/list variants
}

// ============================================
// TRANSCRIPT & NOTES TYPES
// ============================================

/**
 * Response from GET /api/Sermons/series/message/{MessageId}/transcript
 */
export interface TranscriptResponse {
  MessageId: string;
  Title: string;
  Speaker: string;
  FullText: string;
  WordCount: number;
  Notes?: SermonNotesResponse;
}

/**
 * Response from GET /api/Sermons/series/message/{MessageId}/notes
 */
export interface SermonNotesResponse {
  Title: string;
  Speaker: string;
  Date: string;
  MainScripture: string;
  Summary: string;
  KeyPoints: KeyPointResponse[];
  Quotes: QuoteResponse[];
  ApplicationPoints: string[];
  GeneratedAt: string;
  ModelUsed: string;
  WordCount: number;
}

/**
 * A key point from the sermon notes
 */
export interface KeyPointResponse {
  Point: string;
  Scripture?: string;
  Detail?: string;
  TheologicalContext?: string;
  DirectlyQuoted?: boolean;
}

/**
 * A notable quote from the sermon
 */
export interface QuoteResponse {
  Text: string;
  Context?: string;
}

// ============================================
// SITEMAP TYPES
// ============================================

/**
 * Minimal message data for sitemap generation
 */
export interface SitemapMessageData {
  Id: string;
  Date: string | null;
}

/**
 * Minimal series data for sitemap generation
 */
export interface SitemapSeriesData {
  Id: string;
  LastUpdated: string;
  Messages: SitemapMessageData[];
}

/**
 * Response from GET /api/Sermons/sitemap
 */
export interface SitemapDataResponse {
  Series: SitemapSeriesData[];
}
