import { Html, Head, Main, NextScript } from 'next/document';

export default function Document(): JSX.Element {
  return (
    <Html className='overflow-x-hidden md:overflow-x-visible'>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=optional'
          rel='stylesheet'
        />
      </Head>
      <body className='overflow-x-hidden bg-background font-roboto text-primary'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
