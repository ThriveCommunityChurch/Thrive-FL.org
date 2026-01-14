import { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getEventById, formatEventDate } from "../../services/eventService";
import EventDetailClient from "./EventDetailClient";

interface PageProps {
  params: { id: string };
}

// Generate dynamic metadata based on event data
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const response = await getEventById(params.id);
    const event = response.Event;

    if (!event) {
      return {
        title: "Event Not Found | Thrive Community Church",
        description: "The requested event could not be found.",
      };
    }

    const title = `${event.Title} | Thrive Community Church`;
    const description = event.Summary || event.Description?.substring(0, 160) ||
      `Join us for ${event.Title} at Thrive Community Church in Estero, FL.`;
    const url = `https://thrive-fl.org/events/${params.id}`;

    // Format event date for display
    const eventDate = new Date(event.StartTime);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return {
      title,
      description,
      openGraph: {
        title,
        description: `${formattedDate} - ${description}`,
        url,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: `${formattedDate} - ${description}`,
      },
      alternates: {
        canonical: url,
      },
    };
  } catch (error) {
    console.error('Error generating metadata for event:', error);
    return {
      title: "Event Details | Thrive Community Church",
      description: "View event details at Thrive Community Church in Estero, FL.",
    };
  }
}

export default async function EventDetailPage({ params }: PageProps) {
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
          <EventDetailClient eventId={params.id} />
        </div>
      </section>
    </div>
  );
}

