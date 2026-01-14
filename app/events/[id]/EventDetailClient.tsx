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
  formatEventDate,
  formatEventDateRange,
} from "../../services/eventService";

interface EventDetailClientProps {
  eventId: string;
  initialEvent?: Event | null;
}

export default function EventDetailClient({ eventId, initialEvent }: EventDetailClientProps) {
  const [event, setEvent] = useState<Event | null>(initialEvent || null);
  const [isLoading, setIsLoading] = useState(!initialEvent);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Skip fetch if we have initial data
    if (initialEvent) return;

    async function loadEvent() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getEventById(eventId);
        if (!response.Event) {
          setError('Event not found');
        } else {
          setEvent(response.Event);
        }
      } catch (err) {
        console.error('Failed to load event:', err);
        setError('Failed to load event. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    loadEvent();
  }, [eventId, initialEvent]);

  // Format full event date/time display
  const getEventDateDisplay = () => {
    if (!event) return '';
    const startDate = new Date(event.StartTime);
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
    if (event.IsAllDay) return 'All Day Event';
    return formatEventDateRange(event.StartTime, event.EndTime);
  };

  // Format recurrence description
  const getRecurrenceDescription = () => {
    if (!event?.IsRecurring || !event.Recurrence) return null;
    const pattern = getRecurrencePatternLabel(event.Recurrence.Pattern);
    let description = `Repeats ${pattern.toLowerCase()}`;
    if (event.Recurrence.EndDate) {
      description += ` until ${formatEventDate(event.Recurrence.EndDate)}`;
    }
    return description;
  };

  if (error) {
    return (
      <div className="event-error-state">
        <FontAwesomeIcon icon={faExclamationTriangle} />
        <h3>Unable to Load Event</h3>
        <p>{error}</p>
        <a href="/events" className="btn btn-primary">Back to Events</a>
      </div>
    );
  }

  if (isLoading) {
    return (
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
    );
  }

  if (!event) return null;

  return (
    <>
      {/* Event Header */}
      <div className="event-detail-header">
        <div className="event-detail-icon">
          {event.IsOnline ? (
            <FontAwesomeIcon icon={faVideo} />
          ) : (
            <FontAwesomeIcon icon={faChurch} />
          )}
        </div>
        <div className="event-detail-info">
          <div className="event-detail-badges">
            {event.IsFeatured && (
              <span className="event-badge featured">
                <FontAwesomeIcon icon={faStar} /> Featured
              </span>
            )}
            {event.IsRecurring && (
              <span className="event-badge recurring">
                <FontAwesomeIcon icon={faRepeat} /> {getRecurrencePatternLabel(event.Recurrence?.Pattern || RecurrencePattern.None)}
              </span>
            )}
            {event.IsOnline && (
              <span className="event-badge online">
                <FontAwesomeIcon icon={faGlobe} /> Online Event
              </span>
            )}
          </div>
          <h1 className="event-detail-title">{event.Title}</h1>
          {event.Summary && (
            <p className="event-detail-summary">{event.Summary}</p>
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
          {event.Description && (
            <div className="event-detail-section">
              <h2>About This Event</h2>
              <div className="event-description">
                {event.Description.split('\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {event.Tags && event.Tags.length > 0 && (
            <div className="event-detail-section">
              <h2><FontAwesomeIcon icon={faTag} /> Tags</h2>
              <div className="event-tags">
                {event.Tags.map((tag, idx) => (
                  <span key={idx} className="event-tag">{tag}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="event-detail-sidebar">
          {/* Location / Online */}
          <div className="event-sidebar-card location-card">
            {event.IsOnline ? (
              <>
                <h3><FontAwesomeIcon icon={faGlobe} /> Online Event</h3>
                {event.OnlinePlatform && (
                  <p className="event-platform">{event.OnlinePlatform}</p>
                )}
                {event.OnlineLink && (
                  <a
                    href={event.OnlineLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-block"
                  >
                    <FontAwesomeIcon icon={faExternalLinkAlt} /> Join Online
                  </a>
                )}
              </>
            ) : (
              <>
                <h3><FontAwesomeIcon icon={faLocationDot} /> Location</h3>
                <div className="event-location">
                  {event.Location?.Name ? (
                    <p className="location-name">{event.Location.Name}</p>
                  ) : (
                    <p className="location-name">Thrive Community Church</p>
                  )}
                  {event.Location?.Address ? (
                    <p>{event.Location.Address}</p>
                  ) : (
                    <p>20041 South Tamiami Trail #1</p>
                  )}
                  {event.Location?.City && event.Location?.State ? (
                    <p>{event.Location.City}, {event.Location.State} {event.Location.ZipCode}</p>
                  ) : (
                    <p>Estero, FL 33928</p>
                  )}
                </div>

                {/* Google Maps Embed */}
                <div className="event-location-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.5254861155793!2d-81.79383368496773!3d26.430716583316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88db1e96b252b90b%3A0x8d9d8a0b0c8a8a8a!2s20041%20S%20Tamiami%20Trail%20%231%2C%20Estero%2C%20FL%2033928!5e0!3m2!1sen!2sus!4v1640000000000!5m2!1sen!2sus"
                    width="100%"
                    height="180"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Event Location Map"
                  />
                </div>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=20041+S+Tamiami+Trail+%231+Estero+FL+33928"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-block"
                >
                  <FontAwesomeIcon icon={faMapLocationDot} /> Get Directions
                </a>
              </>
            )}
          </div>

          {/* Registration */}
          {event.RegistrationUrl && (
            <div className="event-sidebar-card">
              <h3><FontAwesomeIcon icon={faCalendarCheck} /> Registration</h3>
              <a
                href={event.RegistrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-block"
              >
                Register for This Event
              </a>
            </div>
          )}

          {/* Contact */}
          {(event.ContactEmail || event.ContactPhone) && (
            <div className="event-sidebar-card">
              <h3>Contact</h3>
              {event.ContactEmail && (
                <a href={`mailto:${event.ContactEmail}`} className="event-contact-link">
                  <FontAwesomeIcon icon={faEnvelope} /> {event.ContactEmail}
                </a>
              )}
              {event.ContactPhone && (
                <a href={`tel:${event.ContactPhone}`} className="event-contact-link">
                  <FontAwesomeIcon icon={faPhone} /> {event.ContactPhone}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

