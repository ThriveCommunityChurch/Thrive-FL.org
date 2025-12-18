"use client";

import { useState } from "react";

// ============================================
// EVENT DATA TYPES & STRUCTURE
// This structure is designed to be easily replaced with API calls later
// ============================================
interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  time: string;
  recurring: boolean;
  recurrencePattern?: "weekly" | "monthly" | "yearly";
  recurrenceDay?: number; // 0 = Sunday, 1 = Monday, etc.
  date?: Date; // For one-time events
  color?: string;
  icon?: string;
}

// Hardcoded events - easily replaceable with API response
const EVENTS_DATA: Event[] = [
  {
    id: "sunday-worship",
    title: "Sunday Worship Service",
    description: "Join us for worship, teaching, and community. Thrive Kids available for ages 6 months to 12 years.",
    location: "20041 S Tamiami Trail #1, Estero, FL",
    time: "10:00 AM",
    recurring: true,
    recurrencePattern: "weekly",
    recurrenceDay: 0, // Sunday
    color: "primary",
    icon: "fa-solid fa-church",
  },
  {
    id: "christmas-eve-2025",
    title: "Christmas Eve Service",
    description: "Join us as we celebrate the birth of Jesus Christ.",
    location: "20041 S Tamiami Trail #1, Estero, FL",
    time: "5:00 PM",
    recurring: false,
    date: new Date(2025, 11, 24), // December 24, 2025
    color: "primary",
    icon: "fa-solid fa-tree",
  },
];

// Helper function to check if a date has an event
function getEventsForDate(date: Date, events: Event[]): Event[] {
  return events.filter((event) => {
    if (event.recurring && event.recurrencePattern === "weekly") {
      return date.getDay() === event.recurrenceDay;
    }
    if (event.date) {
      return (
        date.getFullYear() === event.date.getFullYear() &&
        date.getMonth() === event.date.getMonth() &&
        date.getDate() === event.date.getDate()
      );
    }
    return false;
  });
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
  const [viewMode, setViewMode] = useState<"month" | "list">("month");

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const today = new Date();

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
    const upcoming: { date: Date; event: Event }[] = [];
    const endDate = new Date(today);
    endDate.setMonth(endDate.getMonth() + 2);

    for (let d = new Date(today); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dayEvents = getEventsForDate(new Date(d), EVENTS_DATA);
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
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <h2 className="calendar-title">
                {MONTH_NAMES[currentMonth]} {currentYear}
              </h2>
              <button className="calendar-nav-btn" onClick={() => navigateMonth(1)} aria-label="Next month">
                <i className="fa-solid fa-chevron-right"></i>
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
                  <i className="fa-solid fa-calendar"></i> Month
                </button>
                <button
                  className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <i className="fa-solid fa-list"></i> List
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
                  const dayEvents = getEventsForDate(date, EVENTS_DATA);
                  const hasEvents = dayEvents.length > 0;

                  return (
                    <div
                      key={index}
                      className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isToday(date) ? 'today' : ''} ${hasEvents ? 'has-events' : ''}`}
                      onClick={() => hasEvents && setSelectedEvent(dayEvents[0])}
                    >
                      <span className="day-number">{date.getDate()}</span>
                      {hasEvents && (
                        <div className="day-events">
                          {dayEvents.map((event) => (
                            <div key={event.id} className={`event-dot event-${event.color}`}>
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
          {viewMode === 'list' && (
            <div className="events-list">
              <h3 className="events-list-title">Upcoming Events</h3>
              {getUpcomingEvents().map(({ date, event }, index) => (
                <div
                  key={`${event.id}-${index}`}
                  className="event-list-item"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="event-list-date">
                    <span className="event-list-day">{date.getDate()}</span>
                    <span className="event-list-month">{MONTH_NAMES[date.getMonth()].slice(0, 3)}</span>
                  </div>
                  <div className="event-list-content">
                    {event.icon && <i className={event.icon}></i>}
                    <h4>{event.title}</h4>
                    <p>
                      <i className="fa-solid fa-clock"></i> {event.time}
                      {event.recurring && <span className="recurring-badge"><i className="fa-solid fa-repeat"></i> Weekly</span>}
                    </p>
                  </div>
                  <div className="event-list-arrow">
                    <i className="fa-solid fa-chevron-right"></i>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="event-modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <button className="event-modal-close" onClick={() => setSelectedEvent(null)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="event-modal-header">
              {selectedEvent.recurring && (
                <span className="event-modal-badge">
                  <i className="fa-solid fa-repeat"></i> Recurring Event
                </span>
              )}              
              <h2>{selectedEvent.icon && <i className={selectedEvent.icon}></i>} {selectedEvent.title}</h2>
            </div>
            <div className="event-modal-body">
              <div className="event-modal-detail">
                <i className="fa-solid fa-clock"></i>
                <div>
                  <strong>Time</strong>
                  <p>{selectedEvent.time}</p>
                </div>
              </div>
              <div className="event-modal-detail">
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <strong>Location</strong>
                  <p>{selectedEvent.location}</p>
                </div>
              </div>
              <div className="event-modal-description">
                <p>{selectedEvent.description}</p>
              </div>
            </div>
            <div className="event-modal-actions">
              <a href="/visit" className="btn btn-primary">
                <i className="fa-solid fa-map-location-dot"></i> Get Directions
              </a>
            </div>
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
                <i className="fa-solid fa-map-location-dot"></i> Get Directions
              </a>
              <a href="/im-new" className="btn btn-outline-white">
                <i className="fa-solid fa-circle-question"></i> First Time?
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

