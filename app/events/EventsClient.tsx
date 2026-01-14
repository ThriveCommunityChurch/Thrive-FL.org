"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faChevronLeft,
  faChevronRight,
  faChurch,
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
} from "@fortawesome/free-solid-svg-icons";
import {
  EventSummary,
  Event,
} from "../types/events";
import {
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

interface EventsClientProps {
  initialEvents: EventSummary[];
}

export default function EventsClient({ initialEvents }: EventsClientProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedEventSummary, setSelectedEventSummary] = useState<EventSummary | null>(null);
  const [viewMode, setViewMode] = useState<"month" | "list">("month");
  const [events] = useState<EventSummary[]>(initialEvents);
  const [loadingEventDetails, setLoadingEventDetails] = useState(false);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const today = new Date();

  // Fetch full event details when an event is clicked
  const handleEventClick = async (eventSummary: EventSummary) => {
    setSelectedEventSummary(eventSummary);
    setLoadingEventDetails(true);
    try {
      const response = await getEventById(eventSummary.Id);
      if (response.Event) {
        setSelectedEvent(response.Event);
      }
    } catch (err) {
      console.error('Failed to fetch event details:', err);
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
    <>
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

      {/* Month View */}
      {viewMode === 'month' && (
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
                        <div key={event.Id} className={`event-dot ${event.IsFeatured ? 'event-featured' : 'event-primary'}`}>
                          <span className="event-preview">{event.Title}</span>
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
      {viewMode === 'list' && (
        <div className="events-list">
          <h3 className="events-list-title">Upcoming Events</h3>
          {events.length === 0 ? (
            <div className="events-empty">
              <p>No upcoming events at this time. Check back soon!</p>
            </div>
          ) : (
            getUpcomingEvents().map(({ date, event }, index) => (
              <div
                key={`${event.Id}-${index}`}
                className="event-list-item"
                onClick={() => handleEventClick(event)}
              >
                <div className="event-list-date">
                  <span className="event-list-day">{date.getDate()}</span>
                  <span className="event-list-month">{MONTH_NAMES[date.getMonth()].slice(0, 3)}</span>
                </div>
                <div className="event-list-content">
                  {event.IsOnline ? (
                    <FontAwesomeIcon icon={faVideo} />
                  ) : (
                    <FontAwesomeIcon icon={faChurch} />
                  )}
                  {event.IsFeatured && <FontAwesomeIcon icon={faStar} className="featured-star" />}
                  <h4>{event.Title}</h4>
                  <p>
                    <FontAwesomeIcon icon={faClock} /> {formatEventTime(event.StartTime)}
                    {event.IsRecurring && (
                      <span className="recurring-badge">
                        <FontAwesomeIcon icon={faRepeat} /> {getRecurrencePatternLabel(event.RecurrencePattern)}
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
                  <div className="event-modal-badges">
                    {(selectedEvent?.IsRecurring || selectedEventSummary?.IsRecurring) && (
                      <span className="event-modal-badge">
                        <FontAwesomeIcon icon={faRepeat} /> Recurring Event
                      </span>
                    )}
                    {(selectedEvent?.IsFeatured || selectedEventSummary?.IsFeatured) && (
                      <span className="event-modal-badge featured">
                        <FontAwesomeIcon icon={faStar} /> Featured
                      </span>
                    )}
                  </div>
                  <div className="event-modal-title-row">
                    <div className="event-modal-icon">
                      {(selectedEvent?.IsOnline || selectedEventSummary?.IsOnline) ? (
                        <FontAwesomeIcon icon={faVideo} />
                      ) : (
                        <FontAwesomeIcon icon={faChurch} />
                      )}
                    </div>
                    <h2>{selectedEvent?.Title || selectedEventSummary?.Title}</h2>
                  </div>
                  {selectedEvent?.Summary && (
                    <p className="event-modal-summary">{selectedEvent.Summary}</p>
                  )}
                </div>
                <div className="event-modal-body">
                  <div className="event-modal-details-grid">
                    <div className="event-modal-detail">
                      <FontAwesomeIcon icon={faClock} />
                      <div>
                        <strong>Time</strong>
                        <p>{formatEventTime(selectedEvent?.StartTime || selectedEventSummary?.StartTime || '')}</p>
                      </div>
                    </div>

                    {(selectedEvent?.IsOnline || selectedEventSummary?.IsOnline) ? (
                      <div className="event-modal-detail">
                        <FontAwesomeIcon icon={faGlobe} />
                        <div>
                          <strong>Online Event</strong>
                          {selectedEvent?.OnlinePlatform && <p>{selectedEvent.OnlinePlatform}</p>}
                          {selectedEvent?.OnlineLink && (
                            <a href={selectedEvent.OnlineLink} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">
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
                          {selectedEvent?.Location && (selectedEvent.Location.Name || selectedEvent.Location.Address) ? (
                            <p>
                              {selectedEvent.Location.Name && <>{selectedEvent.Location.Name}<br /></>}
                              {selectedEvent.Location.Address && <>{selectedEvent.Location.Address}<br /></>}
                              {selectedEvent.Location.City && selectedEvent.Location.State && (
                                <>{selectedEvent.Location.City}, {selectedEvent.Location.State} {selectedEvent.Location.ZipCode}</>
                              )}
                            </p>
                          ) : (
                            <p>{selectedEventSummary?.LocationName || 'Thrive Community Church'}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {selectedEvent?.Description && (
                    <div className="event-modal-description">
                      <p>{selectedEvent.Description}</p>
                    </div>
                  )}

                  {selectedEvent?.RegistrationUrl && (
                    <div className="event-modal-registration">
                      <a href={selectedEvent.RegistrationUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-block">
                        Register for Event
                      </a>
                    </div>
                  )}
                </div>
                <div className="event-modal-actions">
                  <a href={`/events/${selectedEvent?.Id || selectedEventSummary?.Id}`} className="btn btn-primary btn-block">
                    View Full Details
                  </a>
                  {!(selectedEvent?.IsOnline || selectedEventSummary?.IsOnline) && (
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=20041+S+Tamiami+Trail+%231+Estero+FL+33928"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-block"
                    >
                      <FontAwesomeIcon icon={faMapLocationDot} /> Get Directions
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

