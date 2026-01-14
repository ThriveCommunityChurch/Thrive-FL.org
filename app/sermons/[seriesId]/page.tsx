import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import SeriesDetailClient from "./SeriesDetailClient";
import { getSeriesById, formatSeriesDateRange } from "../../services/sermonService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faExclamationTriangle,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

interface PageProps {
  params: Promise<{ seriesId: string }>;
}

// ISR: Revalidate every 5 minutes (300 seconds)
export const revalidate = 300;

// Generate dynamic metadata based on series data
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { seriesId } = await params;

  try {
    const series = await getSeriesById(seriesId);

    const description = series.Summary
      ? series.Summary.slice(0, 160)
      : `Listen to "${series.Name}" sermon series from Thrive Community Church. ${series.Messages.length} messages of biblical teaching.`;

    return {
      title: `${series.Name} | Sermons | Thrive Community Church`,
      description,
      openGraph: {
        title: `${series.Name} | Thrive Community Church`,
        description,
        url: `https://thrive-fl.org/sermons/${seriesId}`,
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
      title: "Sermon Series | Thrive Community Church",
      description: "Listen to sermon series from Thrive Community Church in Estero, FL.",
    };
  }
}

export default async function SeriesDetailPage({ params }: PageProps) {
  const { seriesId } = await params;

  let series = null;
  let error: string | null = null;

  try {
    series = await getSeriesById(seriesId);
  } catch (err) {
    console.error('Failed to load series:', err);
    error = 'Failed to load series. Please try again later.';
  }

  if (!series && !error) {
    notFound();
  }

  const dateRange = series ? formatSeriesDateRange(series.StartDate, series.EndDate) : '';
  const isOngoing = series && !series.EndDate;

  return (
    <div className="page-wrapper">
      {/* Breadcrumb */}
      <nav className="breadcrumb-nav">
        <div className="container">
          <Link href="/sermons" className="breadcrumb-link">
            <FontAwesomeIcon icon={faArrowLeft} />
            All Series
          </Link>
        </div>
      </nav>

      {/* Series Detail Content */}
      <section className="section series-detail-section">
        <div className="container">
          {error ? (
            <div className="sermon-error-state">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <h3>Unable to Load Series</h3>
              <p>{error}</p>
              <Link href="/sermons" className="btn btn-primary">Back to Sermons</Link>
            </div>
          ) : series ? (
            <>
              {/* Series Header */}
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
                  {isOngoing && (
                    <span className="series-badge series-badge--current">Current Series</span>
                  )}
                </div>
                <div className="series-detail-info">
                  <h1 className="series-detail-title">{series.Name}</h1>
                  <p className="series-detail-meta">
                    <span className="series-detail-date">
                      <FontAwesomeIcon icon={faCalendar} />
                      {dateRange}
                    </span>
                    <span className="series-detail-count">
                      <FontAwesomeIcon icon={faMicrophone} />
                      {series.Messages.length} {series.Messages.length === 1 ? 'Message' : 'Messages'}
                    </span>
                  </p>
                  {series.Summary && (
                    <p className="series-detail-summary">{series.Summary}</p>
                  )}
                </div>
              </div>
              {/* Messages List - Client Component for interactivity */}
              <SeriesDetailClient series={series} />
            </>
          ) : null}
        </div>
      </section>
    </div>
  );
}

