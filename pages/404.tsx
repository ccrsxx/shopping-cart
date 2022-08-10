/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import cn from 'clsx';
import { motion } from 'framer-motion';
import { setTransition } from '@lib/transition';

interface NotFoundProps {
  slug?: string;
}

export default function NotFound({ slug }: NotFoundProps): JSX.Element {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);

  const { asPath, push } = useRouter();

  const { title, navigateTo, targetPage } = useMemo(
    () =>
      slug
        ? {
            title: 'Product',
            navigateTo: '/store',
            targetPage: 'store'
          }
        : {
            title: 'Page',
            navigateTo: '/',
            targetPage: 'homepage'
          },
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => void push(navigateTo), 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => setCurrentUrl(slug ?? asPath), 500);
    return () => clearTimeout(timeoutId);
  }, [slug]);

  const currentPage = currentUrl ?? '...';
  const truncatedPage = currentPage?.replace(/(.{10}).+/, '$1…');

  return (
    <motion.main
      className='flex flex-col items-center justify-center'
      {...setTransition({ direction: 'top', distance: 100 })}
    >
      <div
        className='flex w-full max-w-md flex-col items-center gap-8
                   rounded-lg border border-border-primary'
      >
        <div className='flex flex-col items-center gap-4 p-8'>
          <h1 className='text-8xl font-bold text-accent'>404</h1>
          <p
            className={cn('text-center text-2xl font-medium', {
              'animate-fade': currentUrl,
              'animate-pulse': !currentUrl
            })}
          >
            {title}{' '}
            <span className='font-semibold text-main-red'>{truncatedPage}</span>{' '}
            not found.
          </p>
        </div>
        <div className='flex w-full flex-col items-center gap-4'>
          <h2 className='text-lg font-light text-secondary'>
            Redirecting to {targetPage}...
          </h2>
          <motion.span
            className='h-1 w-full self-start rounded-b-lg bg-accent'
            initial={{ width: 0 }}
            animate={{ width: '100%', transition: { duration: 3 } }}
          />
        </div>
      </div>
    </motion.main>
  );
}