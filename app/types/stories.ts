/**
 * A related link shown alongside a story's call-to-action (e.g. a relevant ministry).
 */
export interface StoryLink {
  href: string;
  label: string;
}

/**
 * A single testimony / "Why Thrive?" story. Hardcoded static content -- no API, no DB.
 */
export interface Story {
  slug: string;
  name: string;
  title: string;
  summary: string;
  order: number;
  isActive: boolean;
  publishedDate: string; // ISO date (YYYY-MM-DD) — original video publish date
  youtubeId?: string;
  vimeoId?: string;
  audioUrl?: string;
  photoUrl?: string;
  imageUrl?: string; // explicit OG/JSON-LD image (e.g. Vimeo thumbnail); else YouTube thumb or site default
  links?: StoryLink[]; // optional related links shown next to the page CTA
  transcript: string;
}
