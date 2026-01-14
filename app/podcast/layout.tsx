import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podcast | Thrive Community Church",
  description: "Subscribe to the Thrive Community Church podcast. Listen to our weekly messages on Apple Podcasts, Spotify, Amazon Music, and more.",
  openGraph: {
    title: "Podcast | Thrive Community Church",
    description: "Take our messages with you wherever you go. Subscribe on your favorite podcast platform.",
    url: "https://thrive-fl.org/podcast",
    images: [
      {
        url: "https://d2v6hk6f64og35.cloudfront.net/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Thrive Community Church",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Podcast | Thrive Community Church",
    description: "Take our messages with you wherever you go. Subscribe on your favorite podcast platform.",
    images: ["https://d2v6hk6f64og35.cloudfront.net/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thrive-fl.org/podcast",
  },
};

export default function PodcastLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

