import { constructMetadata } from "@/lib/utils";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Viewport } from "next";
import dynamic from "next/dynamic";
import { Toaster } from "@/components/ui/sonner";

const Providers = dynamic(() => import("@/components/providers"), {
  ssr: false,
});
const Navbar = dynamic(() => import("@/components/navbar"));
const Footer = dynamic(() => import("@/components/footer"));

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
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main className="h-fit min-h-full w-full">{children}</main>
          <Footer />
          <Toaster position="bottom-right" richColors={true} />
        </Providers>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
