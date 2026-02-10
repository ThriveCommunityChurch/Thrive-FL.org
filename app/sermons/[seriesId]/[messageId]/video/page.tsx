import { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { getSeriesById, formatSermonDate } from "../../../../services/sermonService";
import { VideoWatchPageJsonLd } from "../../../../components/JsonLd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBook, faLayerGroup, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import VideoWatchClient from "./VideoWatchClient";

interface PageProps {
  params: Promise<{ seriesId: string; messageId: string }>;
}

// ISR: Revalidate every 5 minutes (300 seconds)
export const revalidate = 300;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { seriesId, messageId } = await params;

  const series = await getSeriesById(seriesId);
  const message = series.Messages.find(m => m.MessageId === messageId);

  // If no message or no video, the page component will handle redirect/404
  if (!message || !message.VideoUrl) {
    return {};
  }

  const description = message.Summary
    ? message.Summary.slice(0, 160)
    : `Watch "${message.Title}" by ${message.Speaker} from the "${series.Name}" series at Thrive Community Church.`;

  return {
    title: `${message.Title} - Video | Thrive Community Church`,
    description,
    openGraph: {
      title: `${message.Title} - Video`,
      description,
      type: "video.other",
      url: `https://thrive-fl.org/sermons/${seriesId}/${messageId}/video`,
      images: [{ url: series.ArtUrl || series.Thumbnail }],
    },
  };
}

// Convert YouTube URL to embed format
function getYouTubeEmbedUrl(url: string): string {
  if (url.includes("youtube.com/watch?v=")) {
    return url.replace("watch?v=", "embed/");
  } else if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
}

export default async function VideoWatchPage({ params }: PageProps) {
  const { seriesId, messageId } = await params;

  let series = null;
  let message = null;

  try {
    series = await getSeriesById(seriesId);
    message = series.Messages.find(m => m.MessageId === messageId);

    if (!message) {
      notFound();
    }

    // If no video, redirect to the message page
    if (!message.VideoUrl) {
      redirect(`/sermons/${seriesId}/${messageId}`);
    }
  } catch {
    notFound();
  }

  if (!series || !message) {
    notFound();
  }

  return (
    <div className="page-wrapper">
      {/* JSON-LD Structured Data - VideoObject as primary */}
      <VideoWatchPageJsonLd
        seriesId={seriesId}
        seriesName={series.Name}
        messageId={messageId}
        title={message.Title}
        speaker={message.Speaker}
        date={message.Date}
        summary={message.Summary}
        videoUrl={message.VideoUrl}
        audioDuration={message.AudioDuration}
        image={series.ArtUrl || series.Thumbnail}
      />

      {/* Video Watch Page Content - Minimal content to signal VIDEO as PRIMARY purpose */}
      <section className="video-watch-section">
        <div className="container">
          {/* Breadcrumb Links */}
          <div className="video-watch-breadcrumb">
            <Link href={`/sermons/${seriesId}`} className="video-watch-breadcrumb-link">
              <FontAwesomeIcon icon={faLayerGroup} />
              <span className="video-watch-breadcrumb-text-full">{series.Name} Series</span>
              <span className="video-watch-breadcrumb-text-short">Series</span>
            </Link>
            <span className="video-watch-breadcrumb-divider">|</span>
            <Link href={`/sermons/${seriesId}/${messageId}`} className="video-watch-breadcrumb-link">
              <FontAwesomeIcon icon={faMicrophone} />
              <span className="video-watch-breadcrumb-text-full">View Message</span>
              <span className="video-watch-breadcrumb-text-short">Message</span>
            </Link>
          </div>

          {/* Video Player - PRIMARY CONTENT */}
          <div className="video-watch-player">
            <div className="video-watch-container">
              <iframe
                src={getYouTubeEmbedUrl(message.VideoUrl!)}
                title={message.Title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Video Info - Minimal metadata */}
          <div className="video-watch-info">
            <h1 className="video-watch-title">{message.Title}</h1>

            <div className="video-watch-meta">
              <span className="video-watch-meta-item">
                <FontAwesomeIcon icon={faUser} />
                {message.Speaker}
              </span>
              {message.Date && (
                <span className="video-watch-meta-item">
                  <FontAwesomeIcon icon={faCalendar} />
                  {formatSermonDate(message.Date)}
                </span>
              )}
              {message.PassageRef && (
                <span className="video-watch-meta-item">
                  <FontAwesomeIcon icon={faBook} />
                  {message.PassageRef}
                </span>
              )}
            </div>

            {/* Download transcript button - fetches client-side, no text in HTML */}
            <VideoWatchClient
              messageId={messageId}
              messageTitle={message.Title}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

