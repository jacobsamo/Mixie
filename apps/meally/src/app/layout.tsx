import Navbar from '@components/modules/Navbar';
import '@styles/globals.css';
import { siteConfig } from '@lib/config/siteConfig';
import AuthDialogProvider from 'src/common/hooks/AuthDialogProvider';
import { SessionProvider } from 'next-auth/react';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
