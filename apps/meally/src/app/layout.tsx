import Navbar from '@components/modules/Navbar';
import { siteConfig } from '@lib/config/siteConfig';
import '@styles/globals.css';
import { NextAuthProvider } from '@components/layouts/NextAuthProvider';
import { ThemeProvider } from '../common/components/modules/theme-provider';
import { Toaster } from '@components/ui/toaster';
import { Analytics } from '@vercel/analytics/react';
import Search from '../common/components/modules/Search';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'cooking',
    'recipes',
    'recipe',
    'food',
    'meals',
    'meal',
    'ingredients',
    'ingredient',
    'nutrition',
    'nutritional',
    'nutrients',
    'nutrient',
    'calories',
    'calorie',
    'diet',
  ],
  authors: [
    {
      name: 'meally',
      url: siteConfig.url,
    },
  ],
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: '@meally',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/manifest.json`,
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextAuthProvider>
            <QueryClientProvider client={queryClient}>
              <Navbar />
              <Search />
              {children}
              <Toaster />
            </QueryClientProvider>
          </NextAuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
