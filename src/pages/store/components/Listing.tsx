import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useShoppingCart } from '../../../contexts';
import { filterMatch, setTransition } from '../../../utils';
import { ProductCard } from './ProductCard';
import { Empty } from './Empty';

export function Listing(): JSX.Element {
  const { allProducts, parameter, pathname } = useShoppingCart();

  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categoryParam = parameter.get('category');
  const searchParam = parameter.get('search');

  useEffect(() => {
    if (pathname === '/store') setCurrentCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    if (typeof searchParam === 'string') setSearchQuery(searchParam);
  }, [searchParam]);

  let filteredProducts = allProducts.filter(
    ({ category }) => category === currentCategory || !currentCategory
  );

  if (searchQuery)
    filteredProducts = filteredProducts.filter(({ title }) =>
      filterMatch(title, searchQuery)
    );

  const productsIsEmpty = filteredProducts.length === 0;

  const key = useMemo(() => Math.random(), [currentCategory, searchQuery]);

  return (
    <motion.div
      className={`${
        !productsIsEmpty
          ? '[grid-template-columns:repeat(auto-fill,minmax(230px,1fr))]'
          : 'justify-center'
      } grid w-full gap-x-4 gap-y-6`}
      key={key}
      {...setTransition({ direction: 'right' })}
    >
      {!productsIsEmpty ? (
        filteredProducts.map((product) => (
          <ProductCard {...product} key={product.id} />
        ))
      ) : (
        <Empty searchQuery={searchQuery} />
      )}
    </motion.div>
  );
}
