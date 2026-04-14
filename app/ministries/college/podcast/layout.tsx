import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Theocology Podcast | ThriveFGCU | Thrive Community Church",
  description: "Theocology is the podcast that discusses why theology matters during your college years - actually always. Hosted by Pastor John Roth with FGCU students discussing faith and life.",
  openGraph: {
    title: "Theocology Podcast | ThriveFGCU",
    description: "Why theology matters during your college years—actually always. A podcast from ThriveFGCU at Florida Gulf Coast University with Pastor John Roth.",
    url: "https://thrive-fl.org/ministries/college/podcast",
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
    title: "Theocology Podcast | ThriveFGCU",
    description: "Why theology matters during your college years—actually always.",
    images: ["https://static.thrive-fl.org/Theocology.png"],
  },
  alternates: {
    canonical: "https://thrive-fl.org/ministries/college/podcast",
  },
};

// JSON-LD structured data following schema.org PodcastSeries spec
// Note: Google does not currently have a specific rich result type for podcasts,
// but this markup is valuable for semantic understanding and other search engines/platforms
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  "name": "Theocology",
  "description": "Theocology is the podcast that discusses why theology matters during your college years - actually always. Pastor John Roth, a professor at Florida Gulf Coast University, hosts students who discuss matters of faith and life each week during the academic year.",
  "url": "https://thrive-fl.org/ministries/college/podcast",
  "image": "https://static.thrive-fl.org/Theocology.png",
  "inLanguage": "en-US",
  "author": {
    "@type": "Person",
    "name": "Pastor John Roth",
    "jobTitle": "Pastor & Professor"
  },
  "publisher": {
    "@type": "Organization",
    "name": "ThriveFGCU",
    "url": "https://thrive-fl.org/ministries/college"
  },
  "webFeed": [
    {
      "@type": "DataFeed",
      "name": "Spotify",
      "url": "https://open.spotify.com/show/2YoutWBhOwEhk3N5m88a6b"
    },
    {
      "@type": "DataFeed",
      "name": "Apple Podcasts",
      "url": "https://podcasts.apple.com/us/podcast/theocology/id1560878098"
    }
  ],
  "sameAs": [
    "https://open.spotify.com/show/2YoutWBhOwEhk3N5m88a6b",
    "https://podcasts.apple.com/us/podcast/theocology/id1560878098"
  ]
};

export default function TheocologyLayout({
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

