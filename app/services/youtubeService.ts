// app/services/youtubeService.ts

import { YouTubeSearchResponse, LivestreamStatus } from '../types/youtube';

// ============================================
// CONFIGURATION
// ============================================

// Thrive Community Church YouTube Channel ID
export const THRIVE_CHANNEL_ID = 'UC47Nme86YGrVy1lY15rF3ig';

// YouTube Data API v3 base URL
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// API Key from environment variable (public, domain-restricted)
const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '';

// Polling intervals (in milliseconds)
const ACTIVE_POLL_INTERVAL = 5 * 60 * 1000;  // 5 minutes when near service time
const NORMAL_POLL_INTERVAL = 60 * 60 * 1000; // 1 hour during potential service windows
const COOLOFF_POLL_INTERVAL = null;          // null = don't poll at all

// ============================================
// SERVICE SCHEDULE CONFIGURATION
// ============================================
// All times are in Eastern Time (America/New_York).
// User's local time is automatically converted to Eastern before checking.
//
// Sunday: 9:30 AM - 12:00 PM ET (main service window)
// Weekdays: 5:00 PM - 10:00 PM ET (evening events only)
// Saturday: No services (cooloff all day)

const SCHEDULE = {
  // Sunday (0)
  0: { start: 9.5, end: 12, activeStart: 9.5, activeEnd: 10.5 },
  // Monday-Friday (1-5): Evening only
  1: { start: 17, end: 22, activeStart: null, activeEnd: null },
  2: { start: 17, end: 22, activeStart: null, activeEnd: null },
  3: { start: 17, end: 22, activeStart: null, activeEnd: null },
  4: { start: 17, end: 22, activeStart: null, activeEnd: null },
  5: { start: 17, end: 22, activeStart: null, activeEnd: null },
  // Saturday (6): No services
  6: { start: null, end: null, activeStart: null, activeEnd: null },
} as const;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get current time in Eastern timezone
 */
function getEasternTime(): { dayOfWeek: number; hours: number } {
  const now = new Date();
  const eastern = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  return {
    dayOfWeek: eastern.getDay(),
    hours: eastern.getHours() + eastern.getMinutes() / 60,
  };
}

/**
 * Check if we're within a potential service window
 * Returns false during cooloff times (no polling needed)
 */
export function isWithinServiceWindow(): boolean {
  const { dayOfWeek, hours } = getEasternTime();
  const schedule = SCHEDULE[dayOfWeek as keyof typeof SCHEDULE];

  // No services scheduled this day
  if (schedule.start === null || schedule.end === null) {
    return false;
  }

  return hours >= schedule.start && hours <= schedule.end;
}

/**
 * Check if we're within the active polling window (near expected service start)
 */
export function isWithinActiveWindow(): boolean {
  const { dayOfWeek, hours } = getEasternTime();
  const schedule = SCHEDULE[dayOfWeek as keyof typeof SCHEDULE];

  // No active window defined for this day
  if (schedule.activeStart === null || schedule.activeEnd === null) {
    return false;
  }

  return hours >= schedule.activeStart && hours <= schedule.activeEnd;
}

/**
 * Gets the appropriate polling interval based on current time
 * - Cooloff periods (Saturday, off-hours): no polling
 * - Active window (near Sunday 10 AM): every 5 minutes
 * - Service window (potential event times): every hour
 */
export function getPollInterval(): number | null {
  // Cooloff period - don't poll at all
  if (!isWithinServiceWindow()) {
    return COOLOFF_POLL_INTERVAL;
  }

  // Active window - poll frequently
  if (isWithinActiveWindow()) {
    const jitter = Math.floor(Math.random() * 30000); // 0-30 sec jitter
    return ACTIVE_POLL_INTERVAL + jitter;
  }

  // Normal service window - poll hourly
  const jitter = Math.floor(Math.random() * 5 * 60 * 1000); // 0-5 min jitter
  return NORMAL_POLL_INTERVAL + jitter;
}

// ============================================
// API FUNCTIONS
// ============================================

/**
 * Check if a YouTube channel is currently live streaming
 * 
 * @param channelId - The YouTube channel ID to check
 * @returns LivestreamStatus object with current stream status
 */
export async function checkLiveStatus(channelId: string = THRIVE_CHANNEL_ID): Promise<LivestreamStatus> {
  // Return error state if no API key is configured
  if (!YOUTUBE_API_KEY) {
    return {
      isLive: false,
      isLoading: false,
      error: 'YouTube API key not configured',
      videoId: null,
      title: null,
      thumbnail: null,
    };
  }

  try {
    const url = new URL(`${YOUTUBE_API_BASE_URL}/search`);
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('channelId', channelId);
    url.searchParams.set('eventType', 'live');
    url.searchParams.set('type', 'video');
    url.searchParams.set('key', YOUTUBE_API_KEY);

    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorText = await response.text();
      console.error('YouTube API error:', response.status, errorText);
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data: YouTubeSearchResponse = await response.json();

    // Check if there are any live streams
    if (data.items && data.items.length > 0) {
      const liveStream = data.items[0];
      return {
        isLive: true,
        isLoading: false,
        error: null,
        videoId: liveStream.id.videoId,
        title: liveStream.snippet.title,
        thumbnail: liveStream.snippet.thumbnails.high?.url || null,
      };
    }

    // No live streams found
    return {
      isLive: false,
      isLoading: false,
      error: null,
      videoId: null,
      title: null,
      thumbnail: null,
    };

  } catch (error) {
    console.error('Error checking live status:', error);
    return {
      isLive: false,
      isLoading: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      videoId: null,
      title: null,
      thumbnail: null,
    };
  }
}

/**
 * Get the YouTube channel URL for Thrive
 */
export function getChannelUrl(): string {
  return 'https://www.youtube.com/channel/UC47Nme86YGrVy1lY15rF3ig/videos';
}

/**
 * Get the embed URL for a YouTube video
 * 
 * @param videoId - The YouTube video ID
 * @param autoplay - Whether to autoplay the video
 * @returns The embed URL string
 */
export function getEmbedUrl(videoId: string, autoplay: boolean = true): string {
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    rel: '0', // Don't show related videos from other channels
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

