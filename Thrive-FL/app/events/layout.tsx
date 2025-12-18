import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events & Gatherings | Thrive Community Church",
  description: "Find out what's happening at Thrive Community Church. Sunday worship, special events, and community gatherings in Estero, FL.",
  openGraph: {
    title: "Events & Gatherings | Thrive Community Church",
    description: "Find out what's happening at Thrive Community Church in Estero, FL.",
    url: "https://thrive-fl.org/events",
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

