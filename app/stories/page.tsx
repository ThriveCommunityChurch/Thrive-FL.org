// app/stories/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Stories | Thrive Community Church",
    description:
      "Why Thrive? Real stories of life change, family, and belonging from people in our church family.",
    url: "https://thrive-fl.org/stories",
    isPartOf: {
      "@type": "WebSite",
      name: "Thrive Community Church",
      url: "https://thrive-fl.org",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: stories.map((story, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://thrive-fl.org/stories/${story.slug}`,
        name: `${story.name}: ${story.title}`,
      })),
    },
  };

  return (
    <div className="page-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="page-hero page-hero-stories">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <p className="page-hero-eyebrow">Why Thrive?</p>
          <h1 className="page-hero-title">Stories</h1>
          <p className="page-hero-subtitle">
            Hear from the people who found family, faith, and a place to belong here.
          </p>
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
