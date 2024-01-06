import { Toaster } from "react-hot-toast";
import { constructMetadata } from "@/lib/utils";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import dynamic from "next/dynamic";

const Providers = dynamic(() => import("@/components/modules/Providers"));
const Navbar = dynamic(() => import("@/components/modules/Navbar"));
const Footer = dynamic(() => import("@/components/modules/Footer"));

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
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#333 ",
                color: "white",
              },
            }}
          />
          <Footer />
        </Providers>

        {/*Have a look at https://posthog.com/ for more advanced analytics */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
