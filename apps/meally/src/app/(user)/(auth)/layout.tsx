import { siteConfig } from '@lib/config/siteConfig';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <body>{children}</body>;
}
