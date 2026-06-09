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
  youtubeId?: string;
  audioUrl?: string;
  photoUrl?: string;
  transcript: string;
}
