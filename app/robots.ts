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
      disallow: ["/api/"],
    },
    sitemap: "https://thrive-fl.org/sitemap.xml",
  };
}

