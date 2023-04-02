//types
import type { AppProps } from 'next/app';

//styles
import '@styles/globals.scss';
import '@styles/responsive_design.scss';
import 'tailwindcss/tailwind.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
