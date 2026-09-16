import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEpisodeBySlug } from "../../../services/theocologyService";
import EpisodeDetailClient from "./EpisodeDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ISR: refresh the RSS-backed episode hourly (matches the service cache)
export const revalidate = 3600;

// Strip HTML tags/entities so the episode description is safe for meta text
function toPlainText(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .trim();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);

  if (!episode) {
    return {
      title: "Episode Not Found | Theocology Podcast | Thrive Community Church",
      description: "The requested Theocology episode could not be found.",
    };
  }

  const description =
    toPlainText(episode.description).slice(0, 160) ||
    `Listen to "${episode.title}" on Theocology, the podcast from ThriveFGCU.`;
  const url = `https://thrive-fl.org/theocology/episodes/${slug}`;

  return {
    title: `${episode.title} | Theocology Podcast | Thrive Community Church`,
    description,
    openGraph: {
      title: `${episode.title} | Theocology Podcast`,
      description,
      url,
      type: "article",
      publishedTime: episode.pubDate,
      images: [{ url: episode.imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${episode.title} | Theocology Podcast`,
      description,
      images: [episode.imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function EpisodePage({ params }: PageProps) {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);

  if (!episode) {
    notFound();
  }

  return <EpisodeDetailClient episode={episode} />;
}
