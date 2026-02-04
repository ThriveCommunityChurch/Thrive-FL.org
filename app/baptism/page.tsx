import { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDroplet,
  faChildReaching,
  faUsers,
  faHandsPraying,
  faEnvelope,
  faCalendarCheck,
  faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Baptism | Thrive Community Church",
  description:
    "Learn about baptism at Thrive Community Church: what it is, who it's for, and how to take a next step, whether for you or your child.",
  openGraph: {
    title: "Baptism | Thrive Community Church",
    description:
      "Considering baptism for yourself or your child? See what we believe, how it works, and how to start the conversation.",
    url: "https://thrive-fl.org/baptism",
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
    title: "Baptism | Thrive Community Church",
    description: "Considering baptism for yourself or your child? See what we believe, how it works, and how to start the conversation.",
    images: ["https://static.thrive-fl.org/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thrive-fl.org/baptism",
  },
};

export default function BaptismPage() {
	  return (
    <div className="page-wrapper">
      {/* Page Hero Section */}
      <section className="page-hero page-hero-baptism">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Baptism at Thrive</h1>
          <p className="page-hero-subtitle">
            A sacred moment. A life transformed. A promise sealed by the Holy Spirit.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section intro-section">
        <div className="container container-narrow">
          <div className="intro-content">
            <h2 className="section-title">More Than a Moment. A Promise.</h2>
            <p className="intro-lead">
              Baptism isn&apos;t just a spiritual box to check or a photo opportunity.
	              It&apos;s one of the primary ways God speaks His promises over us by calling
              us His own, washing us clean, and joining us to Jesus&apos; death and
              resurrection.
            </p>
            <p>
              Whether you were carried to the font as a baby or are considering
              baptism as an adult, it&apos;s always about what God is doing for you,
              not what you&apos;re doing for Him. If you&apos;re curious, nervous, or
              brand-new to church, you don&apos;t have to have it all figured out
              before we talk.
            </p>
          </div>
        </div>
      </section>

      {/* Who Is Baptism For Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Who Is Baptism For?</h2>
          <div className="faq-grid">
            <div className="faq-card">
              <div className="faq-icon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <h3>Adults &amp; Students</h3>
              <p>
                If you haven&apos;t been baptized before and you&apos;re exploring faith
                or following Jesus, we&apos;d love to walk with you. We&apos;ll sit down,
                listen to your story, and talk through what baptism means and what
                it looks like at Thrive.
              </p>
            </div>

            <div className="faq-card">
              <div className="faq-icon">
                <FontAwesomeIcon icon={faChildReaching} />
              </div>
              <h3>Infants &amp; Children</h3>
              <p>
                We gladly baptize infants and children, trusting God&apos;s promises
                for them just as much as for adults. We&apos;ll help you think through
                timing, sponsors/godparents, and how to keep nurturing faith at
                home.
              </p>
            </div>

            <div className="faq-card">
              <div className="faq-icon">
                <FontAwesomeIcon icon={faHandsPraying} />
              </div>
              <h3>Already Baptized, But Want a Fresh Start?</h3>
              <p>
	                If you&apos;ve been baptized before&mdash;in the name of the Father, Son,
	                and Holy Spirit&mdash;we believe God&apos;s promise still stands. Instead of
                being re-baptized, we&apos;d love to talk about renewal, next steps,
                and reconnecting with Jesus and His church.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section groups-how-section">
        <div className="container container-narrow">
          <div className="section-header-centered">
            <span className="section-eyebrow">How It Works</span>
            <h2 className="section-title">Simple Steps Toward Baptism</h2>
          </div>

          <div className="groups-steps">
            <div className="groups-step">
              <div className="groups-step-number">1</div>
              <div className="groups-step-content">
                <h3>Reach Out</h3>
                <p>
                  Send us a quick note and let us know you&apos;re interested in
	                  baptism for you or your child. You don&apos;t have to have all the
                  answers or the right words; just start the conversation.
                </p>
              </div>
            </div>

            <div className="groups-step">
              <div className="groups-step-number">2</div>
              <div className="groups-step-content">
                <h3>Have a Conversation</h3>
                <p>
                  We&apos;ll set up a relaxed conversation with a pastor or leader.
                  This is a chance to share your story, ask questions, and walk
                  through what baptism means and how it fits with your situation.
                </p>
              </div>
            </div>

            <div className="groups-step">
              <div className="groups-step-number">3</div>
              <div className="groups-step-content">
                <h3>Celebrate Together</h3>
                <p>
                  We&apos;ll pick a Sunday (or another setting if needed), invite
                  your people, and celebrate God&apos;s work together. We&apos;ll help you
	                  know what to expect so you can focus on the moment, not the
                  details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="container">
          <h2 className="section-title">Baptism FAQs</h2>
          <div className="faq-grid">
            <div className="faq-card">
              <div className="faq-icon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <h3>Do I have to be a member to be baptized?</h3>
              <p>
                No. Baptism is about Jesus&apos; invitation, not a membership
                requirement you have to meet first. If Thrive is becoming home
                for you, we&apos;ll also talk about what it looks like to keep
                growing in faith and community afterward.
              </p>
            </div>

            <div className="faq-card">
              <div className="faq-icon">
                <FontAwesomeIcon icon={faChildReaching} />
              </div>
              <h3>Do you baptize infants?</h3>
              <p>
                Yes. As a Lutheran church, we joyfully baptize infants, trusting
                that God is the One at work through His promises in baptism. We
                also walk with you as parents in what it looks like to keep
                pointing your child to Jesus as they grow.
              </p>
            </div>

            <div className="faq-card">
              <div className="faq-icon">
                <FontAwesomeIcon icon={faHandsPraying} />
              </div>
              <h3>What if I was baptized a long time ago and walked away?</h3>
              <p>
                You don&apos;t need to start over with a new baptism. We believe
                there is one baptism, and that God is faithful even when we
                wander. If that&apos;s your story, we&apos;d love to talk about what
                renewal, confession, and a fresh start in community could look
                like.
              </p>
            </div>

            <div className="faq-card">
              <div className="faq-icon">
                <FontAwesomeIcon icon={faDroplet} />
              </div>
              <h3>What actually happens during the service?</h3>
              <p>
                Baptisms usually happen during a Sunday service. We&apos;ll briefly
                explain what baptism is, ask a few simple questions of faith (for
                adults) or promises (for parents/sponsors), baptize with water in
                the name of the Father, Son, and Holy Spirit, and pray over you
                or your child.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Still Exploring Section */}
      <section className="section quicklinks-section">
        <div className="container">
          <div className="section-header-centered">
            <span className="section-eyebrow">Still Exploring?</span>
            <h2 className="section-title">Not Sure You&apos;re Ready for Baptism?</h2>
          </div>
          <div className="quicklinks-grid">
            <a href="/im-new" className="quicklink-card">
              <div className="quicklink-icon">
                <FontAwesomeIcon icon={faCalendarCheck} />
              </div>
              <h3>I&apos;m New or Just Curious</h3>
              <p>
                Get a bigger picture of who we are, what we believe, and what to
                expect on a Sunday before you take a step like baptism.
              </p>
              <span className="quicklink-action">Start Here</span>
            </a>
            <a href="/sermons" className="quicklink-card">
              <div className="quicklink-icon">
                <FontAwesomeIcon icon={faCirclePlay} />
              </div>
              <h3>Watch a Message</h3>
              <p>
                Listen to recent messages to hear more teaching and get a feel
                for Sundays at Thrive.
              </p>
              <span className="quicklink-action">Browse Messages</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container container-narrow">
          <div className="cta-content">
            <h2>Ready to Talk About Baptism?</h2>
            <p>
              Whether you&apos;re ready to schedule a date or you&apos;re just beginning
              to explore what baptism means, we&apos;d love to hear your story and
              walk with you.
            </p>
	            <div className="cta-buttons">
	              <a href="/contact?subject=pastoral#contact-form" className="btn btn-primary btn-lg">
                <FontAwesomeIcon icon={faEnvelope} /> I&apos;m Interested in Baptism
              </a>
            </div>
            <p className="cta-note">
              You can also mention baptism to any leader or volunteer on Sunday
              and we&apos;ll help you connect with the right person.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
