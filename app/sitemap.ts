import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { getAllSermons } from "./services/sermonService";

const baseUrl = "https://thrive-fl.org";

// ISR: Revalidate sitemap index every 2 hours
export const revalidate = 7200;

// Folders to exclude from sitemap
const excludedFolders = ["api", "components", "contexts", "lib", "services", "types"];

// Custom priorities and change frequencies for specific routes
const routeConfig: Record<string, { priority: number; changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" }> = {
  "/": { priority: 1.0, changeFrequency: "weekly" },
  "/im-new": { priority: 0.9, changeFrequency: "monthly" },
  "/visit": { priority: 0.9, changeFrequency: "monthly" },
  "/sermons": { priority: 0.9, changeFrequency: "weekly" },
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
 * Main sitemap - returns a sitemap index pointing to child sitemaps
 * This is fast because it only lists the child sitemap URLs, not all pages
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

  // Add sermon series pages (just the series, not individual messages)
  // This only requires ONE API call, not N calls
  let seriesEntries: MetadataRoute.Sitemap = [];

  try {
    const sermonsResponse = await getAllSermons(false);
    seriesEntries = sermonsResponse.Summaries.map((series) => ({
      url: `${baseUrl}/sermons/${series.Id}`,
      lastModified: series.LastUpdated ? new Date(series.LastUpdated) : now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Failed to fetch sermon series for sitemap:", error);
  }

  return [...staticEntries, ...seriesEntries];
}

