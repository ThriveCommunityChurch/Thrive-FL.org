"use client";

import { useState, useEffect } from "react";
import SermonSeriesGrid from "../components/sermons/SermonSeriesGrid";
import { getAllSermons } from "../services/sermonService";
import { SermonSeriesSummary } from "../types/sermons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

export default function SermonsPage() {
  const [series, setSeries] = useState<SermonSeriesSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSermons() {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getAllSermons();
        setSeries(response.Summaries);
      } catch (err) {
        console.error('Failed to load sermons:', err);
        setError('Failed to load sermons. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    loadSermons();
  }, []);

  return (
    <div className="page-wrapper">
      {/* Page Hero Section */}
      <section className="page-hero page-hero-sermons">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Sermon Series</h1>
          <p className="page-hero-subtitle">
            Explore our teaching series and grow in your faith
          </p>
        </div>
      </section>

      {/* Sermons Content Section */}
      <section className="section sermons-section">
        <div className="container">
          {error ? (
            <div className="sermon-error-state">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <h3>Unable to Load Sermons</h3>
              <p>{error}</p>
              <button
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : (
            <SermonSeriesGrid series={series} isLoading={isLoading} />
          )}
        </div>
      </section>

      {/* Watch Live CTA */}
      <section className="section sermons-cta-section">
        <div className="container">
          <div className="sermons-cta-content">
            <div className="sermons-cta-text">
              <h2>Can&apos;t Join Us In Person?</h2>
              <p>Watch our services live every Sunday at 10 AM or catch up on past messages.</p>
            </div>
            <a
              href="https://www.youtube.com/channel/UC47Nme86YGrVy1lY15rF3ig"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <FontAwesomeIcon icon={faYoutube} />
              Watch on YouTube
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

