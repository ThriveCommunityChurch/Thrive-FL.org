import { Metadata } from "next";
import { faqData } from "./page";

export const metadata: Metadata = {
  title: "FAQ | Thrive Community Church",
  description: "Frequently asked questions about Thrive Community Church. Find answers about services, kids programs, getting involved, giving, and more.",
  openGraph: {
    title: "FAQ | Thrive Community Church",
    description: "Frequently asked questions about Thrive Community Church. Find answers about services, kids programs, getting involved, and more.",
    url: "https://thrive-fl.org/faq",
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
    title: "FAQ | Thrive Community Church",
    description: "Frequently asked questions about Thrive Community Church. Find answers about services, kids programs, getting involved, and more.",
    images: ["https://static.thrive-fl.org/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thrive-fl.org/faq",
  },
};

// Build FAQPage JSON-LD from the FAQ data
// This follows Google's FAQPage structured data requirements:
// https://developers.google.com/search/docs/appearance/structured-data/faqpage
function buildFaqJsonLd() {
  // Flatten all questions from all categories
  const allQuestions = Object.values(faqData).flatMap(category =>
    category.questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer + (q.link ? ` Learn more: ${q.link.href}` : ""),
      },
    }))
  );

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allQuestions,
  };
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = buildFaqJsonLd();

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

