import { Metadata } from "next";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHand } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Our Leadership | Thrive Community Church",
  description: "Meet the leadership team at Thrive Community Church. Real people with real faith, here to serve and guide our community in Estero, FL.",
  openGraph: {
    title: "Our Leadership | Thrive Community Church",
    description: "Meet the team guiding Thrive Community Church in faith and service.",
    url: "https://thrive-fl.org/about/leadership",
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
    title: "Our Leadership | Thrive Community Church",
    description: "Meet the team guiding Thrive Community Church in faith and service.",
    images: ["https://static.thrive-fl.org/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thrive-fl.org/about/leadership",
  },
};

export default function TeamPage() {
  return (
    <div className="page-wrapper">
      {/* Page Hero Section */}
      <section className="page-hero page-hero-team">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Our Leadership</h1>
          <p className="page-hero-subtitle">
            Real people. Real faith. Here to serve.
          </p>
        </div>
      </section>

      {/* Team Intro */}
      <section className="section team-intro-section">
        <div className="container container-narrow">
          <p className="intro-text">
            We&apos;re not perfect—just passionate about helping people discover what it
            means to thrive in their relationship with Jesus and each other.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section team-section">
        <div className="container">
          <div className="team-grid">
            <div className="team-card">
              <div className="team-card-image">
                <Image src="/19229807.jpeg" alt="Dr. John Roth" width={300} height={300} style={{ objectFit: 'cover' }} />
              </div>
              <div className="team-card-content">
                <h3>Dr. John Roth</h3>
                <span className="team-role">Mission Pastor</span>
                <p>
                  John has been a follower of Jesus since childhood and a pastor since 1987.
                  He&apos;s led ministries in Alabama, California, and Florida, including campus
                  ministries at LSU and UF. He holds a doctorate from Asbury Theological Seminary.
                </p>
                <p>
                  He and Lisa have been married since 1996 and have two kids, Justin and Emma.
                  When he&apos;s not preaching, you&apos;ll find him cooking, reading, or keeping up with his family.
                </p>
                <a href="mailto:John@thrive-fl.org" className="team-email">
                  <FontAwesomeIcon icon={faEnvelope} /> John@thrive-fl.org
                </a>
              </div>
            </div>

            <div className="team-card">
              <div className="team-card-image">
                <Image src="/060.jpg" alt="Wyatt Baggett" width={300} height={300} style={{ objectFit: 'cover' }} />
              </div>
              <div className="team-card-content">
                <h3>Wyatt Baggett</h3>
                <span className="team-role">Director of Technical Arts</span>
                <p>
                  Wyatt leads the Technical Arts team at Thrive. Originally from the Tampa area,
                  he graduated from FGCU with a degree in Software Engineering. He&apos;s been
                  volunteering since Thrive&apos;s very first gathering in August 2014.
                </p>
                <p>
                  His dedication earned him the Excellence in Civic Engagement Award from FGCU.
                  His passion? Audio engineering—and making sure every Sunday sounds great.
                </p>
                <a href="mailto:Wyatt@thrive-fl.org" className="team-email">
                  <FontAwesomeIcon icon={faEnvelope} /> Wyatt@thrive-fl.org
                </a>
              </div>
            </div>

            <div className="team-card">
              <div className="team-card-image">
                <Image src="/1641255949448.jpg" alt="James Husni" width={300} height={300} style={{ objectFit: 'cover' }} />
              </div>
              <div className="team-card-content">
                <h3>James Husni</h3>
                <span className="team-role">Worship Leader</span>
                <p>
                  A native of Cleveland, Ohio, and a graduate of Wheaton College, James has been part of the Thrive family since 2017.
                  He&apos;s played on some of the biggest stages in Christian music, including Willow Creek Community Church in Chicago.
                </p>
                <p>
                  When he&apos;s not leading worship, you&apos;ll find him playing with his two children or making music of his own. He&apos;s always willing to give advice on how to make a good brisket.
                </p>
                <a href="mailto:James@thrive-fl.org" className="team-email">
                  <FontAwesomeIcon icon={faEnvelope} /> James@thrive-fl.org
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="section cta-section">
        <div className="container container-narrow">
          <h2>Want to Get Involved?</h2>
          <p>
            We&apos;re always looking for people who want to serve. Whether it&apos;s greeting,
            kids ministry, tech, or something else—there&apos;s a place for you.
          </p>
          <a href="/contact" className="btn btn-primary">
            <FontAwesomeIcon icon={faHand} /> Let&apos;s Connect
          </a>
        </div>
      </section>
    </div>
  );
}