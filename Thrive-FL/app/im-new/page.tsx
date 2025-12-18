import { Metadata } from "next";

export const metadata: Metadata = {
  title: "First Time? | Thrive Community Church",
  description: "New to Thrive? Here's what to expect. Relaxed atmosphere, great coffee, practical teaching, and Thrive Kids for your little ones. No pressure—just people.",
  openGraph: {
    title: "First Time? | Thrive Community Church",
    description: "New to Thrive? Here's what to expect. Relaxed atmosphere, great coffee, and practical teaching.",
    url: "https://thrive-fl.org/im-new",
  },
};

export default function ImNewPage() {
  return (
    <div className="page-wrapper">
      {/* Page Hero Section */}
      <section className="page-hero">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">First Time?</h1>
          <p className="page-hero-subtitle">
            We get it—new places can feel awkward. Here&apos;s what to expect.
          </p>
        </div>
      </section>

      {/* Welcome Intro Section */}
      <section className="section intro-section">
        <div className="container container-narrow">
          <div className="intro-content">
            <h2 className="section-title">No Pressure. Just People.</h2>
            <p className="intro-lead">
              Church shouldn&apos;t feel like a performance you&apos;re not dressed for.
              At Thrive, we&apos;re just regular people figuring out life, faith, and
              everything in between—together.
            </p>
            <p>
              Whether you&apos;re exploring faith for the first time, coming back after
              years away, or just looking for a community that actually feels like
              community—you&apos;re welcome here. No strings attached.
            </p>
            <div className="intro-cta">
              <a href="/visit" className="btn btn-primary">
                <i className="fa-solid fa-location-dot"></i>
                See You Sunday
              </a>
              <a href="/sermons" className="btn btn-outline">
                <i className="fa-solid fa-play"></i>
                Watch a Message
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="container">
          <h2 className="section-title">
            FAQ
          </h2>
          <div className="faq-grid">
            <div className="faq-card">
              <div className="faq-icon">
                <i className="fa-solid fa-mug-hot"></i>
              </div>
              <h3>What&apos;s the vibe?</h3>
              <p>
                Relaxed and real. Grab a coffee when you arrive (it&apos;s free), find a seat
                anywhere you&apos;re comfortable, and enjoy music that actually sounds good.
                Our messages are practical—stuff you can actually use in your week. The
                whole thing wraps up in about an hour.
              </p>
              <a href="/sermons" className="faq-link">
                Preview a recent message <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>

            <div className="faq-card">
              <div className="faq-icon">
                <i className="fa-solid fa-shirt"></i>
              </div>
              <h3>What do people wear?</h3>
              <p>
                Whatever you want. Seriously. Jeans and a t-shirt? Perfect. Dressed up
                because you came from brunch? Also perfect. Our pastor usually rocks
                sneakers. We care way more about you being here than what you&apos;re wearing.
              </p>
            </div>

            <div className="faq-card">
              <div className="faq-icon">
                <i className="fa-solid fa-child-reaching"></i>
              </div>
              <h3>What about my kids?</h3>
              <p>
                They&apos;ll probably have more fun than you. Thrive Kids is designed to be
                the highlight of their week—age-appropriate teaching, awesome leaders,
                and activities they actually enjoy. Available for ages 6 months through
                5th grade every Sunday.
              </p>
              <a href="/ministries/kids" className="faq-link">
                More about Thrive Kids <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>

            <div className="faq-card">
              <div className="faq-icon">
                <i className="fa-solid fa-users"></i>
              </div>
              <h3>How do I actually connect?</h3>
              <p>
                Sunday is just the starting point. Every week we hang out at the
                pastor&apos;s house for dinner, games, and good conversation—it&apos;s a
                great low-pressure way to meet people. We also have Home Huddles
                (small groups) that meet throughout the week to share life and
                support each other.
              </p>
              <a href="/small-groups" className="faq-link">
                Learn more <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Location Quick Info */}
      <section className="section location-cta-section">
        <div className="container container-narrow">
          <div className="location-cta-content">
            <div className="location-cta-info">
              <h2>Ready to check us out?</h2>
              <p className="location-cta-lead">
                Sundays at 10. Coffee&apos;s on us.
              </p>
              <a href="/visit" className="btn btn-primary">
                <i className="fa-solid fa-location-dot"></i>
                Get Directions &amp; Details
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

