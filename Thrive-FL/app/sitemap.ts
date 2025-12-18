import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thrive-fl.org";
  const lastModified = new Date();

  // Static pages with their priorities and change frequencies
  const staticPages = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/im-new", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/visit", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about/beliefs", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/about/leadership", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about/values", priority: 0.7, changeFrequency: "yearly" as const },
    { path: "/sermons", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/events", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/ministries/kids", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/small-groups", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/get-involved", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return staticPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}

