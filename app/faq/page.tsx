"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChurch,
  faChild,
  faHandHoldingHeart,
  faUsers,
  faMobileScreen,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

// FAQ Data organized by category
export const faqData = {
  visiting: {
    title: "Your First Visit",
    icon: faChurch,
    questions: [
      {
        question: "When and where do you meet?",
        answer: "We gather every Sunday at 10:00 AM at 20041 South Tamiami Trail #1, Estero, FL 33928. You'll find us in Estero Ridge plaza, across Estero Parkway from Walmart. Coffee is always ready when you arrive.",
        link: { text: "Get directions", href: "/visit" },
      },
      {
        question: "What can I expect on a Sunday?",
        answer: "You can expect a warm, welcoming atmosphere. Our services include contemporary worship, a thoughtful message grounded in Scripture, and a community that is genuinely glad to see you. Services last about an hour.",
        link: { text: "Learn more about visiting", href: "/im-new" },
      },
      {
        question: "What should I wear?",
        answer: "Please come as you are. What matters most to us is that you're here.",
      },
      {
        question: "Will I be put on the spot or singled out?",
        answer: "Not at all. We want you to feel at ease. There's no pressure to stand, raise your hand, or introduce yourself. Simply come, be present, and experience the service at your own pace.",
      },
      {
        question: "Can I watch online before visiting in person?",
        answer: "Absolutely. We livestream every Sunday at 10 AM, and all of our past messages are available to watch anytime. It's a wonderful way to become familiar with our community before visiting.",
        link: { text: "Watch a service", href: "/live" },
      },
    ],
  },
  community: {
    title: "Finding Community",
    icon: faUsers,
    questions: [
      {
        question: "How can I connect with others here?",
        answer: "We understand that finding community takes time. After service, please stay for coffee and conversation. We also gather weekly at the pastor's home for a meal and fellowship—it's a meaningful way to build relationships and feel at home.",
        link: { text: "Find community", href: "/small-groups" },
      },
      {
        question: "What are Home Huddles?",
        answer: "Home Huddles are small groups that meet in homes throughout the week. They're a place to study Scripture together, share life's joys and challenges, and develop lasting friendships rooted in faith.",
        link: { text: "Join a Home Huddle", href: "/small-groups" },
      },
      {
        question: "I'm walking through a difficult season. Is there support available?",
        answer: "You don't have to face it alone. Whether you need prayer, a listening ear, or practical support, our church family is here for you. Please reach out—we would be honored to walk alongside you.",
        link: { text: "Request care & prayer", href: "/care" },
      },
      {
        question: "Do you have an online community?",
        answer: "It's coming soon! We're working on new ways to stay connected beyond Sunday. Be on the lookout for an announcement in the near future.",
      },
    ],
  },
  kids: {
    title: "Kids & Families",
    icon: faChild,
    questions: [
      {
        question: "What do you offer for children?",
        answer: "We provide a welcoming space for children to play, color, and explore during worship. It's a relaxed, flexible environment designed to serve your family's needs.",
        link: { text: "Learn about Thrive Kids", href: "/ministries/kids" },
      }
    ],
  },
  faith: {
    title: "Faith & Beliefs",
    icon: faHandHoldingHeart,
    questions: [
      {
        question: "What does Thrive believe?",
        answer: "We believe Jesus Christ is Lord and Savior—the only way to the Father. Our faith rests on the historic 'Solas' of the Reformation: Scripture alone, grace alone, faith alone, Christ alone. Salvation is a gift, not something we earn. Wherever you are on your journey, you're welcome to explore these truths with us.",
        link: { text: "Read our beliefs", href: "/about/beliefs" },
      },
      {
        question: "What denomination is Thrive Community Church?",
        answer: "Thrive Community Church is a congregation of the Lutheran Church—Missouri Synod (LCMS). The LCMS is a Christian church body that confesses the doctrine of the Scriptures. It is committed to the teachings of Martin Luther and the Lutheran Reformation, which emphasize grace, faith, and Scripture as the foundation of Christian belief and practice.",
        link: { text: "Learn more about the LCMS", href: "https://www.lcms.org/" },
      },
      {
        question: "What if I'm unsure about what I believe?",
        answer: "That's perfectly okay. Faith is a journey, and everyone is at a different place along the way. We welcome your questions and doubts. This is a community where honest seekers are encouraged and supported.",
      },
      {
        question: "I'm interested in being baptized. What should I do?",
        answer: "We're so glad to hear that. Baptism is a significant and beautiful step in your walk with Christ. We would love to speak with you about its meaning and help you prepare for this meaningful moment.",
        link: { text: "Learn about baptism", href: "/baptism" },
      },
      {
        question: "How can I grow deeper in my faith?",
        answer: "In addition to Sunday worship, we offer Home Huddles for Bible study and fellowship, the Thrive app for daily spiritual engagement, and a supportive community committed to growing together. Spiritual growth flourishes in the context of relationships.",
        link: { text: "Explore ways to grow", href: "/small-groups" },
      },
      {
        question: "How often do you do communion?",
        answer: "We celebrate communion every Sunday. Participation is always welcome but never required. We observe this sacrament to remember the sacrifice Jesus made for us as a constant reminder of His love and grace.",
      },
    ],
  },
  practical: {
    title: "Practical Information",
    icon: faMobileScreen,
    questions: [
      {
        question: "How can I give?",
        answer: "You may give online through our secure platform, in person during Sunday services, or through the Thrive Church app. Both one-time and recurring giving options are available. Your generosity enables us to serve our community and support those in need.",
        link: { text: "Give online", href: "/give" },
      },
      {
        question: "Is there a church app?",
        answer: "Yes. The Thrive Church app allows you to watch sermons, take notes, stay informed about upcoming events, and stay connected with our community. It's available for both iOS and Android devices.",
        link: { text: "Download the app", href: "/mobile-app" },
      },
      {
        question: "How can I stay informed about church news and events?",
        answer: "You can download our app, follow us on social media, or visit our events page online. We also share announcements during our Sunday services.",
        link: { text: "View upcoming events", href: "/events" },
      },
      {
        question: "How can I serve or volunteer?",
        answer: "We would love to have you serve alongside us. There are many opportunities available—from greeting and hospitality to children's ministry, the tech team, and worship. Serving is also a wonderful way to build meaningful relationships within our community.",
        link: { text: "Get involved", href: "/get-involved" },
      },
      {
        question: "Do you offer internships?",
        answer: "Yes, we offer internships for FGCU students interested in pastoral leadership. We also provide service internships for students who want hands-on experience in worship leading, technical arts, or church management and marketing. If you're interested, please reach out to learn more.",
        link: { text: "Contact us", href: "/contact" },
      },
    ],
  },
};

