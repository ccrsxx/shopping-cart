import { motion } from 'framer-motion';
import { useShoppingCart } from '@lib/context/shopping-cart';
import { setTransition } from '@lib/transition';
import { MdWarning } from '@assets/icons';
import { Button } from './button';

export function Error(): JSX.Element {
  const { fetchAllProducts } = useShoppingCart();

  return (
    <motion.div
      className='flex w-full flex-1 items-center justify-center self-center'
      {...setTransition({ direction: 'bottom' })}
    >
      <div
        className='flex w-full max-w-xs flex-col items-center gap-4 
                   rounded-lg border border-border-primary p-4'
      >
        <i className='text-accent'>
          <MdWarning size={72} />
        </i>
        <p className='text-center text-xl font-medium'>
          Error when fetching data
        </p>
        <Button
          className='w-full border border-border-secondary'
          label='Reload'
          onClick={fetchAllProducts}
        />
      </div>
    </motion.div>
  );
}
