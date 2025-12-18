import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Story | Thrive Community Church",
  description: "Learn about Thrive Community Church's journey from a campus ministry at FGCU to a thriving community in Estero, FL. A place of renewal, safety, and belonging since 2014.",
  openGraph: {
    title: "Our Story | Thrive Community Church",
    description: "From campus ministry to thriving community. Discover our journey since 2014.",
    url: "https://thrive-fl.org/about",
  },
};

// Timeline data - church history milestones
const timelineEvents = [
  {
    year: "2013",
    title: "The Plan for Thrive",
    description:
      "Before Thrive Community Church was a church, it was a plan. In 2013, a strategic planning group began praying and dreaming about what a church on campus could look like.",
    image: "490660251.jpg",
    attachment: 'https://lsfm.global/uploads/files/MA-May-2014-Thrive-Community-Church-A-Mission-of-the-LCMS-by-John-D-Roth.pdf'
  },
  {
    year: "2014",
    title: "Thrive Community Church Launches",
    description:
      "On August 24th, Thrive Community Church launched at Florida Gulf Coast University in Estero. As a mission congregation of the Lutheran Church—Missouri Synod, Thrive began creating a place of renewal, safety, and belonging for students and members of the Estero community seeking spiritual growth.",
    image: "118419975.jpg",
  },
  {
    year: "2015",
    title: "First Easter Outdoor Service",
    description:
      "Thrive held its first outdoor Easter service, celebrating the resurrection of Christ together as a growing community in the beautiful Southwest Florida sunshine.",
    image: "492542856.jpg",
  },
  {
    year: "2016",
    title: "Finding Our Space",
    description:
      "Thrive moved into our current home at Estero Ridge Plaza—a space previously occupied by another congregation. This gave us room to grow as families and community members joined our mission.",
    image: "495333893.jpg",
  },
  {
    year: "2017",
    title: "Haiti Mission Trip",
    description:
      "Our first international mission trip to Haiti, where we served alongside local communities and shared the love of Christ across borders.",
    image: "498025270.jpg",
  },
  {
    year: "2019",
    title: "Return to Haiti",
    description:
      "Thrive returned to Haiti for a second mission trip, continuing to build relationships and serve those in need.",
    image: "50770352.jpg",
  },
  {
    year: "2022",
    title: "Hurricane Ian",
    description:
      "After the devastating impact of Hurricane Ian, Thrive joined forces with local churches and organizations to provide relief and support to those affected.",
    image: "502411344.jpg",
  },
  {
    year: "2024",
    title: "Guatemala Mission & 10th Anniversary",
    description:
      "A milestone year! Thrive celebrated our 10th anniversary on August 24th, and embarked on our first mission trip to Guatemala—continuing our commitment to serve both locally and globally.",
    image: "485176133.jpg",
  },
  {
    year: "Future",
    title: "Our New Home",
    description:
      "We're in the planning phases for our new home. Stay tuned for more details!",
    image: "DJI_0027.jpg",
  },
];

export default function AboutPage() {
  return (
    <div className="page-wrapper">
      {/* Page Hero Section */}
      <section className="page-hero page-hero-about">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Our Story</h1>
          <p className="page-hero-subtitle">
            A place of renewal, safety, and belonging
          </p>
        </div>
      </section>

      {/* Mission & Story Section */}
      <section className="section about-mission-section">
        <div className="container container-narrow">
          <div className="about-mission-content">
            <h2 className="section-title">From Campus to Community</h2>
            <p className="about-mission-lead">
              Thrive exists to <strong>bless and disciple people</strong> so that they thrive
              in their relationship with Jesus Christ and others, creating Christian community.
            </p>
            <p>
              Thrive began in <strong>August 2014</strong> as a church mission plant, gathering
              for worship in a small room on the campus of Florida Gulf Coast University. Our
              vision was simple: reach college students and young professionals with the
              life-changing message of Jesus.
            </p>
            <p>
              From the start, we were blessed with support from some of the founding members
              of FGCU itself—people who believed in the importance of a gospel presence on
              campus. What started as a handful of people has grown into a diverse community
              of all ages and backgrounds.
            </p>
            <p>
              In 2016, we moved into our current home at Estero Ridge Plaza. Today, we&apos;re
              looking ahead: we&apos;ve acquired land directly across from FGCU where we&apos;re
              planning to build a permanent home for Thrive.
            </p>
            <p>
              But no matter where we meet, our mission stays the same: blessing and discipling
              people so they thrive in their relationship with Jesus and others.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section about-timeline-section">
        <div className="container">
          <h2 className="section-title">How We Got Here</h2>
          
          <div className="timeline">
            {timelineEvents.map((event, index) => (
              <div 
                key={index} 
                className={`timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
              >
                <div className="timeline-marker">
                  <span className="timeline-year">{event.year}</span>
                </div>
                <div className="timeline-content">
                  <div className="timeline-card">
                    <div className="timeline-image">
                      <Image
                        src={`/${event.image}`}
                        alt={event.title}
                        width={400}
                        height={300}
                        style={{ objectFit: 'cover', width: '100%', height: 'auto' }}
                      />
                    </div>
                    <div className="timeline-text">
                      <h3>{event.title}</h3>
                      <p>{event.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore More Section */}
      <section className="section about-explore-section">
        <div className="container">
          <h2 className="section-title">Explore More</h2>
          <div className="about-explore-grid">
            <Link href="/about/beliefs" className="about-explore-card">
              <div className="about-explore-icon">
                <i className="fa-solid fa-book-bible"></i>
              </div>
              <h3>Our Beliefs</h3>
              <p>Grace. Faith. Scripture. Discover the foundational truths we hold.</p>
              <span className="about-explore-link">
                Learn More <i className="fa-solid fa-arrow-right"></i>
              </span>
            </Link>

            <Link href="/about/leadership" className="about-explore-card">
              <div className="about-explore-icon">
                <i className="fa-solid fa-users"></i>
              </div>
              <h3>Our Leadership</h3>
              <p>Meet the team guiding our community in faith and service.</p>
              <span className="about-explore-link">
                Meet the Team <i className="fa-solid fa-arrow-right"></i>
              </span>
            </Link>

            <Link href="/about/values" className="about-explore-card">
              <div className="about-explore-icon">
                <i className="fa-solid fa-heart"></i>
              </div>
              <h3>Our Values</h3>
              <p>The core principles that shape everything we do at Thrive.</p>
              <span className="about-explore-link">
                Explore Values <i className="fa-solid fa-arrow-right"></i>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section about-cta">
        <div className="container container-narrow">
          <div className="cta-content">
            <h2>Come Experience Thrive</h2>
            <p>
              We&apos;d love to meet you. Join us for worship and discover what it means
              to belong to a community that helps you thrive.
            </p>
            <div className="cta-buttons">
              <a href="/visit" className="btn btn-primary">
                <i className="fa-solid fa-calendar"></i> Plan Your Visit
              </a>
              <a href="/contact" className="btn btn-outline-white">
                <i className="fa-solid fa-comments"></i> Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

