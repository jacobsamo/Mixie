import { MetadataRoute } from "next";

export default  function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://meally.com.au",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://meally.com.au/recipes",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://meally.com.au/info/privacy_policy",
      lastModified: new Date("2023-08-04"),
      changeFrequency: "daily",
    },
    {
      url: "https://meally.com.au/info/terms_service",
      lastModified: new Date("2023-08-04"),
      changeFrequency: "daily",
    },
  ];
}
