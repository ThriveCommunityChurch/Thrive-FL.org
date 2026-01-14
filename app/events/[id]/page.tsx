import { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getEventById } from "../../services/eventService";
import { EventJsonLd } from "../../components/JsonLd";
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

    // Use event image if available, otherwise use default OG image
    const ogImage = event.ImageUrl || "https://d2v6hk6f64og35.cloudfront.net/og-image.jpg";

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
            url: "https://d2v6hk6f64og35.cloudfront.net/og-image.jpg",
            width: 1200,
            height: 630,
            alt: "Thrive Community Church",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        images: ["https://d2v6hk6f64og35.cloudfront.net/og-image.jpg"],
      },
    };
  }
}

export default async function EventDetailPage({ params }: PageProps) {
  // Fetch event data for JSON-LD structured data
  let eventJsonLd = null;
  try {
    const response = await getEventById(params.id);
    const event = response.Event;
    if (event) {
      eventJsonLd = (
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
          url={`https://thrive-fl.org/events/${params.id}`}
        />
      );
    }
  } catch (error) {
    console.error('Error fetching event for JSON-LD:', error);
  }

  return (
    <div className="page-wrapper">
      {/* JSON-LD Structured Data for SEO */}
      {eventJsonLd}

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

