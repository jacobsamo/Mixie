import Navbar from '@components/elements/Navbar';
import { Roboto } from '@next/font/google';

interface rootLayoutProps {
  children: React.ReactNode;
}


const roboto = Roboto({ weight: ["400", "700"], style: "normal" });

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: rootLayoutProps) {
  return (
    <html lang="en" className={roboto.className}>\
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
