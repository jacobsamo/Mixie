//types
import type { AppProps } from 'next/app';
import { useCallback, useEffect } from 'react';

//styles
import '@styles/globals.scss';
import '@styles/responsive_design.scss';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
