import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/auth"],
    },
    sitemap: [
      "https://www.meally.com.au/sitemap.xml",
      "https://www.meally.com.au/sitemap-recipes.xml",
    ],
  };
}
