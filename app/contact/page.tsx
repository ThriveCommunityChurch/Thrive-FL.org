import { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendar,
  faCheck,
  faCircleQuestion,
  faDiamondTurnRight,
  faDoorOpen,
  faEnvelope,
  faHandHoldingHeart,
  faHandsPraying,
  faHeartCircleCheck,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import ContactForm from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Thrive Community Church",
  description: "Get in touch with Thrive Community Church. Questions, prayer requests, or just want to say hi? Call (239) 687-3430 or email info@thrive-fl.org.",
  openGraph: {
    title: "Contact Us | Thrive Community Church",
    description: "Questions, prayer requests, or just want to say hi? We're here for you.",
    url: "https://thrive-fl.org/contact",
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
    title: "Contact Us | Thrive Community Church",
    description: "Questions, prayer requests, or just want to say hi? We're here for you.",
    images: ["https://d2v6hk6f64og35.cloudfront.net/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thrive-fl.org/contact",
  },
};

export default function ContactPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const rawSubject = searchParams?.subject;
  const subjectParam = Array.isArray(rawSubject) ? rawSubject[0] : rawSubject;
  const allowedSubjects = new Set([
    "general",
    "visit",
    "prayer",
    "volunteer",
    "pastoral",
    "other",
  ]);

  const initialSubject =
    subjectParam && allowedSubjects.has(subjectParam) ? subjectParam : "";

  return (
    <div className="page-wrapper">
      {/* Page Hero Section */}
      <section className="page-hero page-hero-contact">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Contact Us</h1>
          <p className="page-hero-subtitle">
            Questions? Prayer requests? Just want to say hi? We&apos;re here for you.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section contact-form-section">
	        <div className="container">
	          <div className="contact-form-wrapper" id="contact-form">
            <div className="contact-form-info">
              <span className="section-eyebrow">Send a Message</span>
              <h2>Get in Touch Directly</h2>
              <p>
                Fill out the form and we&apos;ll get back to you as soon as possible.
                We typically respond within 24 hours.
              </p>
              <ul className="contact-form-benefits">
                <li>
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Quick response within 24 hours</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Your information is kept confidential</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Connect with the right person for your needs</span>
                </li>
              </ul>
	            </div>
	            <ContactForm initialSubject={initialSubject} />
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="section contact-details-section">
        <div className="container">
          <div className="section-header-centered">
            <span className="section-eyebrow">Get in Touch</span>
            <h2 className="section-title">Other Ways to Reach Us</h2>
            <p className="section-subtitle">
              Prefer a more direct approach? Here&apos;s how to find us.
            </p>
          </div>

          <div className="contact-details-grid">
            <div className="contact-detail-card">
              <div className="contact-detail-icon">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <h3>Call Us</h3>
              <p className="contact-detail-highlight">
                <a href="tel:+12396873430">(239) 687-3430</a>
              </p>
              <p className="contact-detail-note">We&apos;d love to hear from you</p>
            </div>

            <div className="contact-detail-card">
              <div className="contact-detail-icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <h3>Email Us</h3>
              <p className="contact-detail-highlight">
                <a href="mailto:info@thrive-fl.org">info@thrive-fl.org</a>
              </p>
              <p className="contact-detail-note">We typically respond within 24 hours</p>
            </div>

            <div className="contact-detail-card">
              <div className="contact-detail-icon">
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              <h3>Visit Us</h3>
              <p className="contact-detail-address">
                20041 S. Tamiami Trail #1<br />Estero, FL 33928
              </p>
              <a
                href="https://maps.app.goo.gl/CiLFFrfovhkcfewq8"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-detail-link"
              >
                Get Directions <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>
          </div>

          <div className="contact-social-centered">
            <h4>Connect With Us Online</h4>
            <div className="contact-social-links-large">
              <a href="https://www.facebook.com/thriveFL" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
                <span>Facebook</span>
              </a>
              <a href="https://www.instagram.com/thrive_fl" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
                <span>Instagram</span>
              </a>
              <a href="https://x.com/Thrive_FL" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X">
                <FontAwesomeIcon icon={faXTwitter} />
                <span>X / Twitter</span>
              </a>
              <a href="https://www.youtube.com/channel/UC47Nme86YGrVy1lY15rF3ig" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FontAwesomeIcon icon={faYoutube} />
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* In-Person CTA Section */}
      <section className="section contact-cta-section">
        <div className="container container-narrow">
          <div className="cta-content">
            <h2>Nothing Beats Meeting Face to Face</h2>
            <p>
              While we love hearing from you online, there&apos;s nothing quite like connecting
              in person. We&apos;d love to meet you.
            </p>
            <div className="cta-buttons">
              <a href="/visit" className="btn btn-primary">
                <FontAwesomeIcon icon={faCalendar} /> Visit Us
              </a>
              <a href="https://maps.app.goo.gl/CiLFFrfovhkcfewq8"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="btn btn-outline-white">
                <FontAwesomeIcon icon={faDiamondTurnRight} /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
