import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podcast | Thrive Community Church",
  description: "Subscribe to the Thrive Community Church podcast. Listen to our weekly messages on Apple Podcasts, Spotify, Amazon Music, and more.",
  openGraph: {
    title: "Thrive Podcast | Thrive Community Church",
    description: "Take our messages with you wherever you go. Subscribe on your favorite podcast platform.",
    url: "https://thrive-fl.org/podcast",
  },
};

export default function PodcastLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

