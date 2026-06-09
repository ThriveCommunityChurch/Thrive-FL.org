// app/stories/[slug]/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { getActiveStories, getStoryBySlug } from "../content/stories";
import StoryMedia from "./StoryMedia";
import StoryTranscript from "./StoryTranscript";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getActiveStories().map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    return { title: "Story | Thrive Community Church" };
  }

  const description = story.summary.slice(0, 160);
  const ogImage =
    story.imageUrl ??
    (story.youtubeId
      ? `https://i.ytimg.com/vi/${story.youtubeId}/hqdefault.jpg`
      : "https://static.thrive-fl.org/og-image.jpg");

  return {
    title: `${story.name}: ${story.title} | Stories | Thrive Community Church`,
    description,
    openGraph: {
      title: `${story.name} — Why Thrive?`,
      description,
      url: `https://thrive-fl.org/stories/${slug}`,
      type: "article",
      publishedTime: story.publishedDate,
      images: [{ url: ogImage }],
    },
  };
}

export default async function StoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const publishedDisplay = new Date(story.publishedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <div className="page-wrapper">
      <nav className="breadcrumb-nav">
        <div className="container">
          <Link href="/stories" className="breadcrumb-link">
            <FontAwesomeIcon icon={faArrowLeft} />
            All Stories
          </Link>
        </div>
      </nav>

      <article className="section blog-detail-section">
        <div className="container blog-detail-container">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": `${story.name}: ${story.title}`,
                "description": story.summary,
                "image":
                  story.imageUrl ??
                  (story.youtubeId
                    ? `https://i.ytimg.com/vi/${story.youtubeId}/hqdefault.jpg`
                    : "https://static.thrive-fl.org/og-image.jpg"),
                "url": `https://thrive-fl.org/stories/${story.slug}`,
                "datePublished": story.publishedDate,
                "dateModified": story.publishedDate,
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": `https://thrive-fl.org/stories/${story.slug}`,
                },
                "author": {
                  "@type": "Organization",
                  "name": "Thrive Community Church",
                  "url": "https://thrive-fl.org",
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Thrive Community Church",
                  "url": "https://thrive-fl.org",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://static.thrive-fl.org/thrive-logo.png",
                  },
                },
              }),
            }}
          />

          <header className="blog-detail-header">
            <h1 className="blog-detail-title">{story.title}</h1>
            <p className="story-detail-name">{story.name}</p>
            <p className="story-detail-date">
              <FontAwesomeIcon icon={faCalendar} /> {publishedDisplay}
            </p>
          </header>

          <StoryMedia
            name={story.name}
            youtubeId={story.youtubeId}
            vimeoId={story.vimeoId}
            audioUrl={story.audioUrl}
          />

          <StoryTranscript transcript={story.transcript} />

          <footer className="blog-detail-footer">
            <hr />
            <p>
              A story from <Link href="/">Thrive Community Church</Link> in Estero, Southwest Florida.
            </p>
          </footer>

          <div className="blog-detail-cta">
            <p>Want to see for yourself?</p>
            <div className="cta-buttons">
              <Link href="/im-new" className="btn btn-primary">
                Plan Your Visit
              </Link>
              {story.links?.map((link) => (
                <Link key={link.href} href={link.href} className="btn btn-outline">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
