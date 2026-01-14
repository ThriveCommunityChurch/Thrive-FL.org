import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Details | Thrive Community Church",
  description: "View event details at Thrive Community Church in Estero, FL. Join us for worship, community gatherings, and special events.",
  openGraph: {
    title: "Event Details | Thrive Community Church",
    description: "View event details at Thrive Community Church in Estero, FL.",
    url: "https://thrive-fl.org/events",
  },
  twitter: {
    card: "summary_large_image",
    title: "Event Details | Thrive Community Church",
    description: "View event details at Thrive Community Church in Estero, FL.",
  },
};

export default function EventDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

