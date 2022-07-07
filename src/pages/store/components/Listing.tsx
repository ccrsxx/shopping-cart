import { useState, useEffect, useContext } from 'react';
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

  const categoryParam = parameter.get('category');
  const searchParam = parameter.get('search');

  useEffect(() => {
    if (pathname === '/store') setCurrentCategory(categoryParam);
  }, [categoryParam]);

  let filteredProducts = allProducts.filter(
    ({ category }) => category === currentCategory || !currentCategory
  );

  if (searchParam)
    filteredProducts = filteredProducts.filter(({ title }) =>
      filterMatch(title, searchParam)
    );

  return (
    <motion.div
      className='grid w-full gap-x-4 gap-y-6 [grid-template-columns:repeat(auto-fill,minmax(230px,1fr))]'
      key={searchParam || currentCategory}
      {...setTransition({ direction: 'bottom' })}
    >
      {filteredProducts.map((product) => (
        <ProductCard {...product} key={product.id} />
      ))}
    </motion.div>
  );
}
