"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCalendar,
  faCalendarCheck,
  faChurch,
  faClock,
  faEnvelope,
  faExclamationTriangle,
  faExternalLinkAlt,
  faGlobe,
  faLocationDot,
  faMapLocationDot,
  faPhone,
  faRepeat,
  faStar,
  faTag,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { Event, RecurrencePattern } from "../../types/events";
import {
  getEventById,
  getRecurrencePatternLabel,
  formatEventTime,
  formatEventDate,
  formatEventDateRange,
} from "../../services/eventService";

interface PageProps {
  params: { id: string };
}

export default function EventDetailPage({ params }: PageProps) {
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadEvent() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getEventById(params.id);
        if (response.hasErrors || !response.event) {
          setError(response.errorMessage || 'Event not found');
        } else {
          setEvent(response.event);
        }
      } catch (err) {
        console.error('Failed to load event:', err);
        setError('Failed to load event. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    loadEvent();
  }, [params.id]);

  // Format full event date/time display
  const getEventDateDisplay = () => {
    if (!event) return '';
    const startDate = new Date(event.startTime);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return startDate.toLocaleDateString('en-US', options);
  };

  const getEventTimeDisplay = () => {
    if (!event) return '';
    if (event.isAllDay) return 'All Day Event';
    return formatEventDateRange(event.startTime, event.endTime);
  };

  // Format recurrence description
  const getRecurrenceDescription = () => {
    if (!event?.isRecurring || !event.recurrence) return null;
    const pattern = getRecurrencePatternLabel(event.recurrence.pattern);
    let description = `Repeats ${pattern.toLowerCase()}`;
    if (event.recurrence.endDate) {
      const endDate = new Date(event.recurrence.endDate);
      description += ` until ${formatEventDate(event.recurrence.endDate)}`;
    }
    return description;
  };

  return (
    <div className="page-wrapper">
      {/* Breadcrumb */}
      <nav className="breadcrumb-nav">
        <div className="container">
          <a href="/events" className="breadcrumb-link">
            <FontAwesomeIcon icon={faArrowLeft} />
            All Events
          </a>
        </div>
      </nav>

      {/* Event Detail Content */}
      <section className="section event-detail-section">
        <div className="container">
          {error ? (
            <div className="event-error-state">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <h3>Unable to Load Event</h3>
              <p>{error}</p>
              <a href="/events" className="btn btn-primary">Back to Events</a>
            </div>
          ) : isLoading ? (
            <div className="event-detail-loading">
              <div className="event-header-skeleton">
                <div className="skeleton-icon skeleton-pulse"></div>
                <div className="skeleton-info">
                  <div className="skeleton-title skeleton-pulse"></div>
                  <div className="skeleton-meta skeleton-pulse"></div>
                  <div className="skeleton-summary skeleton-pulse"></div>
                </div>
              </div>
              <div className="skeleton-body skeleton-pulse"></div>
            </div>
          ) : event ? (
            <>
              {/* Event Header */}
              <div className="event-detail-header">
                <div className="event-detail-icon">
                  {event.isOnline ? (
                    <FontAwesomeIcon icon={faVideo} />
                  ) : (
                    <FontAwesomeIcon icon={faChurch} />
                  )}
                </div>
                <div className="event-detail-info">
                  <div className="event-detail-badges">
                    {event.isFeatured && (
                      <span className="event-badge featured">
                        <FontAwesomeIcon icon={faStar} /> Featured
                      </span>
                    )}
                    {event.isRecurring && (
                      <span className="event-badge recurring">
                        <FontAwesomeIcon icon={faRepeat} /> {getRecurrencePatternLabel(event.recurrence?.pattern || RecurrencePattern.None)}
                      </span>
                    )}
                    {event.isOnline && (
                      <span className="event-badge online">
                        <FontAwesomeIcon icon={faGlobe} /> Online Event
                      </span>
                    )}
                  </div>
                  <h1 className="event-detail-title">{event.title}</h1>
                  {event.summary && (
                    <p className="event-detail-summary">{event.summary}</p>
                  )}
                </div>
              </div>

              {/* Event Body */}
              <div className="event-detail-body">
                <div className="event-detail-main">
                  {/* Date & Time */}
                  <div className="event-detail-section">
                    <h2><FontAwesomeIcon icon={faCalendar} /> Date & Time</h2>
                    <p className="event-date-primary">{getEventDateDisplay()}</p>
                    <p className="event-time-primary">{getEventTimeDisplay()}</p>
                    {getRecurrenceDescription() && (
                      <p className="event-recurrence">
                        <FontAwesomeIcon icon={faRepeat} /> {getRecurrenceDescription()}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  {event.description && (
                    <div className="event-detail-section">
                      <h2>About This Event</h2>
                      <div className="event-description">
                        {event.description.split('\n').map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {event.tags && event.tags.length > 0 && (
                    <div className="event-detail-section">
                      <h2><FontAwesomeIcon icon={faTag} /> Tags</h2>
                      <div className="event-tags">
                        {event.tags.map((tag, idx) => (
                          <span key={idx} className="event-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <div className="event-detail-sidebar">
                  {/* Location / Online */}
                  <div className="event-sidebar-card">
                    {event.isOnline ? (
                      <>
                        <h3><FontAwesomeIcon icon={faGlobe} /> Online Event</h3>
                        {event.onlinePlatform && (
                          <p className="event-platform">{event.onlinePlatform}</p>
                        )}
                        {event.onlineLink && (
                          <a
                            href={event.onlineLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-block"
                          >
                            <FontAwesomeIcon icon={faExternalLinkAlt} /> Join Online
                          </a>
                        )}
                      </>
                    ) : event.location ? (
                      <>
                        <h3><FontAwesomeIcon icon={faLocationDot} /> Location</h3>
                        <div className="event-location">
                          {event.location.name && <p className="location-name">{event.location.name}</p>}
                          {event.location.address && <p>{event.location.address}</p>}
                          {event.location.city && event.location.state && (
                            <p>{event.location.city}, {event.location.state} {event.location.zipCode}</p>
                          )}
                        </div>
                        <a href="/visit" className="btn btn-outline btn-block">
                          <FontAwesomeIcon icon={faMapLocationDot} /> Get Directions
                        </a>
                      </>
                    ) : (
                      <>
                        <h3><FontAwesomeIcon icon={faLocationDot} /> Location</h3>
                        <p>Location details coming soon</p>
                      </>
                    )}
                  </div>

                  {/* Registration */}
                  {event.registrationUrl && (
                    <div className="event-sidebar-card">
                      <h3><FontAwesomeIcon icon={faCalendarCheck} /> Registration</h3>
                      <a
                        href={event.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-block"
                      >
                        Register for This Event
                      </a>
                    </div>
                  )}

                  {/* Contact */}
                  {(event.contactEmail || event.contactPhone) && (
                    <div className="event-sidebar-card">
                      <h3>Contact</h3>
                      {event.contactEmail && (
                        <a href={`mailto:${event.contactEmail}`} className="event-contact-link">
                          <FontAwesomeIcon icon={faEnvelope} /> {event.contactEmail}
                        </a>
                      )}
                      {event.contactPhone && (
                        <a href={`tel:${event.contactPhone}`} className="event-contact-link">
                          <FontAwesomeIcon icon={faPhone} /> {event.contactPhone}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </section>
    </div>
  );
}

