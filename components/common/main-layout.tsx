import Head from 'next/head';
import type { ReactNode } from 'react';

type MainLayoutProps = {
  className?: string;
  title: string;
  url?: string;
  description: string;
  image: string;
  children: ReactNode;
  product?: boolean;
};

export function MainLayout({
  className,
  title,
  url,
  description,
  image,
  children
}: MainLayoutProps): JSX.Element {
  const siteTitle = title;
  const siteDescription = description;
  const siteImage = image;

  return (
    <main className={className}>
      <Head>
        <title>{siteTitle}</title>
        <meta name='og:title' content={siteTitle} />
        <meta name='description' content={siteDescription} />
        <meta name='og:description' content={siteDescription} />
        <meta property='og:image' content={siteImage} />
        <meta
          name='og:url'
          content={`https://shopping-cart-ccrsxx.vercel.app${url ?? ''}`}
        />
      </Head>
      {children}
    </main>
  );
}
