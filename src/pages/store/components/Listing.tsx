import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Product } from './Product';
import { ShoppingCartContext } from '../../../contexts';
import { setTransition } from '../../../utils';

export function Listing() {
  const {
    allProducts,
    parameter,
    location: { pathname }
  } = useContext(ShoppingCartContext);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);

  const paramCategory = parameter.get('category');

  useEffect(() => {
    if (pathname === '/store') setCurrentCategory(paramCategory);
  }, [paramCategory]);

  return (
    <motion.div
      className='grid w-full gap-x-4 gap-y-6 [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]'
      key={currentCategory}
      {...setTransition({ direction: 'bottom' })}
    >
      {allProducts
        .filter(
          ({ category }) => category === currentCategory || !currentCategory
        )
        .map((product) => (
          <Product {...product} key={product.id} />
        ))}
    </motion.div>
  );
}
