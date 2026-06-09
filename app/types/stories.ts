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
  audioUrl?: string;
  photoUrl?: string;
  transcript: string;
}
