import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Product } from './Product';
import { StoreContext } from '../../../contexts';
import { setTransition } from '../../../utils';

export function Listing() {
  const { allProducts, parameter } = useContext(StoreContext);
  const currentCategory = parameter.get('category');

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
        .map(({ id, title, image, price }) => (
          <Product id={id} title={title} image={image} price={price} key={id} />
        ))}
    </motion.div>
  );
}
