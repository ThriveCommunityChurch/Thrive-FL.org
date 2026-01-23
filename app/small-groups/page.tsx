import { Metadata } from "next";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faComments,
  faHandHoldingHeart,
  faDice,
  faPeopleGroup,
  faEnvelope,
  faPhone,
  faChurch,
} from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Small Groups | Thrive Community Church",
  description: "Join a Home Huddle at Thrive Community Church. Small groups where real community happens—share life, grow in faith, and build lasting friendships.",
  openGraph: {
    title: "Small Groups | Thrive Community Church",
    description: "Find your people. Join a Home Huddle where real community happens.",
    url: "https://thrive-fl.org/small-groups",
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
    title: "Small Groups | Thrive Community Church",
    description: "Find your people. Join a Home Huddle where real community happens.",
    images: ["https://d2v6hk6f64og35.cloudfront.net/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thrive-fl.org/small-groups",
  },
};

export default function SmallGroupsPage() {
	  return (
    <div className="page-wrapper">
      {/* Page Hero Section */}
      <section className="page-hero page-hero-groups">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Small Groups</h1>
          <p className="page-hero-subtitle">
            Where acquaintances become family
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section intro-section">
        <div className="container container-narrow">
          <div className="intro-content">
            <h2 className="section-title">Find Your People</h2>
            <p className="intro-lead">
              Sunday mornings are great, but real community happens when we do
              life together throughout the week. That&apos;s what Home Huddles are all about.
            </p>
            <p>
              Home Huddles are small groups of people who meet regularly to share meals,
              discuss faith, support one another through life&apos;s ups and downs, and
              actually become friends—the kind who show up when things get hard.
            </p>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="section groups-features-section">
        <div className="container">
          <div className="groups-features-grid">
            <div className="groups-feature-card">
              <div className="groups-feature-image">
                <Image
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80"
                  alt="Friends gathering together"
                  width={600}
                  height={400}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div className="groups-feature-content">
                <div className="groups-feature-icon">
                  <FontAwesomeIcon icon={faUtensils} />
                </div>
                <h3>Share a Meal</h3>
                <p>
                  There&apos;s something about gathering around a table that breaks down
                  walls. Most huddles share a meal together—food has a way of turning
                  strangers into friends.
                </p>
              </div>
            </div>

            <div className="groups-feature-card">
              <div className="groups-feature-image">
                <Image
                  src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=600&q=80"
                  alt="Group discussion"
                  width={600}
                  height={400}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div className="groups-feature-content">
                <div className="groups-feature-icon">
                  <FontAwesomeIcon icon={faComments} />
                </div>
                <h3>Real Conversations</h3>
                <p>
                  No judgment, no pretense—just honest conversations about faith, doubt,
                  life, and everything in between. Questions are welcome here.
                </p>
              </div>
            </div>

            <div className="groups-feature-card">
              <div className="groups-feature-image">
                <Image
                  src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80"
                  alt="Friends supporting each other"
                  width={600}
                  height={400}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div className="groups-feature-content">
                <div className="groups-feature-icon">
                  <FontAwesomeIcon icon={faHandHoldingHeart} />
                </div>
                <h3>Support Each Other</h3>
                <p>
                  Life is better together. Huddles are where people celebrate wins,
                  carry burdens, and remind each other we&apos;re not alone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section groups-how-section">
        <div className="container container-narrow">
          <div className="section-header-centered">
            <span className="section-eyebrow">How It Works</span>
            <h2 className="section-title">Getting Connected Is Easy</h2>
          </div>

          <div className="groups-steps">
            <div className="groups-step">
              <div className="groups-step-number">1</div>
              <div className="groups-step-content">
                <h3>Reach Out</h3>
                <p>
                  Let us know you&apos;re interested! Tell us a bit about yourself,
                  your schedule, and what you&apos;re looking for.
                </p>
              </div>
            </div>

            <div className="groups-step">
              <div className="groups-step-number">2</div>
              <div className="groups-step-content">
                <h3>Get Matched</h3>
                <p>
                  We&apos;ll connect you with a group that fits your life stage,
                  interests, and availability.
                </p>
              </div>
            </div>

            <div className="groups-step">
              <div className="groups-step-number">3</div>
              <div className="groups-step-content">
                <h3>Show Up</h3>
                <p>
                  Just come as you are. No prep required—just a willingness to
                  be present and open.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Hangout Section */}
      <section className="section groups-hangout-section">
        <div className="container">
          <div className="groups-hangout-content">
            <div className="groups-hangout-image">
              <Image
                src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80"
                alt="Friends gathering for dinner"
                width={800}
                height={600}
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
            <div className="groups-hangout-text">
              <span className="section-eyebrow">Weekly Gathering</span>
              <h2>Hangouts at the Pastor&apos;s House</h2>
              <p>
                Looking for an easy way to get connected? <strong>Every Sunday at 5 PM</strong>, we gather
                at the pastor&apos;s house for a relaxed evening of food, fun, and
                friendship.
              </p>
              <ul className="groups-hangout-list">
                <li>
                  <FontAwesomeIcon icon={faUtensils} />
                  <span>Share a meal together</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faDice} />
                  <span>Play games and have fun</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faPeopleGroup} />
                  <span>Spend time together as a community</span>
                </li>
              </ul>
              <p>
                It&apos;s a wonderful way to build friendships and be part of the community.
                If you&apos;re new and looking for a comfortable place to meet people,
                this is a great first step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote/Testimonial Section */}
      <section className="section groups-quote-section">
        <div className="container container-narrow">
          <blockquote className="groups-quote">
            <p>
              &ldquo;I came to Thrive looking for a church. I found a family.
              My Home Huddle has been there through job changes, health scares,
              and everything in between. These are my people.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section groups-cta-section">
        <div className="container container-narrow">
          <div className="cta-content">
            <h2>Ready to Find Your Huddle?</h2>
            <p>
              We&apos;d love to help you get connected. Drop us a line and we&apos;ll
              reach out to help you find the right fit for your life.
            </p>
            <div className="cta-buttons">
	              <a href="/contact?subject=general#contact-form" className="btn btn-primary btn-lg">
                <FontAwesomeIcon icon={faEnvelope} /> I&apos;m Interested
              </a>
            </div>
            <p className="cta-note">
              Or just ask about groups on Sunday—we&apos;ll point you in the right direction!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="section groups-contact-section">
        <div className="container">
          <div className="groups-contact-grid">
            <div className="groups-contact-card">
              <div className="groups-contact-icon">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <h3>Call Us</h3>
              <p><a href="tel:+12396873430">(239) 687-3430</a></p>
            </div>

            <div className="groups-contact-card">
              <div className="groups-contact-icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <h3>Email Us</h3>
              <p><a href="mailto:info@thrive-fl.org">info@thrive-fl.org</a></p>
            </div>

            <div className="groups-contact-card">
              <div className="groups-contact-icon">
                <FontAwesomeIcon icon={faChurch} />
              </div>
              <h3>Ask on Sunday</h3>
              <p>Find us at the welcome table!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

