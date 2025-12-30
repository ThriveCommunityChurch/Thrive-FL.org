"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faChevronLeft,
  faChevronRight,
  faChurch,
  faCircleQuestion,
  faClock,
  faGlobe,
  faList,
  faLocationDot,
  faMapLocationDot,
  faRepeat,
  faStar,
  faVideo,
  faXmark,
  faSpinner,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import {
  EventSummary,
  Event,
  RecurrencePattern,
} from "../types/events";
import {
  getAllEvents,
  getEventById,
  getRecurrencePatternLabel,
  formatEventTime,
  eventOccursOnDate,
} from "../services/eventService";

// Helper function to check if a date has events
function getEventsForDate(date: Date, events: EventSummary[]): EventSummary[] {
  return events.filter((event) => eventOccursOnDate(event, date));
}

// Get days in month
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

// Get first day of month (0 = Sunday)
function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function EventsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedEventSummary, setSelectedEventSummary] = useState<EventSummary | null>(null);
  const [viewMode, setViewMode] = useState<"month" | "list">("month");
  const [events, setEvents] = useState<EventSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingEventDetails, setLoadingEventDetails] = useState(false);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const today = new Date();

  // Fetch events from API
  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllEvents(false);
        if (response.hasErrors) {
          setError(response.errorMessage || 'Failed to load events');
        } else {
          setEvents(response.events || []);
        }
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setError('Unable to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  // Fetch full event details when an event is clicked
  const handleEventClick = async (eventSummary: EventSummary) => {
    setSelectedEventSummary(eventSummary);
    setLoadingEventDetails(true);
    try {
      const response = await getEventById(eventSummary.id);
      if (!response.hasErrors && response.event) {
        setSelectedEvent(response.event);
      }
    } catch (err) {
      console.error('Failed to fetch event details:', err);
      // Still show modal with summary data
    } finally {
      setLoadingEventDetails(false);
    }
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setSelectedEventSummary(null);
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentYear, currentMonth + direction, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Generate calendar days
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
  const daysInPrevMonth = getDaysInMonth(currentYear, currentMonth - 1);

  const calendarDays: { date: Date; isCurrentMonth: boolean }[] = [];

  // Previous month's trailing days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push({
      date: new Date(currentYear, currentMonth - 1, daysInPrevMonth - i),
      isCurrentMonth: false,
    });
  }

  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      date: new Date(currentYear, currentMonth, day),
      isCurrentMonth: true,
    });
  }

  // Next month's leading days
  const remainingDays = 42 - calendarDays.length;
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      date: new Date(currentYear, currentMonth + 1, day),
      isCurrentMonth: false,
    });
  }

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Get upcoming events for list view
  const getUpcomingEvents = () => {
    const upcoming: { date: Date; event: EventSummary }[] = [];
    const endDate = new Date(today);
    endDate.setMonth(endDate.getMonth() + 2);

    for (let d = new Date(today); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dayEvents = getEventsForDate(new Date(d), events);
      dayEvents.forEach((event) => {
        upcoming.push({ date: new Date(d), event });
      });
    }
    return upcoming.slice(0, 8);
  };

  return (
    <div className="page-wrapper">
      {/* Page Hero Section */}
      <section className="page-hero page-hero-events">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Events &amp; Gatherings</h1>
          <p className="page-hero-subtitle">
            Life happens better together. Find out when we&apos;re meeting next.
          </p>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="section events-calendar-section">
        <div className="container">
          {/* Calendar Controls */}
          <div className="calendar-controls">
            <div className="calendar-nav">
              <button className="calendar-nav-btn" onClick={() => navigateMonth(-1)} aria-label="Previous month">
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <h2 className="calendar-title">
                {MONTH_NAMES[currentMonth]} {currentYear}
              </h2>
              <button className="calendar-nav-btn" onClick={() => navigateMonth(1)} aria-label="Next month">
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
            <div className="calendar-actions">
              <button className="btn-today" onClick={goToToday}>
                Today
              </button>
              <div className="view-toggle">
                <button
                  className={`view-toggle-btn ${viewMode === 'month' ? 'active' : ''}`}
                  onClick={() => setViewMode('month')}
                >
                  <FontAwesomeIcon icon={faCalendar} /> Month
                </button>
                <button
                  className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <FontAwesomeIcon icon={faList} /> List
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="events-loading">
              <FontAwesomeIcon icon={faSpinner} spin size="2x" />
              <p>Loading events...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="events-error">
              <FontAwesomeIcon icon={faExclamationTriangle} size="2x" />
              <p>{error}</p>
              <button className="btn btn-primary" onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          )}

          {/* Month View */}
          {!loading && !error && viewMode === 'month' && (
            <div className="calendar-grid-wrapper">
              <div className="calendar-header">
                {DAY_NAMES.map((day) => (
                  <div key={day} className="calendar-header-cell">{day}</div>
                ))}
              </div>
              <div className="calendar-grid">
                {calendarDays.map(({ date, isCurrentMonth }, index) => {
                  const dayEvents = getEventsForDate(date, events);
                  const hasEvents = dayEvents.length > 0;

                  return (
                    <div
                      key={index}
                      className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isToday(date) ? 'today' : ''} ${hasEvents ? 'has-events' : ''}`}
                      onClick={() => hasEvents && handleEventClick(dayEvents[0])}
                    >
                      <span className="day-number">{date.getDate()}</span>
                      {hasEvents && (
                        <div className="day-events">
                          {dayEvents.map((event) => (
                            <div key={event.id} className={`event-dot ${event.isFeatured ? 'event-featured' : 'event-primary'}`}>
                              <span className="event-preview">{event.title}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* List View */}
          {!loading && !error && viewMode === 'list' && (
            <div className="events-list">
              <h3 className="events-list-title">Upcoming Events</h3>
              {events.length === 0 ? (
                <div className="events-empty">
                  <p>No upcoming events at this time. Check back soon!</p>
                </div>
              ) : (
                getUpcomingEvents().map(({ date, event }, index) => (
                  <div
                    key={`${event.id}-${index}`}
                    className="event-list-item"
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="event-list-date">
                      <span className="event-list-day">{date.getDate()}</span>
                      <span className="event-list-month">{MONTH_NAMES[date.getMonth()].slice(0, 3)}</span>
                    </div>
                    <div className="event-list-content">
                      {event.isOnline ? (
                        <FontAwesomeIcon icon={faVideo} />
                      ) : (
                        <FontAwesomeIcon icon={faChurch} />
                      )}
                      {event.isFeatured && <FontAwesomeIcon icon={faStar} className="featured-star" />}
                      <h4>{event.title}</h4>
                      <p>
                        <FontAwesomeIcon icon={faClock} /> {formatEventTime(event.startTime)}
                        {event.isRecurring && (
                          <span className="recurring-badge">
                            <FontAwesomeIcon icon={faRepeat} /> {getRecurrencePatternLabel(event.recurrencePattern)}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="event-list-arrow">
                      <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      {/* Event Details Modal */}
      {(selectedEvent || selectedEventSummary) && (
        <div className="event-modal-overlay" onClick={closeModal}>
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <button className="event-modal-close" onClick={closeModal}>
              <FontAwesomeIcon icon={faXmark} />
            </button>

            {loadingEventDetails ? (
              <div className="event-modal-loading">
                <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                <p>Loading event details...</p>
              </div>
            ) : (
              <>
                <div className="event-modal-header">
                  {(selectedEvent?.isRecurring || selectedEventSummary?.isRecurring) && (
                    <span className="event-modal-badge">
                      <FontAwesomeIcon icon={faRepeat} /> Recurring Event
                    </span>
                  )}
                  {(selectedEvent?.isFeatured || selectedEventSummary?.isFeatured) && (
                    <span className="event-modal-badge featured">
                      <FontAwesomeIcon icon={faStar} /> Featured
                    </span>
                  )}
                  <h2>
                    {(selectedEvent?.isOnline || selectedEventSummary?.isOnline) ? (
                      <FontAwesomeIcon icon={faVideo} />
                    ) : (
                      <FontAwesomeIcon icon={faChurch} />
                    )}{' '}
                    {selectedEvent?.title || selectedEventSummary?.title}
                  </h2>
                </div>
                <div className="event-modal-body">
                  <div className="event-modal-detail">
                    <FontAwesomeIcon icon={faClock} />
                    <div>
                      <strong>Time</strong>
                      <p>{formatEventTime(selectedEvent?.startTime || selectedEventSummary?.startTime || '')}</p>
                    </div>
                  </div>

                  {(selectedEvent?.isOnline || selectedEventSummary?.isOnline) ? (
                    <div className="event-modal-detail">
                      <FontAwesomeIcon icon={faGlobe} />
                      <div>
                        <strong>Online Event</strong>
                        {selectedEvent?.onlinePlatform && <p>{selectedEvent.onlinePlatform}</p>}
                        {selectedEvent?.onlineLink && (
                          <a href={selectedEvent.onlineLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">
                            Join Online
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="event-modal-detail">
                      <FontAwesomeIcon icon={faLocationDot} />
                      <div>
                        <strong>Location</strong>
                        {selectedEvent?.location ? (
                          <p>
                            {selectedEvent.location.name && <>{selectedEvent.location.name}<br /></>}
                            {selectedEvent.location.address && <>{selectedEvent.location.address}<br /></>}
                            {selectedEvent.location.city && selectedEvent.location.state && (
                              <>{selectedEvent.location.city}, {selectedEvent.location.state} {selectedEvent.location.zipCode}</>
                            )}
                          </p>
                        ) : (
                          <p>{selectedEventSummary?.locationName || 'Location TBD'}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedEvent?.description && (
                    <div className="event-modal-description">
                      <p>{selectedEvent.description}</p>
                    </div>
                  )}

                  {selectedEvent?.registrationUrl && (
                    <div className="event-modal-registration">
                      <a href={selectedEvent.registrationUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                        Register for Event
                      </a>
                    </div>
                  )}
                </div>
                <div className="event-modal-actions">
                  <a href={`/events/${selectedEvent?.id || selectedEventSummary?.id}`} className="btn btn-primary">
                    View Full Details
                  </a>
                  {!(selectedEvent?.isOnline || selectedEventSummary?.isOnline) && (
                    <a href="/visit" className="btn btn-outline">
                      <FontAwesomeIcon icon={faMapLocationDot} /> Get Directions
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="section cta-section events-cta">
        <div className="container container-narrow">
          <div className="cta-content">
            <h2>Join Us This Sunday</h2>
            <p>
              We&apos;d love to see you. Sundays at 10 AM.
            </p>
            <div className="cta-buttons">
              <a href="/visit" className="btn btn-primary">
                <FontAwesomeIcon icon={faMapLocationDot} /> Get Directions
              </a>
              <a href="/im-new" className="btn btn-outline-white">
                <FontAwesomeIcon icon={faCircleQuestion} /> First Time?
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

