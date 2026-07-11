import { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getEventById } from "../../services/eventService";
import { EventJsonLd } from "../../components/JsonLd";
import EventDetailClient from "./EventDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

// ISR: Revalidate every 5 minutes (300 seconds)
// This caches individual event pages and refreshes data periodically
export const revalidate = 300;

// Generate dynamic metadata based on event data
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const response = await getEventById(id);
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
    const url = `https://thrive-fl.org/events/${id}`;

    // Format event date for display
    // Using timeZone 'UTC' because dates from the API are already in the correct
    // local time and should be displayed as-is without timezone conversion.
    const eventDate = new Date(event.StartTime);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    });

    // Use event image if available, otherwise use default OG image
    const ogImage = event.ImageUrl || "https://static.thrive-fl.org/og-image.jpg";

    return {
      title,
      description,
      openGraph: {
        title,
        description: `${formattedDate} - ${description}`,
        url,
        type: "website",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: event.Title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: `${formattedDate} - ${description}`,
        images: [ogImage],
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
      openGraph: {
        images: [
          {
            url: "https://static.thrive-fl.org/og-image.jpg",
            width: 1200,
            height: 630,
            alt: "Thrive Community Church",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        images: ["https://static.thrive-fl.org/og-image.jpg"],
      },
    };
  }
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Fetch the event once on the server. The same data feeds the JSON-LD,
  // is handed to the client component as initialEvent (so the title/body are
  // present in the SSR HTML), and — thanks to fetch request memoization — is
  // shared with generateMetadata rather than triggering a second request.
  let event = null;
  try {
    const response = await getEventById(id);
    event = response?.Event ?? null;
  } catch (error) {
    console.error('Error fetching event:', error);
  }

  return (
    <div className="page-wrapper--event-detail">
      {/* JSON-LD Structured Data for SEO */}
      {event && (
        <EventJsonLd
          name={event.Title}
          description={event.Summary || event.Description}
          startDate={event.StartTime}
          endDate={event.EndTime}
          location={event.Location ? {
            name: event.Location.Name,
            address: event.Location.Address,
            city: event.Location.City,
            state: event.Location.State,
            zipCode: event.Location.ZipCode,
          } : undefined}
          isOnline={event.IsOnline}
          onlineUrl={event.OnlineLink}
          url={`https://thrive-fl.org/events/${id}`}
        />
      )}

      {/* Breadcrumb */}
      <nav className="breadcrumb-nav">
        <div className="container">
          <Link href="/events" className="breadcrumb-link">
            <FontAwesomeIcon icon={faArrowLeft} />
            All Events
          </Link>
        </div>
      </nav>

      {/* Event Detail Content */}
      <section className="section event-detail-section">
        <div className="container">
          <EventDetailClient eventId={id} initialEvent={event} />
        </div>
      </section>
    </div>
  );
}

