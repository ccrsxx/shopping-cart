/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { useShoppingCart } from '@lib/context/shopping-cart';
import { setTransition } from '@lib/transition';
import { ProductImage } from '@components/product/product-image';
import { ProductDetail } from '@components/product/product-detail';
import { AddCart } from '@components/product/add-cart';
import { Fetching } from '@components/ui/fetching';
import { Error } from '@components/ui/error';
import NotFound from '../404';
import type { QueryType } from '@components/store/aside';

export default function Product(): JSX.Element {
  const {
    pathname,
    query: { slug }
  } = useRouter() as QueryType;

  const [currentSlug, setCurrentSlug] = useState<string | null>(null);

  useEffect(() => {
    if (slug) setCurrentSlug(slug);
  }, [slug]);

  const { allProducts, isFetching, isError } = useShoppingCart();

  const product = allProducts.find(
    ({ id }) => id === parseInt(currentSlug as string, 10)
  );

  const {
    id,
    title,
    price,
    description,
    category,
    image,
    rating: { count, rate }
  } = product ?? { rating: {} };

  const randomKey = useMemo(
    () => Math.random(),
    [isFetching, isError, pathname]
  );

  return id || isFetching || isError ? (
    <main
      className={`${
        isFetching ? 'items-center' : 'items-start'
      } flex flex-col gap-4 sm:flex-row md:gap-6 lg:justify-center lg:gap-8`}
      key={currentSlug}
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
          <ProductImage image={image} title={title} />
          <div className='flex w-full max-w-4xl flex-col-reverse gap-4 md:gap-6 lg:flex-row lg:gap-8'>
            <ProductDetail
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
    <NotFound slug={slug} />
  );
}
