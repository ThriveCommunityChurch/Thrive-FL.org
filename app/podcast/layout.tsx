import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Podcast | Thrive Community Church",
  description: "Subscribe to the Thrive Community Church podcast. Listen to our weekly messages on Apple Podcasts, Spotify, Amazon Music, and more.",
  openGraph: {
    title: "Podcast | Thrive Community Church",
    description: "Take our messages with you wherever you go. Subscribe on Apple Podcasts, Spotify, Amazon Music, and more.",
    url: "https://thrive-fl.org/podcast",
    images: [
      {
        url: "https://static.thrive-fl.org/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Thrive Community Church",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Podcast | Thrive Community Church",
    description: "Take our messages with you wherever you go. Subscribe on Apple Podcasts, Spotify, Amazon Music, and more.",
    images: ["https://static.thrive-fl.org/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thrive-fl.org/podcast",
  },
};

// JSON-LD structured data following schema.org PodcastSeries spec
// Note: Google does not currently have a specific rich result type for podcasts,
// but this markup is valuable for semantic understanding and other search engines/platforms
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  "name": "Thrive Community Church",
  "description": "Listen to sermons and teachings from Thrive Community Church in Fort Myers, Florida. Pastor John Roth shares messages to help you grow in your faith and live out your purpose.",
  "url": "https://thrive-fl.org/podcast",
  "image": "https://static.thrive-fl.org/og-image.jpg",
  "inLanguage": "en-US",
  "author": {
    "@type": "Organization",
    "name": "Thrive Community Church",
    "url": "https://thrive-fl.org"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Thrive Community Church",
    "url": "https://thrive-fl.org",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Fort Myers",
      "addressRegion": "FL",
      "addressCountry": "US"
    }
  },
  "webFeed": [
    {
      "@type": "DataFeed",
      "name": "Apple Podcasts",
      "url": "https://podcasts.apple.com/us/podcast/thrive-community-church/id1664865656"
    },
    {
      "@type": "DataFeed",
      "name": "Spotify",
      "url": "https://open.spotify.com/show/30HLumzn3rLBf3kdfqRwnA"
    }
  ],
  "sameAs": [
    "https://podcasts.apple.com/us/podcast/thrive-community-church/id1664865656",
    "https://open.spotify.com/show/30HLumzn3rLBf3kdfqRwnA",
    "https://music.amazon.com/podcasts/cc72b47e-e432-4db4-b7ed-33bec745fadc/thrive-community-church",
    "https://www.iheart.com/podcast/269-thrive-community-church-109048514/",
    "https://www.pandora.com/podcast/thrive-community-church/PC:1001065651",
    "https://www.deezer.com/en/show/5640927",
    "https://player.fm/series/thrive-community-church"
  ]
};

export default function PodcastLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}

