import { useState, useEffect, useContext, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { ShoppingCartContext } from '../../../contexts';
import { filterMatch, setTransition } from '../../../utils';

export function Listing() {
  const {
    allProducts,
    parameter,
    location: { pathname }
  } = useContext(ShoppingCartContext);

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

  const key = useMemo(() => Math.random(), [currentCategory, searchQuery]);

  return (
    <motion.div
      className='grid w-full gap-x-4 gap-y-6 [grid-template-columns:repeat(auto-fill,minmax(230px,1fr))]'
      key={key}
      {...setTransition({ direction: 'bottom' })}
    >
      {filteredProducts.map((product) => (
        <ProductCard {...product} key={product.id} />
      ))}
    </motion.div>
  );
}
