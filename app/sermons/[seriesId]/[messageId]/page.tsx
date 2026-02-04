import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import MessageDetailClient from "./MessageDetailClient";
import { getSeriesById, getMessageTranscript, formatSermonDate, formatDuration } from "../../../services/sermonService";
import { SermonMessageJsonLd } from "../../../components/JsonLd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faExclamationTriangle, faUser, faBook } from "@fortawesome/free-solid-svg-icons";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";

interface PageProps {
  params: Promise<{ seriesId: string; messageId: string }>;
}

// ISR: Revalidate every 5 minutes (300 seconds)
export const revalidate = 300;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { seriesId, messageId } = await params;

  try {
    const series = await getSeriesById(seriesId);
    const message = series.Messages.find(m => m.MessageId === messageId);

    if (!message) {
      return {
        title: "Message Not Found | Thrive Community Church",
        description: "The requested sermon message could not be found.",
      };
    }

    const description = message.Summary
      ? message.Summary.slice(0, 160)
      : `Listen to "${message.Title}" by ${message.Speaker} from the "${series.Name}" series at Thrive Community Church.`;

    return {
      title: `${message.Title} | ${series.Name} | Thrive Community Church`,
      description,
      openGraph: {
        title: `${message.Title} | Thrive Community Church`,
        description,
        url: `https://thrive-fl.org/sermons/${seriesId}/${messageId}`,
        images: series.ArtUrl ? [
          {
            url: series.ArtUrl,
            width: 800,
            height: 800,
            alt: series.Name,
          },
        ] : undefined,
      },
    };
  } catch {
    return {
      title: "Sermon Message | Thrive Community Church",
      description: "Listen to sermon messages from Thrive Community Church in Estero, FL.",
    };
  }
}

export default async function MessageDetailPage({ params }: PageProps) {
  const { seriesId, messageId } = await params;

  let series = null;
  let message = null;
  let transcript = null;
  let error: string | null = null;

  try {
    series = await getSeriesById(seriesId);
    message = series.Messages.find(m => m.MessageId === messageId);
    
    if (!message) {
      notFound();
    }

    // Fetch transcript (includes notes if available)
    transcript = await getMessageTranscript(messageId);
  } catch (err) {
    console.error('Failed to load message:', err);
    error = 'Failed to load message. Please try again later.';
  }

  if (!series || !message) {
    if (!error) notFound();
  }

  const formattedDate = message ? formatSermonDate(message.Date) : '';
  const duration = message ? formatDuration(message.AudioDuration) : '';

  // Generate Bible Gateway link for passage reference
  const getBibleGatewayUrl = (passage: string) => {
    const encodedPassage = encodeURIComponent(passage);
    return `https://www.biblegateway.com/passage/?search=${encodedPassage}&version=ESV`;
  };

  return (
    <div className="page-wrapper">
      {/* JSON-LD Structured Data for SEO */}
      {series && message && (
        <SermonMessageJsonLd
          seriesId={seriesId}
          seriesName={series.Name}
          messageId={messageId}
          title={message.Title}
          speaker={message.Speaker}
          date={message.Date}
          summary={message.Summary}
          passageRef={message.PassageRef}
          audioUrl={message.AudioUrl}
          audioDuration={message.AudioDuration}
          videoUrl={message.VideoUrl}
          image={series.ArtUrl || series.Thumbnail}
          transcript={transcript?.FullText}
        />
      )}

      {/* Breadcrumb */}
      <nav className="breadcrumb-nav">
        <div className="container">
          <Link href={`/sermons/${seriesId}`} className="breadcrumb-link">
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to {series?.Name || 'Series'}
          </Link>
        </div>
      </nav>

      {/* Message Detail Content */}
      <section className="section series-detail-section">
        <div className="container">
          {error ? (
            <div className="sermon-error-state">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <h3>Unable to Load Message</h3>
              <p>{error}</p>
              <Link href="/sermons" className="btn btn-primary">Back to Sermons</Link>
            </div>
          ) : series && message ? (
            <>
              {/* Message Header - same structure as series-detail-header */}
              <div className="series-detail-header">
                <div className="series-detail-artwork">
                  <Image
                    src={series.ArtUrl || series.Thumbnail}
                    alt={series.Name}
                    width={400}
                    height={400}
                    style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                    unoptimized
                  />
                </div>
                <div className="series-detail-info">
                  <p className="message-detail__series-name">{series.Name}</p>
                  <h1 className="series-detail-title">{message.Title}</h1>
                  <p className="series-detail-meta">
                    <span className="series-detail-date">
                      <FontAwesomeIcon icon={faUser} />
                      {message.Speaker}
                    </span>
                    {formattedDate && (
                      <span className="series-detail-date">
                        <FontAwesomeIcon icon={faCalendar} />
                        {formattedDate}
                      </span>
                    )}
                    {duration && duration !== '--:--' && (
                      <span className="series-detail-count">
                        <FontAwesomeIcon icon={faClock} />
                        {duration}
                      </span>
                    )}
                  </p>
                  {message.PassageRef && (
                    <a
                      href={getBibleGatewayUrl(message.PassageRef)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="message-detail__passage-link"
                    >
                      <FontAwesomeIcon icon={faBook} />
                      {message.PassageRef}
                    </a>
                  )}
                  {message.Summary && (
                    <p className="series-detail-summary">{message.Summary}</p>
                  )}
                </div>
              </div>

              {/* Interactive Content - Client Component */}
              <MessageDetailClient
                message={message}
                series={series}
                transcript={transcript}
              />
            </>
          ) : null}
        </div>
      </section>
    </div>
  );
}

