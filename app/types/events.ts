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
 * Event location details
 */
export interface EventLocation {
  name?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
}

/**
 * Event recurrence configuration
 */
export interface EventRecurrence {
  pattern: RecurrencePattern;
  interval: number;
  dayOfWeek?: number;      // 0 = Sunday, 6 = Saturday
  dayOfMonth?: number;     // 1-31
  endDate?: string;        // ISO date string
}

/**
 * Event summary returned by GET /api/Events (list view)
 */
export interface EventSummary {
  id: string;
  title: string;
  summary: string;
  startTime: string;           // ISO date string
  endTime?: string;
  isAllDay: boolean;
  isRecurring: boolean;
  recurrencePattern: RecurrencePattern;
  isOnline: boolean;
  locationName?: string;
  isFeatured: boolean;
  isActive: boolean;
  thumbnailUrl?: string;
  iconName?: string;
}

/**
 * Full event details returned by GET /api/Events/{id}
 */
export interface Event {
  id: string;
  title: string;
  summary: string;
  description?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  iconName?: string;
  startTime: string;
  endTime?: string;
  isAllDay: boolean;
  isRecurring: boolean;
  recurrence?: EventRecurrence;
  isOnline: boolean;
  onlineLink?: string;
  onlinePlatform?: string;
  location?: EventLocation;
  contactEmail?: string;
  contactPhone?: string;
  registrationUrl?: string;
  tags?: string[];
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// API RESPONSE TYPES
// ============================================

/**
 * Response from GET /api/Events (all events list)
 */
export interface AllEventsResponse {
  events: EventSummary[];
  totalCount: number;
  hasErrors: boolean;
  errorMessage?: string;
}

/**
 * Response from GET /api/Events/{id} (single event)
 */
export interface EventResponse {
  event: Event;
  hasErrors: boolean;
  errorMessage?: string;
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
  events: EventSummary[];
}

