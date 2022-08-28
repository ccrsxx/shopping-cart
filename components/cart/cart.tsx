import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { MdShoppingCart, MdArrowForward } from '@assets/icons';
import { Button } from '@components/ui/button';
import { useShoppingCart } from '@lib/context/shopping-cart';
import { formatCurrency } from '@lib/currency';
import { setTransition } from '@lib/transition';
import { CartItem } from './cart-item';

export function Cart(): JSX.Element {
  const { cartProducts, currentCart, totalPrice, isMobile, clearCart } =
    useShoppingCart();

  const [totalProducts, setTotalProducts] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    setTotalProducts(cartProducts);
  }, [cartProducts]);

  useEffect(() => {
    if (isMobile && !isCartOpen) document.documentElement.style.overflow = '';

    document[isMobile ? 'documentElement' : 'body'].style.overflowY = isCartOpen
      ? 'hidden'
      : '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCartOpen]);

  const toggleCart = (): void => setIsCartOpen(!isCartOpen);

  const cartLength = currentCart.length;

  return (
    <>
      <Button className='relative !p-2' ariaLabel='Open' onClick={toggleCart}>
        <MdShoppingCart size={24} />
        <span
          className='absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center
                     justify-center rounded-full bg-main-red p-1 text-xs'
        >
          {totalProducts}
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
                  <Link href='/checkout'>
                    <a tabIndex={-1} onClick={toggleCart}>
                      <Button
                        Icon={MdArrowForward}
                        label='Checkout'
                        className='text-xl normal-case hover:!bg-inherit hover:!text-accent'
                        flipped
                      />
                    </a>
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
