// ============================================
// EVENT TYPES - Matching ThriveAPI Events DTOs
// ============================================

/**
 * Recurrence pattern for recurring events
 */
export enum RecurrencePattern {
  None = 0,
  Daily = 1,
  Weekly = 2,
  BiWeekly = 3,
  Monthly = 4,
  Yearly = 5,
}

/**
 * Map string recurrence pattern from API to enum
 */
export function parseRecurrencePattern(pattern: string | number): RecurrencePattern {
  if (typeof pattern === 'number') return pattern;
  switch (pattern) {
    case 'Daily': return RecurrencePattern.Daily;
    case 'Weekly': return RecurrencePattern.Weekly;
    case 'BiWeekly': return RecurrencePattern.BiWeekly;
    case 'Monthly': return RecurrencePattern.Monthly;
    case 'Yearly': return RecurrencePattern.Yearly;
    default: return RecurrencePattern.None;
  }
}

/**
 * Event location details
 */
export interface EventLocation {
  Name?: string;
  Address?: string;
  City?: string;
  State?: string;
  ZipCode?: string;
  Latitude?: number;
  Longitude?: number;
}

/**
 * Event recurrence configuration
 */
export interface EventRecurrence {
  Pattern: RecurrencePattern;
  Interval: number;
  DayOfWeek?: number;      // 0 = Sunday, 6 = Saturday
  DayOfMonth?: number;     // 1-31
  EndDate?: string;        // ISO date string
}

/**
 * Event summary returned by GET /api/Events (list view)
 */
export interface EventSummary {
  Id: string;
  Title: string;
  Summary: string;
  StartTime: string;           // ISO date string
  EndTime?: string;
  IsRecurring: boolean;
  RecurrencePattern: string;   // API returns string like "Weekly"
  RecurrenceDayOfWeek?: number; // 0 = Sunday, 6 = Saturday
  IsOnline: boolean;
  LocationName?: string;
  IsFeatured: boolean;
  IsActive: boolean;
  ThumbnailUrl?: string;
  IconName?: string;
  Tags?: string[];
}

/**
 * Full event details returned by GET /api/Events/{id}
 */
export interface Event {
  Id: string;
  Title: string;
  Summary: string;
  Description?: string;
  ImageUrl?: string;
  ThumbnailUrl?: string;
  IconName?: string;
  StartTime: string;
  EndTime?: string;
  IsAllDay: boolean;
  IsRecurring: boolean;
  Recurrence?: EventRecurrence;
  IsOnline: boolean;
  OnlineLink?: string;
  OnlinePlatform?: string;
  Location?: EventLocation;
  ContactEmail?: string;
  ContactPhone?: string;
  RegistrationUrl?: string;
  Tags?: string[];
  IsFeatured: boolean;
  IsActive: boolean;
  CreateDate: string;
  LastUpdated: string;
}

// ============================================
// API RESPONSE TYPES
// ============================================

/**
 * Response from GET /api/Events (all events list)
 */
export interface AllEventsResponse {
  Events: EventSummary[];
  TotalCount: number;
}

/**
 * Response from GET /api/Events/{id} (single event)
 */
export interface EventResponse {
  Event: Event;
}

// ============================================
// COMPONENT PROP TYPES
// ============================================

export interface EventCardProps {
  event: EventSummary;
  onClick?: (event: EventSummary) => void;
}

export interface EventListProps {
  events: EventSummary[];
  onEventClick?: (event: EventSummary) => void;
}

export interface EventModalProps {
  event: Event | null;
  onClose: () => void;
}

// ============================================
// UTILITY TYPES
// ============================================

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  Events: EventSummary[];
}

