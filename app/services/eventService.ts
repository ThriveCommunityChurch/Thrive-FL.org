// app/services/eventService.ts

import {
  AllEventsResponse,
  Event,
  EventResponse,
  EventSummary,
  RecurrencePattern,
  parseRecurrencePattern,
} from '../types/events';

// ============================================
// CONFIGURATION
// ============================================

// API Base URL - uses environment variable with fallback to production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://2gtmya7qxt.us-east-2.awsapprunner.com';

// ============================================
// ERROR HANDLING
// ============================================

export class EventApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public endpoint: string
  ) {
    super(message);
    this.name = 'EventApiError';
  }
}

async function handleResponse<T>(response: Response, endpoint: string): Promise<T> {
  // Handle 204 No Content - return null to indicate empty response
  if (response.status === 204) {
    return null as T;
  }

  if (!response.ok) {
    throw new EventApiError(
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
 * Get all active events
 * @param includeInactive - Include inactive events (default: false)
 */
export async function getAllEvents(includeInactive = false): Promise<AllEventsResponse> {
  const endpoint = `/api/Events?includeInactive=${includeInactive}`;
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: 'no-store', // Always fetch fresh data
  });

  const result = await handleResponse<AllEventsResponse | null>(response, endpoint);

  // Handle 204 No Content - return empty events response
  if (result === null) {
    return {
      Events: [],
      TotalCount: 0,
    };
  }

  return result;
}

/**
 * Get a single event by ID
 * @param eventId - The event ID
 */
export async function getEventById(eventId: string): Promise<EventResponse> {
  const endpoint = `/api/Events/${eventId}`;
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    cache: 'no-store',
  });
  return handleResponse<EventResponse>(response, endpoint);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get recurrence pattern label from string or enum
 */
export function getRecurrencePatternLabel(pattern: string | RecurrencePattern): string {
  if (typeof pattern === 'string') {
    return pattern; // API already returns "Weekly", "Daily", etc.
  }
  switch (pattern) {
    case RecurrencePattern.Daily:
      return 'Daily';
    case RecurrencePattern.Weekly:
      return 'Weekly';
    case RecurrencePattern.BiWeekly:
      return 'Bi-Weekly';
    case RecurrencePattern.Monthly:
      return 'Monthly';
    case RecurrencePattern.Yearly:
      return 'Yearly';
    default:
      return '';
  }
}

/**
 * Format event date for display
 * Note: timeZone is specified to ensure consistent rendering between server and client
 * to prevent React hydration mismatches.
 */
export function formatEventDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'America/New_York',
  });
}

/**
 * Format event time for display
 * Note: timeZone is specified to ensure consistent rendering between server and client
 * to prevent React hydration mismatches. "Eastern" is appended to clarify the timezone
 * for users in other regions.
 */
export function formatEventTime(dateString: string): string {
  const date = new Date(dateString);
  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/New_York',
  });
  return `${time} Eastern`;
}

/**
 * Format event date range
 */
export function formatEventDateRange(startTime: string, endTime?: string): string {
  const start = new Date(startTime);
  const startDate = formatEventDate(startTime);
  const startTimeStr = formatEventTime(startTime);

  if (!endTime) {
    return `${startDate} at ${startTimeStr}`;
  }

  const end = new Date(endTime);
  const endTimeStr = formatEventTime(endTime);

  // Same day event
  if (start.toDateString() === end.toDateString()) {
    return `${startDate}, ${startTimeStr} - ${endTimeStr}`;
  }

  // Multi-day event
  const endDate = formatEventDate(endTime);
  return `${startDate} ${startTimeStr} - ${endDate} ${endTimeStr}`;
}

/**
 * Check if an event occurs on a specific date
 * Uses RecurrenceDayOfWeek from API for weekly events
 */
export function eventOccursOnDate(event: EventSummary, date: Date): boolean {
  const eventStart = new Date(event.StartTime);
  const pattern = parseRecurrencePattern(event.RecurrencePattern);

  // For non-recurring events, check if the date matches the start date
  if (!event.IsRecurring || pattern === RecurrencePattern.None) {
    return (
      date.getFullYear() === eventStart.getFullYear() &&
      date.getMonth() === eventStart.getMonth() &&
      date.getDate() === eventStart.getDate()
    );
  }

  // For recurring events, check the pattern
  switch (pattern) {
    case RecurrencePattern.Weekly:
      // Use RecurrenceDayOfWeek from API (0 = Sunday, 6 = Saturday)
      const dayOfWeek = event.RecurrenceDayOfWeek ?? eventStart.getDay();
      return date.getDay() === dayOfWeek;
    case RecurrencePattern.Daily:
      return date >= eventStart;
    case RecurrencePattern.BiWeekly:
      // Check if it's the correct day of week and correct week interval
      if (date.getDay() !== (event.RecurrenceDayOfWeek ?? eventStart.getDay())) {
        return false;
      }
      const weeksDiff = Math.floor((date.getTime() - eventStart.getTime()) / (7 * 24 * 60 * 60 * 1000));
      return weeksDiff >= 0 && weeksDiff % 2 === 0;
    case RecurrencePattern.Monthly:
      return date.getDate() === eventStart.getDate() && date >= eventStart;
    case RecurrencePattern.Yearly:
      return (
        date.getMonth() === eventStart.getMonth() &&
        date.getDate() === eventStart.getDate() &&
        date >= eventStart
      );
    default:
      return false;
  }
}

