import { motion } from 'framer-motion';
import { useShoppingCart } from '../../../contexts';
import { setTransition } from '../../../utils';
import { CategoryLink } from './CategoryLink';

// prettier-ignore
const categories = ['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'];

export function Aside() {
  const { isCartOpen, parameter } = useShoppingCart();
  const currentCategory = parameter.get('category') ?? 'All';

  return (
    <motion.aside
      style={{ zIndex: isCartOpen ? -1 : 'auto' }}
      className='top-28 flex w-full max-w-none flex-col gap-4 self-start rounded-lg
                 border border-neutral-700 p-4 md:sticky md:max-w-sm'
      {...setTransition({ direction: 'left' })}
    >
      <div className='flex flex-wrap items-center justify-center gap-2 text-center md:block md:text-left'>
        <h1 className='text-xl'>Store /</h1>
        <p className='text-2xl font-bold capitalize md:text-4xl'>
          {currentCategory}
        </p>
      </div>
      <hr />
      <ul className='flex flex-wrap justify-center gap-2 md:block [&>*]:text-lg [&>*]:capitalize [&>*]:text-grayish'>
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
