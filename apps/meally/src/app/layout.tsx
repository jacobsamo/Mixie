import Footer from "@components/modules/Footer";
import Navbar from "@components/modules/Navbar";
import Providers from "@components/modules/Providers";
import { Toaster } from "@components/ui/toaster";
import { constructMetadata } from "@lib/utils";
import "@styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Viewport } from "next";
import { getServerAuthSession } from "../server/auth";

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
        <Providers>
          <Navbar />
          {/* <Search /> */}
          {children}
          <Toaster />
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
