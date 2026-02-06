// app/services/sermonService.ts

import {
  AllSermonsSummaryResponse,
  SermonSeries,
  TranscriptResponse,
  SermonNotesResponse,
  SitemapDataResponse,
} from '../types/sermons';

// ============================================
// CONFIGURATION
// ============================================

// API Base URL - uses environment variable with fallback to production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.thrive-fl.org';

// ============================================
// ERROR HANDLING
// ============================================

export class SermonApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public endpoint: string
  ) {
    super(message);
    this.name = 'SermonApiError';
  }
}

async function handleResponse<T>(response: Response, endpoint: string): Promise<T> {
  if (!response.ok) {
    throw new SermonApiError(
      `API request failed: ${response.statusText}`,
      response.status,
      endpoint
    );
  }
  return response.json();
}

// ============================================
// API FUNCTIONS
// ============================================

/**
 * Get all sermon series summaries
 * @param highResImg - Request high-resolution artwork (default: true)
 *
 * Note: Using cache: 'no-store' to always fetch fresh data.
 * This avoids stale data issues with Amplify's persistent build cache.
 */
export async function getAllSermons(highResImg = true): Promise<AllSermonsSummaryResponse> {
  const endpoint = `/api/Sermons?highResImg=${highResImg}`;
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: 'no-store',
  });
  return handleResponse<AllSermonsSummaryResponse>(response, endpoint);
}

/**
 * Get a single sermon series with all messages
 * @param seriesId - The series ID
 *
 * Note: Using cache: 'no-store' to always fetch fresh data.
 * This avoids stale data issues with Amplify's persistent build cache.
 */
export async function getSeriesById(seriesId: string): Promise<SermonSeries> {
  const endpoint = `/api/Sermons/series/${seriesId}`;
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: 'no-store',
  });
  return handleResponse<SermonSeries>(response, endpoint);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format audio duration from seconds to "MM:SS" or "HH:MM:SS"
 */
export function formatDuration(seconds: number | null): string {
  if (!seconds) return '--:--';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format file size from MB to human-readable string
 */
export function formatFileSize(mb: number | null): string {
  if (!mb) return '';
  return `${mb.toFixed(1)} MB`;
}

/**
 * Format date string to readable format
 * Note: timeZone is specified to ensure consistent rendering between server and client
 * to prevent React hydration mismatches.
 */
export function formatSermonDate(dateString: string | null): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/New_York',
  });
}

/**
 * Format date range for series display
 * Note: timeZone is specified to ensure consistent rendering between server and client
 * to prevent React hydration mismatches.
 */
export function formatSeriesDateRange(startDate: string | null, endDate: string | null): string {
  if (!startDate) return '';

  const start = new Date(startDate);
  const startStr = start.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'America/New_York',
  });

  if (!endDate) {
    return `${startStr} - Present`;
  }

  const end = new Date(endDate);
  const endStr = end.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'America/New_York',
  });

  // If same month and year, just show one date
  if (startStr === endStr) {
    return startStr;
  }

  return `${startStr} - ${endStr}`;
}

/**
 * Get YouTube video ID from URL
 */
export function getYouTubeVideoId(url: string | null): string | null {
  if (!url) return null;

  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

/**
 * Get transcript for a sermon message
 * @param messageId - The message ID
 * @returns TranscriptResponse or null if not found
 */
export async function getMessageTranscript(messageId: string): Promise<TranscriptResponse | null> {
  const endpoint = `/api/Sermons/series/message/${messageId}/transcript`;
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      cache: 'no-store',
    });
    if (response.status === 404) {
      return null;
    }
    return handleResponse<TranscriptResponse>(response, endpoint);
  } catch {
    return null;
  }
}

/**
 * Get sermon notes for a message
 * @param messageId - The message ID
 * @returns SermonNotesResponse or null if not found
 */
export async function getSermonNotes(messageId: string): Promise<SermonNotesResponse | null> {
  const endpoint = `/api/Sermons/series/message/${messageId}/notes`;
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      cache: 'no-store',
    });
    if (response.status === 404) {
      return null;
    }
    return handleResponse<SermonNotesResponse>(response, endpoint);
  } catch {
    return null;
  }
}

/**
 * Get sitemap data (all series and message IDs) for sitemap generation
 * This returns minimal data needed for sitemap URLs in a single API call
 */
export async function getSitemapData(): Promise<SitemapDataResponse> {
  const endpoint = '/api/Sermons/sitemap';
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    next: { revalidate: 7200 }, // Match sitemap ISR (2 hours)
  });
  return handleResponse<SitemapDataResponse>(response, endpoint);
}
