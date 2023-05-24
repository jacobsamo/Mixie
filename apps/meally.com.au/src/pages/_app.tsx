//types
import type { AppProps } from 'next/app';
import Head from 'next/head';

//styles
import '@styles/globals.scss';
import '@styles/responsive_design.scss';
import 'tailwindcss/tailwind.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Navbar from '@components/modules/Navbar';
import Auth from '@components/elements/Auth';
import { Toaster } from 'shared/src/components/toast/toaster';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      <Auth />
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

export default MyApp;
