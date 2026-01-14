import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sermons | Thrive Community Church",
  description: "Watch and listen to sermon series from Thrive Community Church. Explore biblical teaching that helps you grow in faith and apply God's Word to everyday life.",
  openGraph: {
    title: "Sermons | Thrive Community Church",
    description: "Watch and listen to sermon series from Thrive Community Church.",
    url: "https://thrive-fl.org/sermons",
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
    title: "Sermons | Thrive Community Church",
    description: "Watch and listen to sermon series from Thrive Community Church.",
    images: ["https://d2v6hk6f64og35.cloudfront.net/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thrive-fl.org/sermons",
  },
};

export default function SermonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

