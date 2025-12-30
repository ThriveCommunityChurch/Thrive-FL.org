// app/services/eventService.ts

import {
  AllEventsResponse,
  Event,
  EventResponse,
  EventSummary,
  RecurrencePattern,
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
      hasErrors: false,
      errorMessage: null,
      events: [],
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
 * Get recurrence pattern label
 */
export function getRecurrencePatternLabel(pattern: RecurrencePattern): string {
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
 */
export function formatEventDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format event time for display
 */
export function formatEventTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
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
 */
export function eventOccursOnDate(event: EventSummary, date: Date): boolean {
  const eventStart = new Date(event.startTime);

  // For non-recurring events, check if the date matches
  if (!event.isRecurring || event.recurrencePattern === RecurrencePattern.None) {
    return (
      date.getFullYear() === eventStart.getFullYear() &&
      date.getMonth() === eventStart.getMonth() &&
      date.getDate() === eventStart.getDate()
    );
  }

  // For recurring events, check the pattern
  switch (event.recurrencePattern) {
    case RecurrencePattern.Weekly:
      return date.getDay() === eventStart.getDay();
    case RecurrencePattern.Daily:
      return date >= eventStart;
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

