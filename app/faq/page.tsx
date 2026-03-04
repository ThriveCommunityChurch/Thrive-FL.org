"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { faqData } from "./faqData";

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

