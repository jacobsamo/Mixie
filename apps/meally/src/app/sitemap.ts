import { MetadataRoute } from "next";

export const revalidate = 60 * 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: "https://www.meally.com.au",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.meally.com.au/sitemap-recipes.xml",
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: "https://www.meally.com.au/recipes",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: "https://www.meally.com.au/info/privacy_policy",
      lastModified: new Date("2023-11-01"),
    },
    {
      url: "https://www.meally.com.au/info/terms_service",
      lastModified: new Date("2023-11-01"),
    },
    {
      url: "https://www.meally.com.au/info/about",
      lastModified: new Date("2023-11-14"),
    },
  ];
}
