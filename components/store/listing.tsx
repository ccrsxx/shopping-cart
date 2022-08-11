/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import cn from 'clsx';
import { motion } from 'framer-motion';
import { useShoppingCart } from '@lib/context/shopping-cart';
import { setTransition } from '@lib/transition';
import { filterQuery } from '@lib/query';
import { Empty } from '@components/ui/empty';
import { ProductCard } from './product-card';
import type { QueryType } from './aside';

export function Listing(): JSX.Element {
  const { allProducts } = useShoppingCart();

  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    pathname,
    query: { search, category }
  } = useRouter() as QueryType;

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
        '[grid-template-columns:repeat(auto-fill,minmax(230px,1fr))]':
          !productsNotFound,
        'justify-center': productsNotFound
      })}
      {...setTransition({ direction: 'right' })}
      key={key}
    >
      {!productsNotFound ? (
        filteredProducts.map((product) => (
          <ProductCard {...product} key={product.id} />
        ))
      ) : (
        <Empty searchQuery={searchQuery} />
      )}
    </motion.div>
  );
}
