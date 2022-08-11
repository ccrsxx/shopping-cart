import Head from 'next/head';

export function AppHead(): JSX.Element {
  return (
    <Head>
      <link rel='icon' href='/favicon.ico' />
      <link rel='manifest' href='/site.webmanifest' key='site-manifest' />
      <meta name='twitter:site' content='@ccrsxx' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='og:title' content='Shopping Cart' />
      <meta name='og:url' content='https://shopping-cart-ccrsxx.vercel.app' />
      <meta
        name='description'
        content='The One Stop Shop for All Your Shopping Needs.'
      />
      <meta
        name='og:description'
        content='The One Stop Shop for All Your Shopping Needs.'
      />
      <meta
        property='og:image'
        content='https://og-image.vercel.app/Shopping%20Cart.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-white.svg'
      />
    </Head>
  );
}
