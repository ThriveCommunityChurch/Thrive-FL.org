import { Metadata } from "next";
import { fetchTheocologyEpisodes } from "../../services/theocologyService";
import EpisodesListClient from "./EpisodesListClient";

export const metadata: Metadata = {
  title: "All Episodes | Theocology Podcast | Thrive Community Church",
  description:
    "Browse all episodes of Theocology, the podcast from ThriveFGCU exploring faith, doubt, identity, and community.",
  openGraph: {
    title: "All Episodes | Theocology Podcast",
    description:
      "Browse all episodes of Theocology, the podcast from ThriveFGCU exploring faith, doubt, identity, and community.",
    url: "https://thrive-fl.org/theocology/episodes",
    images: [
      {
        url: "https://static.thrive-fl.org/Theocology.png",
        width: 640,
        height: 640,
        alt: "Theocology Podcast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Episodes | Theocology Podcast",
    description:
      "Browse all episodes of Theocology, the podcast from ThriveFGCU exploring faith, doubt, identity, and community.",
    images: ["https://static.thrive-fl.org/Theocology.png"],
  },
  alternates: {
    canonical: "https://thrive-fl.org/theocology/episodes",
  },
};

// ISR: refresh the RSS-backed episode list hourly (matches the service cache)
export const revalidate = 3600;

export default async function TheocologyEpisodesPage() {
  const episodes = await fetchTheocologyEpisodes();
  return <EpisodesListClient episodes={episodes} />;
}
