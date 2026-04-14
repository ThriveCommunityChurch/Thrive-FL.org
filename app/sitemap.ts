import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { getSitemapData } from "./services/sermonService";
import { fetchTheocologyEpisodes } from "./services/theocologyService";
import { getPublishedBlogPosts } from "./services/blogService";

const baseUrl = "https://thrive-fl.org";

// Force dynamic rendering - sitemap regenerates on every request
// API endpoint has 2-hour cache, so this is still performant
export const dynamic = 'force-dynamic';

// Folders to exclude from sitemap
const excludedFolders = ["api", "components", "contexts", "lib", "services", "types"];

// Custom priorities and change frequencies for specific routes
const routeConfig: Record<string, { priority: number; changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" }> = {
  "/": { priority: 1.0, changeFrequency: "weekly" },
  "/im-new": { priority: 0.9, changeFrequency: "monthly" },
  "/visit": { priority: 0.9, changeFrequency: "monthly" },
  "/sermons": { priority: 0.9, changeFrequency: "weekly" },
  "/blog": { priority: 0.8, changeFrequency: "weekly" },
  "/events": { priority: 0.8, changeFrequency: "weekly" },
  "/about": { priority: 0.8, changeFrequency: "monthly" },
  "/privacy": { priority: 0.3, changeFrequency: "yearly" },
};

const defaultConfig = { priority: 0.7, changeFrequency: "monthly" as const };

function getStaticPages(dir: string, basePath: string = ""): string[] {
  const pages: string[] = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip excluded folders and dynamic route folders
      if (excludedFolders.includes(item) || item.startsWith("[")) {
        continue;
      }
      // Recurse into subdirectories
      pages.push(...getStaticPages(fullPath, `${basePath}/${item}`));
    } else if (item === "page.tsx" || item === "page.ts") {
      // Found a page - add the route
      pages.push(basePath || "/");
    }
  }

  return pages;
}

/**
 * Dynamic sitemap with all pages including individual sermon messages
 * Uses single API call to get all series and message IDs
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appDir = path.join(process.cwd(), "app");
  const staticPages = getStaticPages(appDir);
  const now = new Date();

  // Build static page entries (these are fast - no API calls needed)
  const staticEntries: MetadataRoute.Sitemap = staticPages.map((route) => {
    const config = routeConfig[route] || defaultConfig;
    return {
      url: `${baseUrl}${route === "/" ? "" : route}`,
      lastModified: now,
      changeFrequency: config.changeFrequency,
      priority: config.priority,
    };
  });

  // Fire all dynamic data fetches in parallel
  const [theocologyResult, blogResult, sermonResult] = await Promise.allSettled([
    fetchTheocologyEpisodes(),
    getPublishedBlogPosts(),
    getSitemapData(),
  ]);

  const theocologyEntries: MetadataRoute.Sitemap =
    theocologyResult.status === "fulfilled"
      ? theocologyResult.value.map((episode) => ({
          url: `${baseUrl}/theocology/episodes/${episode.slug}`,
          lastModified: new Date(episode.pubDate),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }))
      : (console.error("Failed to fetch Theocology episodes for sitemap:", theocologyResult.reason), []);

  const blogEntries: MetadataRoute.Sitemap =
    blogResult.status === "fulfilled"
      ? blogResult.value.map((post) => ({
          url: `${baseUrl}/blog/${post.Slug}`,
          lastModified: post.LastUpdated ? new Date(post.LastUpdated) : now,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        }))
      : (console.error("Failed to fetch blog posts for sitemap:", blogResult.reason), []);

  const sermonEntries: MetadataRoute.Sitemap =
    sermonResult.status === "fulfilled"
      ? sermonResult.value.Series.flatMap((series) => {
          const seriesEntry = {
            url: `${baseUrl}/sermons/${series.Id}`,
            lastModified: series.LastUpdated ? new Date(series.LastUpdated) : now,
            changeFrequency: "weekly" as const,
            priority: 0.7,
          };

          const messageEntries = series.Messages.flatMap((message) => {
            const entries: MetadataRoute.Sitemap = [
              {
                url: `${baseUrl}/sermons/${series.Id}/${message.Id}`,
                lastModified: message.Date ? new Date(message.Date) : now,
                changeFrequency: "monthly" as const,
                priority: 0.6,
              },
            ];

            if (message.HasVideo) {
              entries.push({
                url: `${baseUrl}/sermons/${series.Id}/${message.Id}/video`,
                lastModified: message.Date ? new Date(message.Date) : now,
                changeFrequency: "monthly" as const,
                priority: 0.6,
              });
            }

            return entries;
          });

          return [seriesEntry, ...messageEntries];
        })
      : (console.error("Failed to fetch sitemap data:", sermonResult.reason), []);

  return [...staticEntries, ...theocologyEntries, ...blogEntries, ...sermonEntries];
}
