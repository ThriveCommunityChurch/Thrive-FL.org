// Service for fetching and parsing Theocology podcast RSS feed

const RSS_FEED_URL = "https://feeds.buzzsprout.com/1803195.rss";
const THEOCOLOGY_LOGO = "https://static.thrive-fl.org/Theocology.png";

export interface TheocologyEpisode {
  id: string; // GUID from RSS
  title: string;
  slug: string; // URL-friendly version of title
  description: string; // Full HTML description
  pubDate: string; // ISO date string
  duration: number; // Duration in seconds
  audioUrl: string;
  imageUrl: string;
  season?: number;
  episode?: number;
}

// Helper to create URL-friendly slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

// Helper to extract text content from HTML
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .trim();
}

// Fetch and parse RSS feed
export async function fetchTheocologyEpisodes(): Promise<TheocologyEpisode[]> {
  try {
    const response = await fetch(RSS_FEED_URL, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status}`);
    }

    const xmlText = await response.text();
    
    // Parse XML using DOMParser (server-side compatible)
    const { parseStringPromise } = await import("xml2js");
    const result = await parseStringPromise(xmlText);
    
    const items = result.rss.channel[0].item || [];
    
    const episodes: TheocologyEpisode[] = items.map((item: any) => {
      const guid = item.guid?.[0]?._ || item.guid?.[0] || "";
      const title = item.title?.[0] || "";
      const description = item["content:encoded"]?.[0] || item.description?.[0] || "";
      const pubDate = item.pubDate?.[0] || "";
      const duration = parseInt(item["itunes:duration"]?.[0] || "0");
      const audioUrl = item.enclosure?.[0]?.$?.url || "";
      const imageUrl = item["itunes:image"]?.[0]?.$?.href || THEOCOLOGY_LOGO;
      const season = parseInt(item["itunes:season"]?.[0] || "0") || undefined;
      const episode = parseInt(item["itunes:episode"]?.[0] || "0") || undefined;

      return {
        id: guid,
        title,
        slug: createSlug(title),
        description,
        pubDate,
        duration,
        audioUrl,
        imageUrl,
        season,
        episode,
      };
    });

    return episodes;
  } catch (error) {
    console.error("Error fetching Theocology episodes:", error);
    return [];
  }
}

// Get a single episode by slug
export async function getEpisodeBySlug(slug: string): Promise<TheocologyEpisode | null> {
  const episodes = await fetchTheocologyEpisodes();
  return episodes.find((ep) => ep.slug === slug) || null;
}

// Get all episode slugs for static generation
export async function getAllEpisodeSlugs(): Promise<string[]> {
  const episodes = await fetchTheocologyEpisodes();
  return episodes.map((ep) => ep.slug);
}

// Format duration from seconds to "XX min"
export function formatDuration(seconds: number): string {
  const minutes = Math.round(seconds / 60);
  return `${minutes} min`;
}

// Format date to readable string
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { 
    month: "long", 
    day: "numeric", 
    year: "numeric" 
  });
}

