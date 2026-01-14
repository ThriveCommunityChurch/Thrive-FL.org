import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Thrive Community Church",
  description: "Privacy policy for Thrive Community Church website and applications - how we collect, use, and protect your information.",
  openGraph: {
    title: "Privacy Policy | Thrive Community Church",
    description: "Privacy policy for Thrive Community Church website and applications.",
    url: "https://thrive-fl.org/privacy",
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
    title: "Privacy Policy | Thrive Community Church",
    description: "Privacy policy for Thrive Community Church website and applications.",
    images: ["https://d2v6hk6f64og35.cloudfront.net/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thrive-fl.org/privacy",
  },
};

export default function PrivacyPage() {
  const lastUpdated = "December 18, 2025";

  return (
    <div className="page-wrapper">
      {/* Page Hero Section */}
      <section className="page-hero page-hero-privacy">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Privacy Policy</h1>
          <p className="page-hero-subtitle">
            Your privacy matters to us
          </p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="section privacy-content-section">
        <div className="container container-narrow">
          <p className="privacy-updated">Last updated: {lastUpdated}</p>

          <div className="privacy-content">
            <h2>Introduction</h2>
            <p>
              Thrive Community Church (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is
              committed to protecting your personal information. This Privacy Policy explains how we collect,
              use, and safeguard information when you visit our website at thrive-fl.org or use our mobile
              applications and digital services.
            </p>

            <h2>Scope of This Policy</h2>
            <p>This Privacy Policy applies to:</p>
            <ul>
              <li>Our website at <strong>thrive-fl.org</strong></li>
              <li>The <strong>Thrive Church Official App</strong> (iOS and cross-platform versions)</li>
              <li>Our sermon streaming and podcast services</li>
              <li>Any other digital services we provide</li>
            </ul>
            <p>
              By using any of these services, you agree to the collection and use of information
              in accordance with this policy.
            </p>

            <h2>Information We Collect</h2>
            <h3>Information You Provide</h3>
            <p>We may collect information you voluntarily provide, including:</p>
            <ul>
              <li>Name and contact information when you submit a contact form or email us</li>
              <li>Prayer requests or other personal information you choose to share</li>
              <li>Information provided when signing up for events or programs</li>
              <li>Sermon notes and bookmarks you create in our mobile app</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>When you visit our website or use our apps, we may automatically collect:</p>
            <ul>
              <li>Device and browser information (device type, operating system, browser version)</li>
              <li>IP address and general geographic location</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website or source</li>
              <li>App usage patterns and feature interactions</li>
              <li>Crash reports and diagnostic information</li>
            </ul>

            <h2>Analytics &amp; Tracking</h2>
            <h3>Google Analytics</h3>
            <p>
              We use <strong>Google Analytics</strong> to understand how visitors interact with our website.
              Google Analytics collects information such as:
            </p>
            <ul>
              <li>How often users visit our site</li>
              <li>What pages they visit and how long they stay</li>
              <li>What websites referred them to us</li>
              <li>General demographic and interest information</li>
            </ul>
            <p>
              This information is used to improve our website and better serve our community. Google Analytics
              uses cookies to collect this data. You can opt out of Google Analytics by installing the{" "}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                Google Analytics Opt-out Browser Add-on
              </a>.
            </p>

            <h3>App Analytics</h3>
            <p>
              Our mobile applications may collect diagnostic and usage data to help us improve app performance
              and user experience. This includes crash reports, performance metrics, and feature usage statistics.
              This data is collected anonymously and is used solely to improve our services.
            </p>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your inquiries and prayer requests</li>
              <li>Send you information about church events and programs (with your consent)</li>
              <li>Improve our website, apps, and services</li>
              <li>Maintain the security and performance of our digital services</li>
              <li>Analyze usage patterns to better serve our community</li>
              <li>Debug and fix technical issues</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to outside parties.
              We may share information with trusted service providers who assist us in operating our website
              and apps, conducting our ministry, or serving you, so long as those parties agree to keep
              this information confidential.
            </p>
            <p>
              Prayer requests may be shared with our prayer team unless you request otherwise.
              We treat all pastoral communications with the utmost confidentiality.
            </p>

            <h2>Third-Party Services</h2>
            <p>Our website and apps may use third-party services including:</p>
            <ul>
              <li><strong>Google Analytics</strong> - for website and app analytics</li>
              <li><strong>Google Maps</strong> - to display our location and provide directions</li>
              <li><strong>YouTube</strong> - for embedded video content and live streams</li>
              <li><strong>Amazon Web Services (AWS)</strong> - for hosting and content delivery</li>
              <li><strong>Google Fonts</strong> - for typography</li>
            </ul>
            <p>
              These services may collect information according to their own privacy policies. We encourage
              you to review their respective policies.
            </p>

            <h2>Cookies &amp; Tracking Technologies</h2>
            <p>
              Our website uses cookies and similar tracking technologies to enhance your browsing experience
              and collect analytics data. Cookies are small files stored on your device that help us understand
              how you use our site.
            </p>
            <p>Types of cookies we use:</p>
            <ul>
              <li><strong>Essential cookies</strong> - Required for basic website functionality</li>
              <li><strong>Analytics cookies</strong> - Help us understand how visitors use our site (Google Analytics)</li>
              <li><strong>Preference cookies</strong> - Remember your settings and preferences</li>
            </ul>
            <p>
              You can set your browser to refuse cookies, though this may limit some website functionality.
              Most browsers allow you to manage cookie preferences in their settings.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement reasonable security measures to protect your personal information, including
              encryption for data transmission and secure hosting infrastructure. However, no method of
              transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>Data Retention</h2>
            <p>
              We retain your personal information only as long as necessary to fulfill the purposes outlined
              in this policy, unless a longer retention period is required by law. Analytics data is typically
              retained in aggregated, anonymized form.
            </p>

            <h2>Children&apos;s Privacy</h2>
            <p>
              Our website and apps are not intended for children under 13. We do not knowingly collect personal
              information from children under 13. If you believe we have collected information from a child
              under 13, please contact us immediately.
            </p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Request access to the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of analytics tracking</li>
              <li>Opt out of any email communications</li>
            </ul>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by
              posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              Continued use of our services after changes constitutes acceptance of the updated policy.
            </p>

            <h2>Contact Us</h2>
            <p>If you have questions about this Privacy Policy or our privacy practices, please contact us:</p>
            <div className="privacy-contact">
              <p><strong>Thrive Community Church</strong></p>
              <p>20041 S. Tamiami Trail #1<br />Estero, FL 33928</p>
              <p>Phone: <a href="tel:+12396873430">(239) 687-3430</a></p>
              <p>Email: <a href="mailto:info@thrive-fl.org">info@thrive-fl.org</a></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

