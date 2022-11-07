import Navbar from '@components/modules/Navbar';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
  return = (): JSX.Element => (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.json"/>
      </Head>
      <body>
        <Navbar />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default CustomDocument;