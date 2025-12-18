import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./app.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Providers from "./components/Providers";

// Next.js Font Optimization - eliminates render-blocking font requests
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const GA_MEASUREMENT_ID = "G-2X21SMEX9G";

export const metadata: Metadata = {
  metadataBase: new URL("https://thrive-fl.org"),
  title: "Thrive Community Church | Estero, FL",
  description: "Join us at Thrive Community Church in Estero, FL. Experience authentic worship, biblical teaching, and genuine community. Service every Sunday at 10 AM.",
  keywords: ["church", "Estero", "Fort Myers", "Florida", "worship", "community", "faith", "sermons", "Lutheran", "LCMS"],
  authors: [{ name: "Thrive Community Church" }],
  creator: "Thrive Community Church",
  publisher: "Thrive Community Church",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thrive-fl.org",
    siteName: "Thrive Community Church",
    title: "Thrive Community Church | Estero, FL",
    description: "Join us at Thrive Community Church in Estero, FL. Experience authentic worship, biblical teaching, and genuine community.",
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
    title: "Thrive Community Church | Estero, FL",
    description: "Join us at Thrive Community Church in Estero, FL. Experience authentic worship, biblical teaching, and genuine community.",
    images: ["https://d2v6hk6f64og35.cloudfront.net/og-image.jpg"],
    creator: "@Thrive_FL",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect for external resources - crossOrigin required for CORS */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://d2v6hk6f64og35.cloudfront.net" crossOrigin="anonymous" />

        {/* Preload critical hero image for LCP optimization */}
        <link rel="preload" href="https://d2v6hk6f64og35.cloudfront.net/Still.jpg" as="image" fetchPriority="high" />

        {/* Font Awesome font-display fix - ensures text visible while fonts load */}
        <style dangerouslySetInnerHTML={{ __html: `
          @font-face { font-family: 'Font Awesome 6 Free'; font-display: swap; }
          @font-face { font-family: 'Font Awesome 6 Brands'; font-display: swap; }
        `}} />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>

        {/* Font Awesome - Deferred loading to prevent render blocking */}
        <Script id="font-awesome-loader" strategy="afterInteractive">
          {`
            (function() {
              var link = document.createElement('link');
              link.rel = 'stylesheet';
              link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
              link.crossOrigin = 'anonymous';
              link.referrerPolicy = 'no-referrer';
              document.head.appendChild(link);
            })();
          `}
        </Script>

        <Providers>
          {/* Persistent Shell */}
          <div className="app-shell">
            <Header />
            <main id="main-content">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>

        {/* Structured Data for Church */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Church",
              name: "Thrive Community Church",
              description: "A congregation of the Lutheran Church—Missouri Synod in Estero, FL",
              address: {
                "@type": "PostalAddress",
                streetAddress: "20041 S. Tamiami Trail #1",
                addressLocality: "Estero",
                addressRegion: "FL",
                postalCode: "33928",
                addressCountry: "US",
              },
              telephone: "(239) 687-3430",
              email: "info@thrive-fl.org",
              url: "https://thrive-fl.org",
              sameAs: [
                "https://www.facebook.com/thriveFL",
                "https://www.instagram.com/thrive_fl",
                "https://x.com/Thrive_FL",
                "https://www.youtube.com/channel/UC47Nme86YGrVy1lY15rF3ig",
              ],
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Sunday",
                opens: "10:00",
                closes: "12:00",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Church Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Sunday Worship Service",
                      description: "Weekly worship service with contemporary music and biblical teaching",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
