import { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandsPraying,
  faHeartCircleCheck,
  faHandHoldingHeart,
  faEnvelope,
  faHouse,
  faHandshakeAngle,
} from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Care & Prayer | Thrive Community Church",
  description:
    "Request prayer, talk with a pastor, or ask for practical help at Thrive Community Church. You don't have to walk through this alone.",
  openGraph: {
    title: "Care & Prayer | Thrive Community Church",
    description:
      "Need prayer, care, or a conversation with a pastor? Learn how to reach out at Thrive Community Church.",
    url: "https://thrive-fl.org/care",
  },
  twitter: {
    card: "summary_large_image",
    title: "Care & Prayer | Thrive Community Church",
    description: "Need prayer, care, or a conversation with a pastor? Learn how to reach out at Thrive Community Church.",
  },
  alternates: {
    canonical: "https://thrive-fl.org/care",
  },
};

export default function CarePage() {

  return (
    <div className="page-wrapper">
      {/* Page Hero Section */}
      <section className="page-hero page-hero-care">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Care &amp; Prayer</h1>
          <p className="page-hero-subtitle">
            Whatever you&apos;re carrying, you don&apos;t have to carry it alone.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section intro-section">
        <div className="container container-narrow">
          <div className="intro-content">
            <h2 className="section-title">You&apos;re Not a Burden</h2>
	            <p className="intro-lead">
	              Life gets heavy. Illness, loss, anxiety, broken relationships,
	              financial stress—whatever you&apos;re walking through, we don&apos;t want you
	              to walk through it alone.
	            </p>
            <p>
              At Thrive, care and prayer are part of how we live out the Gospel
              together. Sometimes that means a quiet conversation with a pastor.
              Sometimes it means people praying faithfully for you over time.
              Sometimes it looks like practical support when life falls apart.
            </p>
            <p>
              You don&apos;t have to have the right words. You don&apos;t have to have it
              all together. You just have to reach out.
            </p>
	            <div className="cta-buttons" style={{ marginTop: "var(--spacing-xl)" }}>
	              <a href="/contact?subject=prayer#contact-form" className="btn btn-primary btn-lg">
                <FontAwesomeIcon icon={faHandsPraying} /> Request Prayer
              </a>
	              <a href="/contact?subject=pastoral#contact-form" className="btn btn-outline btn-lg">
                <FontAwesomeIcon icon={faEnvelope} /> Schedule a Conversation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Care Options Overview */}
      <section className="section faq-section">
        <div className="container">
          <h2 className="section-title">How We Can Walk With You</h2>
          <div className="faq-grid">
            <div className="faq-card">
              <div className="faq-icon">
                <FontAwesomeIcon icon={faHandsPraying} />
              </div>
              <h3>Prayer Support</h3>
              <p>
                Share what&apos;s on your heart and our prayer team will be praying
                for you by name. You can share as many or as few details as
                you&apos;d like.
              </p>
            </div>

            <div className="faq-card">
              <div className="faq-icon">
                <FontAwesomeIcon icon={faHeartCircleCheck} />
              </div>
              <h3>Talk With a Pastor</h3>
	              <p>
	                Sometimes you need more than a quick prayer—you need a real
	                conversation. Our pastors would love to listen, pray, and help
	                you take next steps.
	              </p>
            </div>

            <div className="faq-card">
              <div className="faq-icon">
                <FontAwesomeIcon icon={faHandHoldingHeart} />
              </div>
              <h3>Practical Help</h3>
              <p>
                When life hits hard, we may be able to help with practical
                support or connect you with trusted local resources and
                counselors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Requests Section */}
      <section className="section groups-how-section">
        <div className="container container-narrow">
          <div className="section-header-centered">
            <span className="section-eyebrow">Prayer Requests</span>
            <h2 className="section-title">Need Prayer?</h2>
          </div>
          <div className="groups-steps">
            <div className="groups-step">
              <div className="groups-step-number">1</div>
              <div className="groups-step-content">
                <h3>Share Your Request</h3>
	                <p>
	                  Email our prayer team at <strong>prayers@thrive-fl.org</strong>
	                  . Share as much or as little as you&apos;re comfortable with—God
	                  knows the rest.
	                </p>
              </div>
            </div>
            <div className="groups-step">
              <div className="groups-step-number">2</div>
              <div className="groups-step-content">
                <h3>We Pray With You</h3>
                <p>
                  Trusted staff and leaders will be praying for you. If you&apos;d
                  like ongoing prayer, just let us know and we&apos;ll keep walking
                  with you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="container">
          <h2 className="section-title">FAQs</h2>
          <div className="faq-grid">
            <div className="faq-card">
              <div className="faq-icon">
                <FontAwesomeIcon icon={faHandsPraying} />
              </div>
              <h3>Who sees my prayer request?</h3>
              <p>
                Prayer requests sent to <strong>prayers@thrive-fl.org</strong> 
                 are read by trusted staff and leaders who are committed to
                confidentiality and care.
              </p>
            </div>

            <div className="faq-card">
              <div className="faq-icon">
                <FontAwesomeIcon icon={faHeartCircleCheck} />
              </div>
              <h3>Is this confidential?</h3>
              <p>
                We treat your story with care and discretion. In rare cases
                where someone may be in danger, we'll take appropriate steps
                to get help, but otherwise we keep your information within our
                care team.
              </p>
            </div>

            <div className="faq-card">
              <div className="faq-icon">
                <FontAwesomeIcon icon={faHandHoldingHeart} />
              </div>
              <h3>Are you a counseling center?</h3>
              <p>
                We're a church, not a licensed counseling practice. Our
                pastors and leaders can listen, pray, and open Scripture with
                you, and we can help connect you with professional counselors
                when appropriate.
              </p>
            </div>

            <div className="faq-card">
              <div className="faq-icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <h3>What if I have an immediate need?</h3>
              <p>
                If you're facing an urgent practical need—such as furniture,
                transportation, or other support—we partner with{" "}
                <a
                  href="https://loveincflorida.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Love INC Heart of Florida
                </a>
                , a ministry that helps churches help people in our community.
                They specialize in connecting people with tangible resources and
                long-term support. You can reach out to them directly or contact
                us and we'll help you get connected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="section quicklinks-section">
        <div className="container">
          <div className="section-header-centered">
            <span className="section-eyebrow">Next Steps</span>
            <h2 className="section-title">Sometimes Your Next Step Is...</h2>
          </div>
          <div className="quicklinks-grid">
            <a href="/small-groups" className="quicklink-card">
              <div className="quicklink-icon">
                <FontAwesomeIcon icon={faHouse} />
              </div>
              <h3>Join a Home Huddle</h3>
              <p>
                Walk with others in community. Share life, pray together, and
                let people know how you&apos;re really doing.
              </p>
              <span className="quicklink-action">Find a Group</span>
            </a>
            <a href="/get-involved" className="quicklink-card">
              <div className="quicklink-icon">
                <FontAwesomeIcon icon={faHandshakeAngle} />
              </div>
              <h3>Serve on a Team</h3>
              <p>
                Sometimes healing starts as you serve alongside others and use
                your gifts to bless someone else.
              </p>
              <span className="quicklink-action">Get Involved</span>
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section cta-section">
        <div className="container container-narrow">
          <div className="cta-content">
            <h2>You Don&apos;t Have to Walk Through This Alone</h2>
            <p>
              Whether you need prayer, a conversation, or help figuring out what
              to do next, we&apos;d be honored to walk with you.
            </p>
	            <div className="cta-buttons">
	              <a href="/contact?subject=prayer#contact-form" className="btn btn-primary btn-lg">
                <FontAwesomeIcon icon={faHandsPraying} /> Request Prayer
              </a>
	              <a href="/contact?subject=pastoral#contact-form" className="btn btn-outline btn-lg">
                <FontAwesomeIcon icon={faEnvelope} /> Schedule a Conversation
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
