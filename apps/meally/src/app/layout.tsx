import { NextAuthProvider } from "@components/layouts/NextAuthProvider";
import Navbar from "@components/modules/Navbar";
import { Toaster } from "@components/ui/toaster";
import "@styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { getServerAuthSession } from "@server/auth";
import Footer from "../common/components/modules/Footer";
import { ThemeProvider } from "../common/components/modules/theme-provider";

const siteConfig = {
  name: "Meally",
  description:
    "Meally is a community-driven recipe platform where home cooks and food enthusiasts can collaborate on unique and delicious recipes",
  url: "https://www.meally.com.au",
  ogImage: "",
};

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "cooking",
    "recipes",
    "recipe",
    "food",
    "meals",
    "meal",
    "ingredients",
    "ingredient",
    "nutrition",
    "nutritional",
    "nutrients",
    "nutrient",
    "calories",
    "calorie",
    "diet",
  ],
  authors: [
    {
      name: "meally",
      url: siteConfig.url,
    },
  ],
  viewport: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@meally",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `/manifest.json`,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  const theme = session?.user?.theme || "system";
  console.log(theme);

  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme={theme} enableSystem>
          <NextAuthProvider>
            <Navbar />
            {/* <Search /> */}
            {children}
            <Toaster />
            <Footer />
          </NextAuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
