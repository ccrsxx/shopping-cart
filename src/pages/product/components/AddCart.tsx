import { AnimatePresence, motion } from 'framer-motion';
import { useShoppingCart } from '../../../contexts';
import { Button } from '../../../components';
import {
  MdAdd,
  MdRemove,
  setTransition,
  MdAddShoppingCart,
  MdRemoveShoppingCart
} from '../../../utils';

interface AddCartProps {
  id?: number;
}

export function AddCart({ id }: AddCartProps) {
  const { currentCart, addProduct, deleteProduct, handleProductQuantity } =
    useShoppingCart();

  const { quantity } =
    currentCart.find(({ id: cartId }) => cartId === id) ?? {};

  return (
    <motion.div
      className='w-full max-w-xs'
      {...setTransition({ direction: 'right' })}
    >
      <motion.div
        className='flex flex-col gap-6 self-start overflow-hidden 
                   rounded-lg border border-neutral-700 p-4'
        animate={{ height: quantity ? 183 : 133 }}
      >
        <div className='flex flex-col gap-2'>
          <h2 className='text-xl font-medium'>Buy product</h2>
          <hr />
        </div>
        <AnimatePresence exitBeforeEnter initial={false}>
          {quantity ? (
            <motion.div
              className='flex flex-col gap-4'
              {...setTransition({ direction: 'top', distance: 25 })}
              key={id}
            >
              <div className='flex items-center justify-center gap-4'>
                <Button
                  Icon={MdRemove}
                  className='rounded-full border !p-1'
                  onClick={handleProductQuantity(id!, 'decrement')}
                  disabled={quantity <= 1}
                />
                <input
                  className='flex-1 rounded-lg border bg-dark px-2 py-1
                             text-center transition focus:ring-2 focus:ring-accent
                             focus:ring-offset-4 focus:ring-offset-dark'
                  type='number'
                  min={1}
                  max={10_000}
                  value={quantity}
                  onChange={handleProductQuantity(id!)}
                />
                <Button
                  Icon={MdAdd}
                  className='rounded-full border !p-1'
                  onClick={handleProductQuantity(id!, 'increment')}
                  disabled={quantity >= 10_000}
                />
              </div>
              <Button
                Icon={MdRemoveShoppingCart}
                className='rounded-lg border'
                onClick={deleteProduct(id!)}
                label='Remove from cart'
              />
            </motion.div>
          ) : (
            <motion.div
              {...setTransition({
                direction: 'bottom',
                distance: 25
              })}
              key={quantity}
            >
              <Button
                Icon={MdAddShoppingCart}
                className='w-full rounded-lg border'
                onClick={addProduct(id!)}
                label='Add to cart'
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