// Accordion Item Component
function FAQItem({ question, answer, link, isOpen, onClick }: {
  question: string;
  answer: string;
  link?: { text: string; href: string };
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className={`faq-accordion-item ${isOpen ? "faq-accordion-item--open" : ""}`}>
      <button
        className="faq-accordion-header"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="faq-accordion-toggle">
          <FontAwesomeIcon icon={isOpen ? faMinus : faPlus} />
        </span>
        <span className="faq-accordion-question">{question}</span>
      </button>
      <div className={`faq-accordion-content ${isOpen ? "faq-accordion-content--open" : ""}`}>
        <div className="faq-accordion-answer">
          <p>{answer}</p>
          {link && (
            <Link href={link.href} className="faq-accordion-link">
              {link.text} <span className="faq-link-arrow">→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (categoryKey: string, index: number) => {
    const key = `${categoryKey}-${index}`;
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const categories = Object.entries(faqData);

  return (
    <div className="page-wrapper">
      {/* Hero Section */}
      <section className="page-hero page-hero-faq">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1 className="page-hero-title">Frequently Asked Questions</h1>
          <p className="page-hero-subtitle">
            Everything you need to know about Thrive Community Church
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section faq-page-section">
        <div className="container">
          <div className="faq-page-intro">
            <p>
              Whether you&apos;re planning your first visit or looking to get more involved,
              we&apos;ve got answers. Can&apos;t find what you&apos;re looking for?{" "}
              <Link href="/contact">Contact us</Link> and we&apos;ll be happy to help.
            </p>
          </div>

          <div className="faq-categories">
            {categories.map(([categoryKey, category]) => (
              <div key={categoryKey} className="faq-category">
                <div className="faq-category-header">
                  <h2 className="faq-category-title">{category.title}</h2>
                </div>
                <div className="faq-accordion">
                  {category.questions.map((item, index) => (
                    <FAQItem
                      key={index}
                      question={item.question}
                      answer={item.answer}
                      link={item.link}
                      isOpen={openItems[`${categoryKey}-${index}`] || false}
                      onClick={() => toggleItem(categoryKey, index)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section faq-cta-section">
        <div className="container container-narrow">
          <div className="cta-content">
            <h2>Still Have Questions?</h2>
            <p>
              We&apos;d love to hear from you. Reach out and someone from our team
              will get back to you soon.
            </p>
            <div className="cta-buttons">
              <Link href="/contact" className="btn btn-primary">
                Contact Us
              </Link>
              <Link href="/visit" className="btn btn-outline-white">
                Plan Your Visit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

