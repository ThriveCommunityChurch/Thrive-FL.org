import { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faMobileAlt,
  faServer,
  faBroadcastTower,
  faBrain,
  faRss,
  faGlobe,
  faArrowUpRightFromSquare,
  faUpload,
  faSitemap,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export const metadata: Metadata = {
  title: "Built by Volunteers | Thrive Community Church",
  description: "Discover the volunteer-built tools that power Thrive Community Church — from our mobile app to sermon transcripts. Technology serving our mission.",
  openGraph: {
    title: "Built by Volunteers | Thrive Community Church",
    description: "Discover the volunteer-built tools that power our church. Technology serving our mission.",
    url: "https://thrive-fl.org/developers",
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
    title: "Built by Volunteers | Thrive Community Church",
    description: "Discover the volunteer-built tools that power our church. Technology serving our mission.",
    images: ["https://static.thrive-fl.org/og-image.jpg"],
  },
  alternates: {
    canonical: "https://thrive-fl.org/developers",
  },
};

interface Project {
  icon: IconDefinition;
  name: string;
  description: string;
  tech: string[];
  repo: string;
}

const projects: Project[] = [
  {
    icon: faMobileAlt,
    name: "Thrive Church Official App",
    description: "Cross-platform mobile app for iOS and Android. Stream sermons, take notes, and stay connected with our church community.",
    tech: ["React Native", "TypeScript", "Expo"],
    repo: "ThriveChurchOfficialApp_CrossPlatform",
  },
  {
    icon: faGlobe,
    name: "Thrive-FL.org",
    description: "The site you're on right now. Server-rendered React app with dynamic sermon pages, event integration, and SEO optimization.",
    tech: ["Next.js", "React", "TypeScript"],
    repo: "Thrive-FL.org",
  },
  {
    icon: faBroadcastTower,
    name: "Livestream Controller",
    description: "Desktop app that syncs OBS scenes with ProPresenter slides in real-time, enabling one-click livestream production for volunteers.",
    tech: ["C#", ".NET", "React", "OBS Websocket"],
    repo: "Thrive_Stream_Controller",
  },
  {
    icon: faBrain,
    name: "Sermon AI Pipeline",
    description: "Serverless AI pipeline that transcribes sermons, generates summaries, extracts key points, and publishes to podcast platforms automatically.",
    tech: ["Python", "AWS Lambda", "OpenAI", "RSS"],
    repo: "Sermon_Summarization_Agent",
  },
  {
    icon: faServer,
    name: "Thrive API",
    description: "RESTful backend service managing sermon data, media assets, and content delivery for the mobile app and website.",
    tech: ["C#", ".NET", "MongoDB", "Redis"],
    repo: "ThriveChurchOfficialAPI",
  },
  {
    icon: faUpload,
    name: "Thrive Media Management Tool",
    description: "Internal admin dashboard for uploading sermon recordings, managing metadata, and publishing content to the API.",
    tech: ["Angular", "TypeScript", "RxJS"],
    repo: "ThriveAPIMediaTool",
  },
];

export default function DevelopersPage() {
  return (
    <div className="page-wrapper">
      {/* Page Hero Section */}
      <section className="page-hero page-hero-developers">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Built by Volunteers</h1>
          <p className="page-hero-subtitle">
            Volunteer-built tools that power our church
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section intro-section developers-intro-section">
        <div className="container container-narrow">
          <div className="intro-content">
            <h2 className="section-title">Using Technology in Service of Our Mission</h2>
            <p>
              At Thrive, we believe that if someone can&apos;t make it to church on Sunday, they should still be
              able to hear the Word. If a busy parent wants to revisit a sermon during nap time,
              that should be easy. If someone across the country stumbles onto our podcast, they
              should be able to connect with our community. Since 2017, volunteer-built software
              has helped make that possible — not because we love technology for its own sake, but
              because we believe every tool we build is an opportunity to reach one more person
              with the Gospel. Using our gifts in service of the mission is our way of serving Jesus.
            </p>
            <p>
              Everything we build is self-hosted on AWS and 100% open source. Our APIs, databases,
              AI pipelines, and media storage all run on infrastructure we manage ourselves — which
              means if you&apos;re a church or developer looking to build something similar, you can
              fork our code and run it too. We share everything openly because we believe technology
              should serve the mission, and if what we&apos;ve built can help another church reach
              more people, that&apos;s a win.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section developers-stats-section">
        <div className="container">
          <div className="developers-stats-grid">
            <div className="developers-stat">
              <span className="developers-stat-number">14</span>
              <span className="developers-stat-label">Open Source Projects</span>
            </div>
            <div className="developers-stat">
              <span className="developers-stat-number">9+</span>
              <span className="developers-stat-label">Years of Development</span>
            </div>
            <div className="developers-stat">
              <span className="developers-stat-number">100%</span>
              <span className="developers-stat-label">Volunteer Built</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section developers-projects-section">
        <div className="container">
          <div className="section-header-centered">
            <span className="section-eyebrow">What Powers Thrive</span>
            <h2 className="section-title">Our Projects</h2>
            <p className="section-subtitle">
              Here&apos;s a peek at what we're cooking up & what powers Thrive today.
            </p>
          </div>

          <div className="developers-projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="developers-project-card">
                <div className="developers-project-icon">
                  <FontAwesomeIcon icon={project.icon} />
                </div>
                <div className="developers-project-content">
                  <h3>{project.name}</h3>
                  <p className="developers-project-purpose">{project.description}</p>
                  <div className="developers-project-tech">
                    {project.tech.map((t, i) => (
                      <span key={i} className="developers-tech-badge">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub CTA Section - For Developers */}
      <section className="section developers-cta-section">
        <div className="container container-narrow">
          <div className="cta-content">
            <div className="developers-github-icon">
              <FontAwesomeIcon icon={faGithub} />
            </div>
            <h2>For the Tech-Curious</h2>
            <p>
              Are you a developer? All of our projects are open source and available
              on GitHub. Whether you&apos;re curious about how something works, want to
              contribute, or are looking for ideas for your own church — feel free to explore.
            </p>
            <div className="developers-cta-buttons">
              <a
                href="https://github.com/ThriveCommunityChurch"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                <FontAwesomeIcon icon={faGithub} /> View on GitHub
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="btn-external-icon" />
              </a>
              <a
                href="https://thrivecommunitychurch.github.io/Architecture/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg"
              >
                <FontAwesomeIcon icon={faSitemap} /> Architecture Docs
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="btn-external-icon" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
