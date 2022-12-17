//types
import type { AppProps } from 'next/app';

//styles
import '@styles/globals.scss';
import '@styles/responsive_design.scss';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
