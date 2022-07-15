import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useShoppingCart } from '../../context';
import { formatCurrency, setTransition } from '../../utils';
import { MdShoppingCart, MdArrowForward } from '../../assets';
import { Button } from '../ui';
import { CartItem } from './CartItem';

export function Cart(): JSX.Element {
  const { cartProducts, currentCart, totalPrice, clearCart } =
    useShoppingCart();

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflowY = isCartOpen ? 'hidden' : '';
  }, [isCartOpen]);

  const toggleCart = (): void => setIsCartOpen(!isCartOpen);

  const cartLength = currentCart.length;

  return (
    <>
      <Button className='relative !p-2' onClick={toggleCart}>
        <MdShoppingCart size={24} />
        <span
          className='absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center 
                     rounded-full bg-main-red p-1 text-xs'
        >
          {cartProducts}
        </span>
      </Button>
      <AnimatePresence exitBeforeEnter>
        {isCartOpen && (
          <div className='fixed inset-0 z-10'>
            <motion.div
              className='fixed h-screen w-screen bg-black/80'
              onClick={toggleCart}
              {...setTransition({ direction: 'none' })}
            />
            <motion.div
              className='fixed top-0 -right-4 h-screen w-[500px] max-w-[90vw]
                         rounded-l-lg bg-background p-8 pr-12'
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
                    className='!justify-end !p-0 text-xl normal-case text-secondary hover:scale-100 hover:!bg-inherit'
                    label='Clear'
                    onClick={clearCart}
                  />
                </div>
                <ul
                  className='relative order-1 -mx-8 -my-1 -mr-6 flex flex-1 flex-col gap-4
                           overflow-y-auto overflow-x-hidden py-1 px-8 pr-6'
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
                <div className='flex flex-wrap items-center justify-between md:order-2'>
                  <p className='text-lg'>
                    Total:{' '}
                    <span className='font-bold'>
                      {formatCurrency(totalPrice)}
                    </span>
                  </p>
                  <Link to='/checkout' tabIndex={-1} onClick={toggleCart}>
                    <Button
                      Icon={MdArrowForward}
                      label='Checkout'
                      className='text-xl normal-case hover:!bg-inherit hover:text-accent'
                      flipped
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
