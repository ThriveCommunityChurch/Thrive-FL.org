import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { getAllSermons, getSeriesById } from "./services/sermonService";

const baseUrl = "https://thrive-fl.org";

// ISR: Revalidate sitemap every hour (3600 seconds)
// New sermons will appear in the sitemap within an hour without requiring a rebuild
export const revalidate = 3600;

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appDir = path.join(process.cwd(), "app");
  const staticPages = getStaticPages(appDir);
  const now = new Date();

  // Build static page entries
  const staticEntries: MetadataRoute.Sitemap = staticPages.map((route) => {
    const config = routeConfig[route] || defaultConfig;
    return {
      url: `${baseUrl}${route === "/" ? "" : route}`,
      lastModified: now,
      changeFrequency: config.changeFrequency,
      priority: config.priority,
    };
  });

  // Fetch dynamic sermon content
  let sermonEntries: MetadataRoute.Sitemap = [];

  try {
    // Get all sermon series summaries
    const sermonsResponse = await getAllSermons(false); // false = use thumbnails, faster
    const seriesSummaries = sermonsResponse.Summaries;

    // Fetch full series data in parallel to get message IDs
    const seriesPromises = seriesSummaries.map((summary) =>
      getSeriesById(summary.Id).catch(() => null) // Gracefully handle individual failures
    );
    const seriesResults = await Promise.all(seriesPromises);

    // Build sermon entries
    for (const series of seriesResults) {
      if (!series) continue;

      // Add series page
      sermonEntries.push({
        url: `${baseUrl}/sermons/${series.Id}`,
        lastModified: series.LastUpdated ? new Date(series.LastUpdated) : now,
        changeFrequency: "weekly",
        priority: 0.7,
      });

      // Add individual message pages
      for (const message of series.Messages) {
        sermonEntries.push({
          url: `${baseUrl}/sermons/${series.Id}/${message.MessageId}`,
          lastModified: message.Date ? new Date(message.Date) : now,
          changeFrequency: "monthly", // Sermon content rarely changes after publishing
          priority: 0.6,
        });
      }
    }
  } catch (error) {
    // Log error but don't fail the entire sitemap
    console.error("Failed to fetch sermon data for sitemap:", error);
  }

  return [...staticEntries, ...sermonEntries];
}

