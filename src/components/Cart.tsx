import { AnimatePresence, motion } from 'framer-motion';
import { useShoppingCart } from '../contexts';
import { formatCurrency, setTransition, MdArrowForward } from '../utils';
import { CartItem } from './CartItem';
import { Button } from './Button';

export function Cart() {
  const { currentCart, totalPrice, isCartOpen, clearCart, toggleCart } =
    useShoppingCart();

  const cartLength = currentCart.length;

  return (
    <AnimatePresence exitBeforeEnter>
      {isCartOpen ? (
        <div className='fixed inset-0 z-10' key={cartLength}>
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
              <ul
                className='relative -mx-8 -my-1 -mr-6 flex flex-1 flex-col gap-4 overflow-y-auto
                       overflow-x-hidden py-1 px-8 pr-6'
              >
                <AnimatePresence>
                  {currentCart.map((cartProduct, index) => (
                    <CartItem
                      index={index}
                      toggleCart={toggleCart}
                      key={cartProduct.id}
                      {...cartProduct}
                    />
                  ))}
                </AnimatePresence>
              </ul>
              <div className='flex items-center justify-between'>
                <p className='text-lg'>
                  Total:{' '}
                  <span className='font-bold'>
                    {formatCurrency(totalPrice)}
                  </span>
                </p>
                <Button
                  Icon={MdArrowForward}
                  label='Checkout'
                  className='text-xl normal-case hover:!bg-inherit hover:text-accent'
                  flipped
                />
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
