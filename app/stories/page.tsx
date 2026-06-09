// app/stories/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlay, faHeadphones } from "@fortawesome/free-solid-svg-icons";
import { getActiveStories } from "./content/stories";

export const metadata: Metadata = {
  title: "Stories | Thrive Community Church",
  description: "Why Thrive? Real stories from people who found family, faith, and belonging at Thrive Community Church in Estero, FL.",
  openGraph: {
    title: "Stories | Thrive Community Church",
    description: "Why Thrive? Real stories of life change and belonging from our church family.",
    url: "https://thrive-fl.org/stories",
  },
};

export default function StoriesPage() {
  const stories = getActiveStories();

  return (
    <div className="page-wrapper">
      <section className="page-hero page-hero-stories">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Stories</h1>
          <p className="page-hero-subtitle">Why Thrive?</p>
        </div>
      </section>

      <section className="section stories-section">
        <div className="container">
          <div className="stories-grid">
            {stories.map((story, index) => (
              <Link
                key={story.slug}
                href={`/stories/${story.slug}`}
                className="story-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="story-card__content">
                  <span className="story-card__badge">
                    <FontAwesomeIcon icon={story.youtubeId ? faPlay : faHeadphones} />
                    {story.youtubeId ? "Watch" : "Listen"}
                  </span>
                  <h2 className="story-card__title">{story.title}</h2>
                  <p className="story-card__name">{story.name}</p>
                  <p className="story-card__summary">{story.summary}</p>
                  <span className="story-card__action">
                    Read Story
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
