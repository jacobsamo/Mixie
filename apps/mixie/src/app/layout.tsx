import { Toaster } from "react-hot-toast";
import { constructMetadata } from "@/lib/utils";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import dynamic from "next/dynamic";
import { AxiomWebVitals } from "next-axiom";

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
          <main className="h-fit min-h-full w-full">
            <Navbar />
            {children}
            <Footer />
          </main>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#333 ",
                color: "white",
              },
            }}
          />
        </Providers>

        {/*Have a look at https://posthog.com/ for more advanced analytics */}
        <Analytics />
        <SpeedInsights />
        <AxiomWebVitals />
      </body>
    </html>
  );
}
