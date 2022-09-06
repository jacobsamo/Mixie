//import types
import type { AppProps } from 'next/app'

//import styles
import '../common/shared/styles/globals.scss'
import "tailwindcss/tailwind.css";


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
