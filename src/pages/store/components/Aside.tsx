import { useContext } from 'react';
import { motion } from 'framer-motion';
import { CategoryLink } from './CategoryLink';
import { ShoppingCartContext } from '../../../contexts';
import { setTransition } from '../../../utils';

// prettier-ignore
const categories = ['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'];

export function Aside() {
  const { isCartOpen, parameter } = useContext(ShoppingCartContext);
  const currentCategory = parameter.get('category') ?? 'All';

  return (
    <motion.aside
      style={{ zIndex: isCartOpen ? -1 : 'auto' }}
      className='sticky top-28 hidden w-full max-w-sm flex-col gap-4 self-start
                 rounded-lg border border-neutral-700 p-4 md:flex'
      {...setTransition({ direction: 'left' })}
    >
      <div>
        <h1 className='text-xl'>Store /</h1>
        <p className='text-4xl font-bold capitalize'>{currentCategory}</p>
      </div>
      <hr />
      <ul className='[&>*]:text-lg [&>*]:capitalize [&>*]:text-grayish'>
        <li>
          <CategoryLink category='all' />
        </li>
        {categories.map((category) => (
          <li key={category}>
            <CategoryLink category={category} />
          </li>
        ))}
      </ul>
    </motion.aside>
  );
}
