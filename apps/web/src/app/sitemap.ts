import { MetadataRoute } from "next";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: "https://www.mixiecooking.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.mixiecooking.com/sitemap-recipes.xml",
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: "https://www.mixiecooking.com/recipes",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: "https://www.mixiecooking.com/legal/privacy",
      lastModified: new Date("2024-08-12"),
    },
    {
      url: "https://www.mixiecooking.com/legal/terms",
      lastModified: new Date("2024-08-12"),
    },
    {
      url: "https://www.mixiecooking.com/info/about",
      lastModified: new Date("2023-11-14"),
    },
  ];
}
