import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/auth"],
    },
    sitemap: [
      "https://www.mixiecooking.com/sitemap.xml",
      "https://www.mixiecooking.com/sitemap-recipes.xml",
    ],
  };
}
