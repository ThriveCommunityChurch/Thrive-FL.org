import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Gatherings | Thrive Community Church",
  description: "Find out what's happening at Thrive Community Church. Sunday worship, special events, and community gatherings in Estero, FL.",
  openGraph: {
    title: "Events & Gatherings | Thrive Community Church",
    description: "Find out what's happening at Thrive Community Church in Estero, FL.",
    url: "https://thrive-fl.org/events",
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
    title: "Events & Gatherings | Thrive Community Church",
    description: "Find out what's happening at Thrive Community Church in Estero, FL.",
    images: ["https://d2v6hk6f64og35.cloudfront.net/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thrive-fl.org/events",
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

