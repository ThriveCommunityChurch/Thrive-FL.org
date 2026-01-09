import { Metadata } from "next";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faChurch,
  faGamepad,
  faUsers,
  faMapPin,
  faEnvelope,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export const metadata: Metadata = {
  title: "ThriveFGCU | College Ministry | Thrive Community Church",
  description: "ThriveFGCU is a college ministry for Florida Gulf Coast University students. Join us for community, faith, and fun - multiple gatherings each week on campus and at church.",
  openGraph: {
    title: "ThriveFGCU | College Ministry",
    description: "A college ministry for FGCU students. Community, faith, and fun.",
    url: "https://thrive-fl.org/ministries/college",
  },
};

export default function CollegeMinistryPage() {
	  return (
    <div className="page-wrapper">
      {/* Page Hero Section */}
      <section className="page-hero page-hero-college">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">ThriveFGCU</h1>
          <p className="page-hero-subtitle">
            Faith, friends, and fun for FGCU students
          </p>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="section intro-section">
        <div className="container container-narrow">
          <div className="intro-content">
            <h2 className="section-title">Your College Community</h2>
            <p className="intro-lead">
              College is about more than classes and exams—it&apos;s about finding
              your people and discovering who you&apos;re meant to be.
            </p>
            <p>
              ThriveFGCU is a community of Florida Gulf Coast University students
              who are navigating faith, friendship, and the college journey together.
              Whether you grew up in church or you&apos;re just starting to explore
              faith, there&apos;s a place for you here.
            </p>
          </div>
        </div>
      </section>

      {/* Weekly Schedule Section */}
      <section className="section college-schedule-section">
        <div className="container">
          <div className="section-header-centered">
            <span className="section-eyebrow">Join Us</span>
            <h2 className="section-title">Weekly Gatherings</h2>
            <p className="section-subtitle">
              Multiple opportunities to connect each week—on campus and at church
            </p>
          </div>

          <div className="college-schedule-grid">
            <div className="college-schedule-card">
              <div className="college-schedule-icon">
                <FontAwesomeIcon icon={faGamepad} />
              </div>
              <div className="college-schedule-day">Monday</div>
              <h3>Large Group Night</h3>
              <div className="college-schedule-details">
                <p><FontAwesomeIcon icon={faClock} /> 6:00 PM</p>
                <p><FontAwesomeIcon icon={faMapPin} /> AB9, Room 138</p>
              </div>
              <p className="college-schedule-desc">
                Fun activities, games, and good vibes with the whole crew
              </p>
            </div>

            <div className="college-schedule-card college-schedule-card-highlight">
              <div className="college-schedule-icon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
              <div className="college-schedule-day">Tuesday &amp; Thursday</div>
              <h3>Lawn Games</h3>
              <div className="college-schedule-details">
                <p><FontAwesomeIcon icon={faClock} /> 11:45 AM</p>
                <p><FontAwesomeIcon icon={faMapPin} /> Library Lawn</p>
              </div>
              <p className="college-schedule-desc">
                Casual hangout between classes—come play, meet people, no commitment
              </p>
            </div>

            <div className="college-schedule-card">
              <div className="college-schedule-icon">
                <FontAwesomeIcon icon={faChurch} />
              </div>
              <div className="college-schedule-day">Wednesday</div>
              <h3>Equipped Group</h3>
              <div className="college-schedule-details">
                <p><FontAwesomeIcon icon={faClock} /> 6:00 PM</p>
                <p><FontAwesomeIcon icon={faMapPin} /> Thrive Church</p>
              </div>
              <p className="college-schedule-desc">
                Come for food, fellowship, and real conversations about faith and life
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why ThriveFGCU Section */}
      <section className="section college-why-section">
        <div className="container">
          <div className="welcome-content">
            <div className="welcome-text">
              <span className="section-eyebrow">Why ThriveFGCU</span>
              <h2 className="section-title-left">More Than a Campus Club</h2>
              <p>
                ThriveFGCU isn&apos;t about checking a box or adding another meeting
                to your schedule. It&apos;s about finding genuine friendships, asking
                real questions about faith, and having a community that supports you
                through the ups and downs of college life.
              </p>
              <p>
                No matter where you are on your faith journey—whether you&apos;ve been
                following Jesus for years or you&apos;re not sure what you believe—you&apos;re
                welcome here. Come as you are.
              </p>
              <a
                href="https://www.instagram.com/thrivefgcu/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <FontAwesomeIcon icon={faInstagram} />
                Follow Us on Instagram
              </a>
            </div>
            <div className="welcome-image">
              <div className="image-placeholder">
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80"
                  alt="College students hanging out"
                  width={600}
                  height={400}
                  sizes="(max-width: 768px) 100vw, 600px"
                  quality={75}
                  style={{ objectFit: "cover", width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section college-cta-section">
        <div className="container container-narrow">
          <div className="cta-content">
            <h2>Ready to Connect?</h2>
            <p>
              The easiest way to get involved is to just show up! Check out our
              Instagram for the latest updates, or reach out if you have any questions.
            </p>
	            <div className="cta-buttons">
	              <a
	                href="https://www.instagram.com/thrivefgcu/"
	                target="_blank"
	                rel="noopener noreferrer"
	                className="btn btn-primary"
	              >
	                <FontAwesomeIcon icon={faInstagram} /> @thrivefgcu
	              </a>
	              <a href="/contact?subject=general#contact-form" className="btn btn-outline-white">
                <FontAwesomeIcon icon={faEnvelope} /> Ask a Question
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
