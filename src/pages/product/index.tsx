import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Error, Fetching } from '../../components';
import { NotFound } from '../404';
import { setTransition } from '../../utils';
import { useShoppingCart } from '../../context';
import { Image, Details, AddCart } from './components';

export function Product(): JSX.Element {
  const { allProducts, isFetching, isError, pathname } = useShoppingCart();

  const { productId } = useParams();

  const product = allProducts.find(({ id }) => id === parseInt(productId!, 10));

  const {
    id,
    title,
    price,
    description,
    category,
    image,
    rating: { count, rate }
  } = product ?? { rating: {} };

  const randomKey =
    isFetching || isError
      ? useMemo(() => Math.random(), [isFetching, isError, pathname])
      : null;

  return id || isFetching || isError ? (
    <main
      className={`${
        isFetching ? 'items-center' : 'items-start'
      } flex flex-col justify-center gap-4 sm:flex-row md:gap-6 lg:gap-8`}
    >
      {isFetching || isError ? (
        <>
          <motion.div className='absolute scale-0' {...setTransition({})} />
          <AnimatePresence exitBeforeEnter>
            {isFetching ? (
              <Fetching key={randomKey} />
            ) : (
              <Error key={randomKey} />
            )}
          </AnimatePresence>
        </>
      ) : (
        <>
          <Image image={image} title={title} />
          <div className='flex w-full max-w-4xl flex-col-reverse gap-4 md:gap-6 lg:flex-row lg:gap-8'>
            <Details
              title={title}
              count={count}
              rate={rate}
              price={price}
              category={category}
              description={description}
            />
            <AddCart id={id} />
          </div>
        </>
      )}
    </main>
  ) : (
    <NotFound productId={productId} />
  );
}
