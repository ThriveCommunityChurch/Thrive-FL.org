"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

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
            src="/ThriveLogo.png"
            alt="Thrive Community Church"
            width={180}
            height={50}
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
          <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>

        {/* Main Navigation */}
        <nav className={`main-nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li><Link href="/im-new" className="nav-link" onClick={handleLinkClick}>I&apos;m New</Link></li>
            <li><Link href="/visit" className="nav-link" onClick={handleLinkClick}>Visit</Link></li>
            <li className="nav-dropdown">
              <Link href="/about" className="nav-link" onClick={handleLinkClick}>About <i className="fa-solid fa-chevron-down"></i></Link>
              <ul className="dropdown-menu">
                <li><Link href="/about/beliefs" onClick={handleLinkClick}>Our Beliefs</Link></li>
                <li><Link href="/about/leadership" onClick={handleLinkClick}>Our Leadership</Link></li>
                <li><Link href="/about/values" onClick={handleLinkClick}>Our Values</Link></li>
              </ul>
            </li>
            <li><Link href="/sermons" className="nav-link" onClick={handleLinkClick}>Sermons</Link></li>
            <li><Link href="/events" className="nav-link" onClick={handleLinkClick}>Events</Link></li>
            <li><Link href="/contact" className="nav-link" onClick={handleLinkClick}>Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

