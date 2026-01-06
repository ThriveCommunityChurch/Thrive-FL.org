"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTv, faPlay } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { LivestreamOfflineProps } from '../../types/youtube';

/**
 * Friendly offline message component shown when not live streaming
 */
export default function LivestreamOffline({
  heading = "We're Not Live Right Now",
  subtext = "Check back Sunday morning or catch up on a recent sermon.",
  ctaLink = "/sermons",
  ctaText = "Watch a Sermon",
}: LivestreamOfflineProps) {
  return (
    <div className="livestream-offline">
      <div className="livestream-offline-content">
        {/* Icon */}
        <div className="livestream-offline-icon">
          <FontAwesomeIcon icon={faTv} />
        </div>

        {/* Heading */}
        <h2 className="livestream-offline-heading">{heading}</h2>

        {/* Subtext */}
        <p className="livestream-offline-subtext">{subtext}</p>

        {/* CTA Button */}
        <Link href={ctaLink} className="btn btn-primary livestream-offline-cta">
          <FontAwesomeIcon icon={faPlay} />
          {ctaText}
        </Link>
      </div>
    </div>
  );
}

