import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { fetchTheocologyEpisodes } from "../../services/theocologyService";
import EpisodesListClient from "./EpisodesListClient";

// ISR: Revalidate every hour (same as episode pages)
export const revalidate = 3600;

export const metadata = {
  title: "All Episodes | Theocology Podcast",
  description: "Browse all episodes of Theocology, the podcast from ThriveFGCU exploring faith, doubt, identity, and community.",
};

export default async function TheocologyEpisodesPage() {
  let episodes: any[] = [];
  let error: string | null = null;

  try {
    episodes = await fetchTheocologyEpisodes();
  } catch (err) {
    console.error("Failed to load episodes:", err);
    error = "Failed to load episodes. Please try again later.";
  }

  return (
    <div className="page-wrapper">
      {/* Page Hero */}
      <section className="page-hero page-hero-theocology">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Theocology Episodes</h1>
          <p className="page-hero-subtitle">
            All episodes from the ThriveFGCU podcast
          </p>
        </div>
      </section>

      {/* Back Link */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <Link href="/ministries/college/podcast" className="episode-back-link">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to Theocology
          </Link>
        </div>
      </section>

      {/* Episodes List with Infinite Scroll */}
      <EpisodesListClient episodes={episodes} error={error} />

      {/* CTA Section */}
      <section className="section theocology-cta-section">
        <div className="container container-narrow">
          <div className="cta-content">
            <h2>Subscribe to Theocology</h2>
            <p>
              Never miss an episode. Subscribe on your favorite podcast platform.
            </p>
            <Link href="/ministries/college/podcast" className="btn btn-primary">
              Subscribe Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

