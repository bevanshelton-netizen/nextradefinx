import type { MetadataRoute } from "next";
import { marketingLocaleCodes } from "@/lib/marketing-locales";

const base = "https://nexai-global-markets.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: "daily", priority: 1 },
    { url: `${base}/markets/live`, changeFrequency: "hourly", priority: 0.9 },
    ...marketingLocaleCodes.map(locale => ({
      url: `${base}/go/${locale}`,
      changeFrequency: "weekly" as const,
      priority: 0.8
    }))
  ];
}
