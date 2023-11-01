import { eq } from "drizzle-orm";
import { MetadataRoute } from "next";
import { db } from "../server/db";
import { info } from "../server/db/schemas";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const recipes = await db.query.info.findMany({
    where: eq(info.isPublic, true),
  });

  return [
    {
      url: "https://www.meally.com.au",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.meally.com.au/recipes",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...recipes.map((recipe) => ({
      url: `https://www.meally.com.au/recipes/${recipe.id}`,
      lastModified: recipe.lastUpdated || new Date(),
    })),
    {
      url: "https://www.meally.com.au/info/privacy_policy",
      lastModified: new Date("2023-08-04"),
      changeFrequency: "daily",
    },
    {
      url: "https://www.meally.com.au/info/terms_service",
      lastModified: new Date("2023-08-04"),
      changeFrequency: "daily",
    },
  ];
}
