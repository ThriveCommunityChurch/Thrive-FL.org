"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menu when clicking a link
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <Link href="/" className="logo">
          <Image
            src="https://d2v6hk6f64og35.cloudfront.net/ThriveLogo.png"
            alt="Thrive Community Church"
            width={180}
            height={63}
            priority
          />
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} />
        </button>

        {/* Main Navigation */}
        <nav className={`main-nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li><Link href="/im-new" className="nav-link" onClick={handleLinkClick}>I&apos;m New</Link></li>
            <li><Link href="/visit" className="nav-link" onClick={handleLinkClick}>Visit</Link></li>
            <li className="nav-dropdown">
              <Link href="/about" className="nav-link" onClick={handleLinkClick}>About <FontAwesomeIcon icon={faChevronDown} /></Link>
              <ul className="dropdown-menu">
                <li><Link href="/about/beliefs" onClick={handleLinkClick}>Our Beliefs</Link></li>
                <li><Link href="/about/leadership" onClick={handleLinkClick}>Our Leadership</Link></li>
                <li><Link href="/about/values" onClick={handleLinkClick}>Our Values</Link></li>
              </ul>
            </li>
            <li className="nav-dropdown">
              <span className="nav-link">Connect <FontAwesomeIcon icon={faChevronDown} /></span>
              <ul className="dropdown-menu">
                <li><Link href="/baptism" onClick={handleLinkClick}>Baptism</Link></li>
                <li><Link href="/care" onClick={handleLinkClick}>Care &amp; Prayer</Link></li>
                <li><Link href="/small-groups" onClick={handleLinkClick}>Small Groups</Link></li>
                <li><Link href="/get-involved" onClick={handleLinkClick}>Get Involved</Link></li>
                <li><Link href="/ministries/college" onClick={handleLinkClick}>ThriveFGCU</Link></li>
              </ul>
            </li>
            <li className="nav-dropdown">
              <Link href="/sermons" className="nav-link" onClick={handleLinkClick}>Listen <FontAwesomeIcon icon={faChevronDown} /></Link>
              <ul className="dropdown-menu">
                <li><Link href="/sermons" onClick={handleLinkClick}>Sermons</Link></li>
                <li><Link href="/live" onClick={handleLinkClick}>Watch Live</Link></li>
              </ul>
            </li>
            <li><Link href="/events" className="nav-link" onClick={handleLinkClick}>Events</Link></li>
            <li><Link href="/contact" className="nav-link" onClick={handleLinkClick}>Contact</Link></li>
            <li>
              <a
                href="/give"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link nav-give-btn"
                onClick={handleLinkClick}
              >
                Give
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

