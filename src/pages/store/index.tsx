import { useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useShoppingCart } from '../../contexts';
import { Fetching, Error } from '../../components';
import { Aside, Listing } from './components';

export function Store(): JSX.Element {
  const { isFetching, isError, pathname } = useShoppingCart();

  const randomKey =
    isFetching || isError
      ? useMemo(() => Math.random(), [isFetching, isError, pathname])
      : null;

  return (
    <main className='flex flex-col items-start gap-6 md:flex-row md:gap-8'>
      <Aside />
      {isFetching || isError ? (
        <AnimatePresence exitBeforeEnter>
          {isFetching ? (
            <Fetching key={randomKey} />
          ) : (
            <Error key={randomKey} />
          )}
        </AnimatePresence>
      ) : (
        <Listing />
      )}
    </main>
  );
}
