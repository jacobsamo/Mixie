import { Metadata } from "next";

/**
 * Constructs a metadata object
 * @param {string | undefined} title
 * @param {string | undefined} description
 * @param {string[] | undefined} keywords
 * @param {string | undefined} image
 * @param {string | undefined} url
 * @param {boolean | undefined} noIndex
 * @returns {Metadata} a metadata object
 */
export function constructMetadata({
  title = "Mixie",
  description = "Mixie is a community-driven recipe platform where home cooks and food enthusiasts can collaborate on unique and delicious recipes",
  image = "/icons/icon.jpg",
  url = "https://www.mixiecooking.com",
  noIndex = false,
  keywords = [
    "cooking",
    "recipes",
    "recipe",
    "food",
    "meals",
    "meal",
    "ingredients",
    "ingredient",
    "diet",
  ],
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    authors: [
      {
        name: "mixie",
        url: url,
      },
    ],
    openGraph: {
      type: "website",
      locale: "en_AU",
      title,
      description,
      images: {
        url: image || "/images/banner.jpg",
        alt: title,
      },
      url: url,
      siteName: "Mixie",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: image || "/images/banner.jpg",
      creator: "@mixiecooking",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/icons/icon_x128.jpg",
      apple: "/icons/icon_x128.jpg",
    },
    metadataBase: new URL(url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    manifest: `/manifest.json`,
    keywords: keywords,
  };
}
