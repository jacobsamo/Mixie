//types
import type { AppProps } from 'next/app'

//styles
import '../common/styles/globals.scss'
import "tailwindcss/tailwind.css";


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
