import { NextAuthProvider } from "@components/layouts/NextAuthProvider";
import Navbar from "@components/modules/Navbar";
import { Toaster } from "@components/ui/toaster";
import { getServerAuthSession } from "@server/auth";
import "@styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "../common/components/modules/theme-provider";
import Footer from "../common/components/modules/Footer";
import { constructMetadata } from "../common/lib/utils/utils";
import { Viewport } from "next";

export const metadata = constructMetadata();

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
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
