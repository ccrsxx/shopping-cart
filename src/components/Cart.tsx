import { useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CartItem } from './CartItem';
import { Button } from './Button';
import { ShoppingCartContext } from '../contexts';
import { formatCurrency, setTransition, MdArrowForward } from '../utils';

interface CartProps {
  cartLength: number;
  totalPrice: number;
  clearCart: () => void;
  toggleCart: () => void;
}

export function Cart({
  cartLength,
  totalPrice,
  clearCart,
  toggleCart
}: CartProps) {
  const { currentCart } = useContext(ShoppingCartContext);

  return (
    <div className='fixed inset-0 z-10'>
      <motion.div
        className='fixed h-screen w-screen bg-black bg-opacity-80'
        onClick={toggleCart}
        {...setTransition({ direction: 'none' })}
      />
      <motion.div
        className='fixed top-0 -right-4 h-screen w-[500px] max-w-[90vw]
                   rounded-l-lg bg-dark p-8 pr-12'
        {...setTransition({
          direction: 'right',
          distance: 'full',
          durationIn: 0.5
        })}
      >
        <div className='flex h-full flex-col gap-4'>
          <div className='flex justify-between'>
            <h2 className='text-2xl font-bold'>
              {cartLength
                ? `${cartLength} product${cartLength > 1 ? 's' : ''}`
                : 'No product added'}
            </h2>
            <Button
              className='!justify-end !p-0 text-xl normal-case text-grayish hover:scale-100 hover:!bg-inherit'
              label='Clear'
              onClick={clearCart}
            />
          </div>
          <ul className='flex flex-1 flex-col gap-4 overflow-auto overflow-x-hidden rounded-lg'>
            <AnimatePresence>
              {currentCart.map((cartProduct) => (
                <CartItem
                  cartLength={cartLength}
                  toggleCart={toggleCart}
                  key={cartProduct.id}
                  {...cartProduct}
                />
              ))}
            </AnimatePresence>
          </ul>
          <div className='flex items-center justify-between'>
            <p className='text-lg font-bold text-grayish'>
              Total: <span>{formatCurrency(totalPrice)}</span>
            </p>
            <Button
              Icon={MdArrowForward}
              label='Checkout'
              className='text-xl normal-case hover:!bg-inherit hover:text-pink-400'
              flipped
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
