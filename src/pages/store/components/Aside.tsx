import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useShoppingCart } from '../../../contexts';
import { setTransition } from '../../../utils';
import { categories } from '../../../data';
import { CategoryLink } from './CategoryLink';

export function Aside(): JSX.Element {
  const {
    isCartOpen,
    parameter,
    location: { pathname }
  } = useShoppingCart();

  const currentCategory = parameter.get('category') ?? 'All';

  const [savedCategory, setSavedCategory] = useState(currentCategory);

  useEffect(() => {
    if (pathname === '/store') setSavedCategory(currentCategory);
  }, [currentCategory]);

  return (
    <motion.aside
      style={{ zIndex: isCartOpen ? -1 : 'auto' }}
      className='top-28 flex w-full max-w-none flex-col gap-4 self-start
                 rounded-lg border border-border-primary p-4 md:sticky md:max-w-sm'
      {...setTransition({ direction: 'left' })}
    >
      <div className='flex flex-wrap items-center justify-center gap-2 text-center md:block md:text-left'>
        <h1 className='text-xl'>Store /</h1>
        <p className='text-2xl font-bold capitalize md:text-4xl'>
          {savedCategory}
        </p>
      </div>
      <hr />
      <ul className='flex flex-wrap justify-center gap-2 md:block [&>*]:text-lg [&>*]:capitalize [&>*]:text-secondary'>
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
