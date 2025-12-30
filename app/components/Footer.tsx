import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 className="footer-logo">Thrive Community Church</h3>
            <p className="footer-tagline">You Belong</p>
            <p className="footer-affiliation">
              A congregation of the <a href="https://www.lcms.org/" target="_blank" rel="noopener noreferrer">Lutheran Church—Missouri Synod</a>
            </p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/im-new">I&apos;m New</Link></li>
              <li><Link href="/sermons">Sermons</Link></li>
              <li><Link href="/podcast">Podcast</Link></li>
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Get Connected</h4>
            <ul>
              <li><Link href="/baptism">Baptism</Link></li>
              <li><Link href="/small-groups">Home Huddles</Link></li>
              <li><Link href="/get-involved">Get Involved</Link></li>
              <li><Link href="/ministries/college">ThriveFGCU</Link></li>
              <li><a href="https://goo.gl/cT3s8e" target="_blank" rel="noopener noreferrer">Give</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>20041 S. Tamiami Trail #1<br />Estero, FL 33928</p>
            <p><a href="tel:+12396873430">(239) 687-3430</a></p>
            <p><a href="mailto:info@thrive-fl.org">info@thrive-fl.org</a></p>
          </div>
          <div className="footer-social">
            <h4>Connect With Us</h4>
            <div className="social-links">
              <a href="https://www.facebook.com/thriveFL" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="https://www.instagram.com/thrive_fl" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://x.com/Thrive_FL" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X">
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
              <a href="https://www.youtube.com/channel/UC47Nme86YGrVy1lY15rF3ig" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Thrive Community Church. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

