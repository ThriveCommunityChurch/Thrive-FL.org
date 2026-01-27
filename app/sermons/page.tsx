import SermonFilters from "../components/sermons/SermonFilters";
import { getAllSermons } from "../services/sermonService";
import { SermonSeriesSummary } from "../types/sermons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faPodcast } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

// ISR: Revalidate every 5 minutes (300 seconds)
// Metadata is defined in layout.tsx for this route
export const revalidate = 300;

export default async function SermonsPage() {
  let series: SermonSeriesSummary[] = [];
  let error: string | null = null;

  try {
    const response = await getAllSermons();
    series = response.Summaries;
  } catch (err) {
    console.error('Failed to load sermons:', err);
    error = 'Failed to load sermons. Please try again later.';
  }

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
              <Link href="/sermons" className="btn btn-primary">
                Try Again
              </Link>
            </div>
          ) : (
            <SermonFilters series={series} />
          )}
        </div>
      </section>

      {/* Watch Live CTA */}
      <section className="section sermons-cta-section">
        <div className="container">
          <div className="sermons-cta-content">
            <div className="sermons-cta-text">
              <h3>Can&apos;t Join Us In Person?</h3>
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

      {/* Podcast CTA */}
      <section className="section sermons-cta-section" style={{ background: 'var(--color-gray-50)' }}>
        <div className="container">
          <div className="sermons-cta-content">
            <div className="sermons-cta-text">
              <h3>Listen On The Go</h3>
              <p>Subscribe to our podcast and never miss a message. Available on Apple Podcasts, Spotify, and more.</p>
            </div>
            <Link href="/podcast" className="btn btn-primary">
              <FontAwesomeIcon icon={faPodcast} />
              Subscribe to Podcast
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

