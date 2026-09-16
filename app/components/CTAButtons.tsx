import { ReactNode } from "react";
import styles from "./CTAButtons.module.css";

interface CTAButtonsProps {
  children: ReactNode;
  /** "large" is reserved for the hero and intro sections, which use bigger buttons and more breathing room. */
  size?: "default" | "large";
  className?: string;
}

export default function CTAButtons({ children, size = "default", className }: CTAButtonsProps) {
  const classes = [styles.ctaButtons, size === "large" && styles.large, className]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}
