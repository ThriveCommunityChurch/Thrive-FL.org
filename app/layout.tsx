import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./app.css";
// Font Awesome SVG core CSS (required for proper rendering)
import '@fortawesome/fontawesome-svg-core/styles.css';
// Initialize Font Awesome library with all icons we use
import './lib/fontawesome';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Providers from "./components/Providers";
import CriticalCSS from "./components/CriticalCSS";

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
	    // Search engine webmaster / ownership verification codes
	    // These IDs are meant to be public meta tags and do not need to be secret.
	    google: "SALXLSorV_uvi8FVA-yBbAnF0HxNYtKBEcb_CibHIXw",
	    yahoo: "4175D31E5DF9EE5B2A0C6557B409D517",
	    other: {
	      // Bing Webmaster Tools
	      "msvalidate.01": "4175D31E5DF9EE5B2A0C6557B409D517",
	      // Alexa (legacy service, safe to keep for compatibility)
	      alexaVerifyID: "Qcy1I-XCw9tdhIfyzCPvRMv4VV0",
	    },
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
        {/* Critical CSS - inlined for instant first paint */}
        <CriticalCSS />

        {/* Preconnect for external resources - crossOrigin required for CORS */}
        <link rel="preconnect" href="https://d2v6hk6f64og35.cloudfront.net" crossOrigin="anonymous" />

        {/* Preload critical hero image for LCP optimization */}
        <link rel="preload" href="https://d2v6hk6f64og35.cloudfront.net/Still.jpg" as="image" fetchPriority="high" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* reCAPTCHA Enterprise */}
        <script src="https://www.google.com/recaptcha/enterprise.js?render=6LfhCccqAAAAAKlzmPF-A9_yarsAtARSBgE7WqRF" async defer></script>
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
      </body>
    </html>
  );
}
