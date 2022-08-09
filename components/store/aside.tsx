import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { setTransition } from '@lib/transition';
import { CategoryLink } from './category-link';

const categories = [
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing"
];

export function Aside(): JSX.Element {
  const {
    pathname,
    query: { category }
  } = useRouter();

  const currentCategory = category ?? 'All';

  const [savedCategory, setSavedCategory] = useState(currentCategory);

  useEffect(() => {
    if (pathname === '/store') setSavedCategory(currentCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory]);

  return (
    <motion.aside
      className='top-28 flex w-full max-w-none flex-col gap-4 self-start rounded-lg
                 border border-border-primary p-4 md:sticky md:max-w-sm'
      {...setTransition({ direction: 'left' })}
    >
      <div className='flex flex-wrap items-center justify-center gap-2 text-center md:block md:text-left'>
        <h1 className='text-xl'>Store /</h1>
        <p className='text-2xl font-bold capitalize md:text-4xl'>
          {savedCategory}
        </p>
      </div>
      <hr />
      <ul className='flex flex-wrap justify-center gap-2 inner:text-lg inner:capitalize inner:text-secondary md:block'>
        <li>
          <CategoryLink categoryName='all' />
        </li>
        {categories.map((categoryName) => (
          <li key={categoryName}>
            <CategoryLink categoryName={categoryName} />
          </li>
        ))}
      </ul>
    </motion.aside>
  );
}
