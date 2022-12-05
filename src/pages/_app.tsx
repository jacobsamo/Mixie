//types
import type { AppProps } from 'next/app';
import { useCallback, useEffect } from 'react';

//styles
import '../common/styles/globals.scss';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
