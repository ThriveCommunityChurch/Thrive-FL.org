import { Metadata } from "next";
import { notFound } from "next/navigation";
import EpisodeDetailClient from "./EpisodeDetailClient";
import {
  getEpisodeBySlug,
} from "../../../services/theocologyService";
import { TheocologyEpisodeJsonLd } from "../../../components/JsonLd";

// Generate metadata for each episode
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);

  if (!episode) {
    return {
      title: "Episode Not Found | Theocology",
    };
  }

  // Strip HTML from description for meta tags
  const plainDescription = episode.description
    .replace(/<[^>]*>/g, "")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .substring(0, 160);

  return {
    title: `${episode.title} | Theocology | ThriveFGCU`,
    description: plainDescription,
    openGraph: {
      title: episode.title,
      description: plainDescription,
      images: [episode.imageUrl],
      type: "website",
      url: `https://thrive-fl.org/theocology/episodes/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: episode.title,
      description: plainDescription,
      images: [episode.imageUrl],
    },
  };
}

// Revalidate every hour
export const revalidate = 3600;

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);

  if (!episode) {
    notFound();
  }

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <TheocologyEpisodeJsonLd
        slug={episode.slug}
        title={episode.title}
        description={episode.description}
        pubDate={episode.pubDate}
        duration={episode.duration}
        audioUrl={episode.audioUrl}
        imageUrl={episode.imageUrl}
      />
      <EpisodeDetailClient episode={episode} />
    </>
  );
}

