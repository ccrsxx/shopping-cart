import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { useShoppingCart } from '@lib/context/shopping-cart';
import { Aside } from '@components/store/aside';
import { Listing } from '@components/store/listing';
import { Fetching } from '@components/ui/fetching';
import { Error } from '@components/ui/error';

export default function Store(): JSX.Element {
  const { pathname } = useRouter();
  const { isFetching, isError } = useShoppingCart();

  const randomKey = useMemo(
    () => Math.random(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isFetching, isError, pathname]
  );

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
