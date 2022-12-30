import Navbar from '@components/modules/Navbar';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
  return = (): JSX.Element => (
    <Html>
      <body>
        <Navbar />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default CustomDocument;
