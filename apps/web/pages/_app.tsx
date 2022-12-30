//types
import type { AppProps } from 'next/app';
import Script from 'next/script';

//styles
import '@styles/globals.scss';
import '@styles/responsive_design.scss';
import 'tailwindcss/tailwind.css';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        id="Absence-banner"
        async
        strategy="afterInteractive"
        onError={(e) => {
          console.error('Script failed to load', e);
        }}
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1553721231977629"
        crossOrigin="anonymous"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
