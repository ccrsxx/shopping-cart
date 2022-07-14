import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useShoppingCart } from '../contexts';
import { setTransition } from '../utils';

interface NotFoundProps {
  productId?: string;
}

export function NotFound({ productId }: NotFoundProps): JSX.Element {
  const {
    location: { pathname },
    navigate
  } = useShoppingCart();

  const { title, navigateTo, targetPage } = productId
    ? {
        title: 'Product',
        navigateTo: '/store',
        targetPage: 'store'
      }
    : {
        title: 'Page',
        navigateTo: '/',
        targetPage: 'homepage'
      };

  useEffect(() => {
    const timeoutId = setTimeout(() => navigate(navigateTo), 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  const currentPage = productId ?? useMemo(() => pathname, []);
  const truncatedPage = currentPage.replace(/(.{10}).+/, '$1…');

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
          <p className='text-center text-2xl font-medium'>
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
