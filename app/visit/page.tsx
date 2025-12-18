import { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faLocationDot,
  faPhone,
  faArrowRight,
  faDiamondTurnRight,
  faRoad,
  faRoute,
} from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Visit Us | Thrive Community Church",
  description: "Plan your visit to Thrive Community Church in Estero, FL. Sundays at 10 AM at 20041 S. Tamiami Trail. Get directions, parking info, and what to expect.",
  openGraph: {
    title: "Visit Us | Thrive Community Church",
    description: "Plan your visit to Thrive Community Church in Estero, FL. Sundays at 10 AM.",
    url: "https://thrive-fl.org/visit",
  },
};

export default function VisitPage() {
  return (
    <div className="page-wrapper">
      {/* Page Hero Section */}
      <section className="page-hero page-hero-visit">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Come As You Are</h1>
          <p className="page-hero-subtitle">
            Sunday mornings at 10. Coffee&apos;s hot. Seats are open.
          </p>
        </div>
      </section>

      {/* Location Info Section */}
      <section className="section visit-info-section">
        <div className="container">
          <div className="visit-info-cards">
            <div className="visit-card">
              <div className="visit-card-icon">
                <FontAwesomeIcon icon={faClock} />
              </div>
              <h3>When We Meet</h3>
              <p className="visit-card-highlight">Sundays at 10:00 AM</p>
              <p className="visit-card-detail">Doors open at 9:30 AM</p>
              <p className="visit-card-note">
                Thrive Kids available for ages 6 months through 5th grade
              </p>
            </div>

            <div className="visit-card">
              <div className="visit-card-icon">
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              <h3>Where to Find Us</h3>
              <p className="visit-card-highlight">Estero Ridge Plaza</p>
              <p className="visit-card-detail">
                20041 S. Tamiami Trail #1<br />
                Estero, FL 33928
              </p>
              <p className="visit-card-note">
                Corner of US-41 &amp; Estero Parkway
              </p>
            </div>

            <div className="visit-card">
              <div className="visit-card-icon">
                <FontAwesomeIcon icon={faPhone} />
              </div>
              <h3>Get in Touch</h3>
              <p className="visit-card-highlight">
                <a href="tel:+12396873430">(239) 687-3430</a>
              </p>
              <p className="visit-card-detail">
                <a href="mailto:info@thrive-fl.org">info@thrive-fl.org</a>
              </p>
              <a href="/contact" className="visit-card-link">
                Send us a message <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </div>
          </div>

          <div className="visit-cta-centered">
            <a
              href="https://maps.google.com/maps/dir//Thrive+Community+Church+20041+S+Tamiami+Trl+%23+1+Estero,+FL+33928/@26.4487313,-81.8159419,15z/data=!4m5!4m4!1m0!1m2!1m1!1s0x88db168c655e1ef7:0x82f0ad091c85ad3a"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <FontAwesomeIcon icon={faDiamondTurnRight} />
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Full Width Map Section */}
      <section className="map-section-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4609.462053318237!2d-81.81851682376421!3d26.44873607987428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88db168c655e1ef7%3A0x82f0ad091c85ad3a!2sThrive%20Community%20Church!5e0!3m2!1sen!2sus!4v1766075584314!5m2!1sen!2sus"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Thrive Community Church Location"
        ></iframe>
      </section>

      {/* Driving Directions Section */}
      <section className="section directions-section">
        <div className="container">
          <h2 className="section-title">
            Getting Here
          </h2>
          <p className="directions-intro">
            We&apos;re at the corner of US-41 and Estero Parkway, right between Alico and
            Corkscrew Roads. Look for Estero Ridge Plaza—we&apos;re in the suites facing
            Estero Parkway. There&apos;s plenty of free parking.
          </p>

          <div className="directions-grid">
            <div className="directions-card">
              <h3>
                <FontAwesomeIcon icon={faRoad} />
                Taking US-41
              </h3>
              <div className="directions-content">
                <h4>Coming from Fort Myers or San Carlos Park?</h4>
                <p>
                  Head south on US-41. After you pass Sanibel Blvd., turn left at the next
                  light onto Estero Parkway. We&apos;re immediately on your right in Estero Ridge Plaza.
                </p>
                <h4>Coming from Naples or Bonita Springs?</h4>
                <p>
                  Head north on US-41. Once you pass Broadway Ave., turn right into
                  Estero Ridge Plaza.
                </p>
              </div>
            </div>

            <div className="directions-card">
              <h3>
                <FontAwesomeIcon icon={faRoute} />
                Taking I-75
              </h3>
              <div className="directions-content">
                <h4>From the North (heading South on I-75)?</h4>
                <p>
                  Take Exit 128 and turn right onto Alico Road. Turn left onto Three Oaks
                  Parkway, then right onto Estero Parkway. After the railroad tracks,
                  we&apos;re on your left.
                </p>
                <h4>From the South (heading North on I-75)?</h4>
                <p>
                  Take Exit 123 and turn left onto Corkscrew Road. Turn right onto Three
                  Oaks Parkway, then left onto Estero Parkway. After the railroad tracks,
                  we&apos;re on your left.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

