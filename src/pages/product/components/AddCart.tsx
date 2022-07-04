import { useContext } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCartContext } from '../../../contexts';
import { Button } from '../../../components';
import { MdAddShoppingCart, setTransition } from '../../../utils';

interface AddCartProps {
  id?: number;
}

export function AddCart({ id }: AddCartProps) {
  const { addProduct, deleteProduct } = useContext(ShoppingCartContext);

  return (
    <motion.div
      className='flex w-full max-w-xs flex-col gap-4 self-start rounded-lg border border-neutral-700 p-4'
      {...setTransition({ direction: 'right' })}
    >
      <h2 className='text-xl font-medium'>Add to cart</h2>
      <div>
        <Button
          className='w-full rounded-lg border hover:scale-105 active:scale-95'
          onClick={addProduct(id!)}
        >
          <MdAddShoppingCart /> Add to cart
        </Button>
      </div>
    </motion.div>
  );
}
