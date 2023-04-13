import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet="utf-8" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link
          rel="icon"
          href="/icons/maskable_icons/maskable_icon_x48.png"
          type="image/png"
          sizes="48x48"
        />
        <link
          rel="icon"
          href="/icons/maskable_icons/maskable_icon_x72.png"
          type="image/png"
          sizes="72x72"
        />
        <link
          rel="icon"
          href="/icons/maskable_icons/maskable_icon_x96.png"
          type="image/png"
          sizes="96x96"
        />
        <link
          rel="icon"
          href="/icons/maskable_icons/maskable_icon_x128.png"
          type="image/png"
          sizes="128x128"
        />
        <link
          rel="icon"
          href="/icons/maskable_icons/maskable_icon_x192.png"
          type="image/png"
          sizes="192x192"
        />
        <link
          rel="icon"
          href="/icons/maskable_icons/maskable_icon_x384.png"
          type="image/png"
          sizes="384x384"
        />
        <link
          rel="icon"
          href="/icons/maskable_icons/maskable_icon_x512.png"
          type="image/png"
          sizes="512x512"
        />
        <meta name="theme-color" content="#fcfcfc" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
