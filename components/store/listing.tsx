/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import cn from 'clsx';
import { motion } from 'framer-motion';
import { setTransition } from '@lib/transition';
import { filterQuery } from '@lib/query';
import { Loading } from '@components/ui/loading';
import { Empty } from '@components/ui/empty';
import { ProductCard } from './product-card';
import type { Products } from '@lib/api/products';
import type { QueryType } from './aside';

type ListingProps = {
  allProducts: Products;
};

export function Listing({ allProducts }: ListingProps): JSX.Element {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    isReady,
    pathname,
    query: { search, category }
  } = useRouter() as QueryType;

  useEffect(() => {
    if (!isReady) setIsLoading(true);
    else {
      const timeoutId = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timeoutId);
    }
  }, [isReady]);

  useEffect(() => {
    if (pathname === '/store') setSearchQuery(search ?? '');
  }, [search]);

  useEffect(() => {
    if (pathname === '/store') setCurrentCategory(category ?? null);
  }, [category]);

  let filteredProducts = allProducts.filter(
    ({ category }) => category === currentCategory || !currentCategory
  );

  if (searchQuery)
    filteredProducts = filteredProducts.filter(({ title }) =>
      filterQuery(title, searchQuery)
    );

  const productsNotFound = filteredProducts.length === 0;

  const key = useMemo(() => Math.random(), [currentCategory, searchQuery]);

  return (
    <motion.div
      className={cn('grid w-full gap-x-4 gap-y-6', {
        'self-center': isLoading,
        'justify-center': productsNotFound,
        '[grid-template-columns:repeat(auto-fill,minmax(230px,1fr))]':
          !isLoading && !productsNotFound
      })}
      {...setTransition({ direction: 'right' })}
      key={isLoading ? null : key}
    >
      {isLoading ? (
        <Loading />
      ) : productsNotFound ? (
        <Empty searchQuery={searchQuery} />
      ) : (
        filteredProducts.map((productData) => (
          <ProductCard productData={productData} key={productData.id} />
        ))
      )}
    </motion.div>
  );
}
