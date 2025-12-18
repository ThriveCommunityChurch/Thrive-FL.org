import { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendar,
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

export const metadata: Metadata = {
  title: "Contact Us | Thrive Community Church",
  description: "Get in touch with Thrive Community Church. Questions, prayer requests, or just want to say hi? Call (239) 687-3430 or email info@thrive-fl.org.",
  openGraph: {
    title: "Contact Us | Thrive Community Church",
    description: "Questions, prayer requests, or just want to say hi? We're here for you.",
    url: "https://thrive-fl.org/contact",
  },
};

export default function ContactPage() {
  // Email templates with URL encoding
  const churchEmail = "info@thrive-fl.org";

  const emailTemplates = {
    general: {
      subject: "General Inquiry - Thrive Community Church",
      body: `Hi Thrive Team,

I have a question about:

[Please describe your question or inquiry here]

Thank you!

Name: [Your Name]
Phone: [Your Phone Number (optional)]`
    },
    visit: {
      subject: "First-Time Visit Questions - Thrive Community Church",
      body: `Hi Thrive Team,

I'm planning to visit Thrive Community Church and have some questions:

[Please share your questions about visiting]

I'm planning to attend on: [Date]
Number of people attending: [Number]
Do you have children attending? [Yes/No - Ages if applicable]

Thank you!

Name: [Your Name]
Phone: [Your Phone Number (optional)]`
    },
    prayer: {
      subject: "Prayer Request - Thrive Community Church",
      body: `Dear Thrive Prayer Team,

I would like to submit a prayer request:

[Please share your prayer request here]

May this request be shared with the prayer team? [Yes/No]

Thank you for praying with me.

Name: [Your Name (or "Anonymous")]`
    },
    volunteer: {
      subject: "Getting Involved - Thrive Community Church",
      body: `Hi Thrive Team,

I'm interested in getting involved and serving at Thrive Community Church.

Areas I'm interested in:
[ ] Worship/Music
[ ] Kids Ministry
[ ] Greeting/Hospitality
[ ] Tech/Media
[ ] Small Groups
[ ] Other: [Please specify]

A little about me:
[Tell us about yourself and any relevant experience]

Thank you!

Name: [Your Name]
Phone: [Your Phone Number]
Best time to contact: [Your preference]`
    },
    pastoral: {
      subject: "Pastoral Care Request - Thrive Community Church",
      body: `Dear Pastor,

I am reaching out regarding:

[ ] Spiritual guidance
[ ] Personal/Family matter
[ ] Hospital visit request
[ ] Grief support
[ ] Marriage/Relationship counsel
[ ] Other: [Please specify]

[Please share what's on your heart - all communications are confidential]

Thank you.

Name: [Your Name]
Phone: [Your Phone Number]
Preferred contact method: [Phone/Email]
Best time to reach you: [Your preference]`
    }
  };

  const createMailtoLink = (template: keyof typeof emailTemplates) => {
    const { subject, body } = emailTemplates[template];
    return `mailto:${churchEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

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

      {/* Contact Options Section */}
      <section className="section contact-options-section">
        <div className="container">
          <div className="contact-intro">
            <span className="section-eyebrow">Reach Out</span>
            <h2 className="section-title-left">How Can We Help?</h2>
            <p className="contact-intro-text">
              Choose the option that best fits your needs. Each link will open your email
              with a helpful template to get the conversation started.
            </p>
          </div>

          <div className="contact-options-grid">
            <a href={createMailtoLink("general")} className="contact-option-card">
              <div className="contact-option-icon">
                <FontAwesomeIcon icon={faCircleQuestion} />
              </div>
              <h3>General Inquiry</h3>
              <p>Have a question about Thrive? We&apos;re happy to help with anything.</p>
              <span className="contact-option-action">
                Send Email <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </a>

            <a href={createMailtoLink("visit")} className="contact-option-card">
              <div className="contact-option-icon">
                <FontAwesomeIcon icon={faDoorOpen} />
              </div>
              <h3>Visit Information</h3>
              <p>Planning your first visit? Let us know so we can welcome you properly.</p>
              <span className="contact-option-action">
                Send Email <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </a>

            <a href={createMailtoLink("prayer")} className="contact-option-card">
              <div className="contact-option-icon">
                <FontAwesomeIcon icon={faHandsPraying} />
              </div>
              <h3>Prayer Request</h3>
              <p>We believe in the power of prayer. Share your request with our prayer team.</p>
              <span className="contact-option-action">
                Send Email <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </a>

            <a href={createMailtoLink("volunteer")} className="contact-option-card">
              <div className="contact-option-icon">
                <FontAwesomeIcon icon={faHandHoldingHeart} />
              </div>
              <h3>Get Involved</h3>
              <p>Want to serve and make a difference? We have a place for you.</p>
              <span className="contact-option-action">
                Send Email <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </a>

            <a href={createMailtoLink("pastoral")} className="contact-option-card">
              <div className="contact-option-icon">
                <FontAwesomeIcon icon={faHeartCircleCheck} />
              </div>
              <h3>Pastoral Care</h3>
              <p>Need spiritual guidance or support? Our pastoral team is here for you.</p>
              <span className="contact-option-action">
                Send Email <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </a>

            <a href="mailto:info@thrive-fl.org" className="contact-option-card">
              <div className="contact-option-icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <h3>Quick Message</h3>
              <p>Just want to send a quick note? Email us directly—no template needed.</p>
              <span className="contact-option-action">
                Send Email <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </a>
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
                href="https://maps.google.com/maps/dir//Thrive+Community+Church+20041+S+Tamiami+Trl+%23+1+Estero,+FL+33928/@26.4487313,-81.8159419,15z/data=!4m5!4m4!1m0!1m2!1m1!1s0x88db168c655e1ef7:0x82f0ad091c85ad3a"
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
              <a href="https://www.google.com/maps/place/Thrive+Community+Church/@26.4336,-81.8252,17z"
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
