import { Metadata } from "next";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPuzzlePiece,
  faPeopleGroup,
  faHeart,
  faEnvelope,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Thrive Kids | Thrive Community Church",
  description: "Thrive Kids offers a dedicated space where children can play and explore during Sunday worship. A relaxed, family-friendly environment for kids of all ages.",
  openGraph: {
    title: "Thrive Kids | Thrive Community Church",
    description: "A dedicated space where kids can play and explore during Sunday worship at Thrive.",
    url: "https://thrive-fl.org/ministries/kids",
  },
};

export default function KidsMinistryPage() {
  const churchEmail = "info@thrive-fl.org";

  const emailTemplate = {
    subject: "Thrive Kids Question - Thrive Community Church",
    body: `Hi Thrive Team,

I have a question about Thrive Kids:

[Please describe your question here]

Child's Name: [Name]
Child's Age: [Age]
Parent/Guardian Name: [Your Name]
Phone: [Your Phone Number]`
  };

  const mailtoLink = `mailto:${churchEmail}?subject=${encodeURIComponent(emailTemplate.subject)}&body=${encodeURIComponent(emailTemplate.body)}`;

  return (
    <div className="page-wrapper">
      {/* Page Hero Section */}
      <section className="page-hero page-hero-kids">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Thrive Kids</h1>
          <p className="page-hero-subtitle">
            Where faith takes root and friendships blossom
          </p>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="section intro-section">
        <div className="container container-narrow">
          <div className="intro-content">
            <h2 className="section-title">A Space Just for Kids</h2>
            <p className="intro-lead">
              At Thrive, we know that sitting through a full service isn&apos;t always
              easy for little ones—and that&apos;s perfectly okay.
            </p>
            <p>
              We have a dedicated kids room where children can play, color, and
              explore during worship. It&apos;s relaxed, it&apos;s flexible, and it&apos;s
              there whenever your family needs it. No sign-ups, no formal programs—just
              a welcoming space where kids can be kids while you connect with God
              and community.
            </p>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="section kids-expect-section">
        <div className="container">
          <div className="section-header-centered">
            <span className="section-eyebrow">What to Expect</span>
            <h2 className="section-title">Sundays at Thrive</h2>
          </div>

          <div className="kids-features-grid">
            <div className="kids-feature-card">
              <div className="kids-feature-image">
                <Image
                  src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80"
                  alt="Kids playing together"
                  width={600}
                  height={400}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div className="kids-feature-content">
                <div className="kids-feature-icon">
                  <FontAwesomeIcon icon={faPuzzlePiece} />
                </div>
                <h3>A Room to Play</h3>
                <p>
                  Our kids room is stocked with toys, games, coloring supplies, and
                  activities to keep children entertained. Kids can come and go as
                  they please—whatever works best for your family.
                </p>
              </div>
            </div>

            <div className="kids-feature-card">
              <div className="kids-feature-image">
                <Image
                  src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&q=80"
                  alt="Family at church"
                  width={600}
                  height={400}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div className="kids-feature-content">
                <div className="kids-feature-icon">
                  <FontAwesomeIcon icon={faPeopleGroup} />
                </div>
                <h3>Flexible & Family-Friendly</h3>
                <p>
                  We value families worshiping together. Keep your kids with you
                  in the service, let them hang out in the kids room, or do a mix
                  of both—whatever helps your family thrive.
                </p>
              </div>
            </div>

            <div className="kids-feature-card">
              <div className="kids-feature-image">
                <Image
                  src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80"
                  alt="Children exploring"
                  width={600}
                  height={400}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div className="kids-feature-content">
                <div className="kids-feature-icon">
                  <FontAwesomeIcon icon={faHeart} />
                </div>
                <h3>No Pressure</h3>
                <p>
                  There&apos;s no formal check-in process or structured program. Just
                  a comfortable space for kids to hang out. Parents are welcome to
                  stay with younger children or step in anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section kids-ages-section">
        <div className="container container-narrow">
          <div className="section-header-centered">
            <span className="section-eyebrow">How It Works</span>
            <h2 className="section-title">Keep It Simple</h2>
          </div>

          <div className="groups-steps">
            <div className="groups-step">
              <div className="groups-step-number">1</div>
              <div className="groups-step-content">
                <h3>Arrive on Sunday</h3>
                <p>
                  Come as you are! The kids room is open during our 10 AM service.
                </p>
              </div>
            </div>

            <div className="groups-step">
              <div className="groups-step-number">2</div>
              <div className="groups-step-content">
                <h3>Use It When You Need It</h3>
                <p>
                  Drop off your kids at any point during service, or let them come
                  and go as they need. It&apos;s totally flexible.
                </p>
              </div>
            </div>

            <div className="groups-step">
              <div className="groups-step-number">3</div>
              <div className="groups-step-content">
                <h3>Stay Connected</h3>
                <p>
                  The room is right nearby, so you&apos;re never far. Pop in and check
                  on them whenever you&apos;d like.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section kids-cta-section">
        <div className="container container-narrow">
          <div className="cta-content">
            <h2>Questions About Thrive Kids?</h2>
            <p>
              We&apos;d love to tell you more about what we have for your family.
              Reach out anytime—or just show up Sunday and we&apos;ll take care of the rest!
            </p>
            <div className="cta-buttons">
              <a href={mailtoLink} className="btn btn-primary">
                <FontAwesomeIcon icon={faEnvelope} /> Ask a Question
              </a>
              <a href="/visit" className="btn btn-outline-white">
                <FontAwesomeIcon icon={faCalendar} /> Plan Your Visit
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

