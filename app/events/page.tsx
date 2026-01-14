import { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { getAllEvents } from "../services/eventService";
import { EventSummary } from "../types/events";
import EventsClient from "./EventsClient";

export const metadata: Metadata = {
  title: "Events & Gatherings | Thrive Community Church",
  description: "Find upcoming events and gatherings at Thrive Community Church in Estero, FL. Join us for worship, community events, and special gatherings.",
  openGraph: {
    title: "Events & Gatherings | Thrive Community Church",
    description: "Find upcoming events and gatherings at Thrive Community Church.",
    url: "https://thrive-fl.org/events",
    images: [
      {
        url: "https://d2v6hk6f64og35.cloudfront.net/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Thrive Community Church",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Events & Gatherings | Thrive Community Church",
    description: "Find upcoming events and gatherings at Thrive Community Church.",
    images: ["https://d2v6hk6f64og35.cloudfront.net/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thrive-fl.org/events",
  },
};

export default async function EventsPage() {
  // Fetch events on the server for SEO
  let initialEvents: EventSummary[] = [];
  try {
    const response = await getAllEvents(false);
    initialEvents = response.Events || [];
  } catch (error) {
    console.error('Failed to fetch events on server:', error);
  }

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
          <EventsClient initialEvents={initialEvents} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section events-cta">
        <div className="container container-narrow">
          <div className="cta-content">
            <h2>Join Us This Sunday</h2>
            <p>
              We&apos;d love to see you. Sundays at 10 AM.
            </p>
            <div className="cta-buttons">
              <a href="https://maps.app.goo.gl/CiLFFrfovhkcfewq8" className="btn btn-primary">
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

