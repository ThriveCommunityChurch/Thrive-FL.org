import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get("host") || "";

  // Block indexing on non-production environments (dev, staging, amplifyapp.com)
  const isProduction = host === "thrive-fl.org" || host === "www.thrive-fl.org";

  if (!isProduction) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        // Legacy WordPress paths
        "/wp-", // All WordPress core files (/wp-content/, /wp-admin/, /wp-*.php, etc.)
        "/feed/", // Old RSS feeds
        "/teaching-series/", // Old sermon series structure
        "/series/", // Old series page structure (/series/how-grace-changes-everything/, etc.)
        "/podcast/", // Old podcast URLs - subpaths only (/podcast page is still valid)
        // Query parameter patterns - block WordPress-style URLs
        "/*?post_type=", // /?post_type=podcast&p=1
        "/*?p=", // /?p=123 (WordPress post IDs)
      ],
    },
    sitemap: "https://thrive-fl.org/sitemap.xml",
  };
}

