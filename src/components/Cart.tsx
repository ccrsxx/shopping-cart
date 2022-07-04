import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { ShoppingCartContext } from '../contexts';
import { formatCurrency, setTransition } from '../utils';

interface CartProps {
  toggleCart: () => void;
}

export function Cart({ toggleCart }: CartProps) {
  const { currentCart } = useContext(ShoppingCartContext);
  const cartLength = currentCart.length;

  return (
    <div className='fixed inset-0 z-10'>
      <motion.div
        className='fixed h-screen w-screen bg-black bg-opacity-80'
        onClick={toggleCart}
        {...setTransition({ direction: 'none' })}
      />
      <motion.div
        className='fixed top-0 -right-4 h-screen w-[500px] max-w-[80vw]
                   overflow-auto bg-dark p-8 pr-12'
        {...setTransition({
          direction: 'right',
          distance: 'full',
          durationIn: 0.5
        })}
      >
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between'>
            <h2 className='text-2xl font-bold'>
              {cartLength
                ? `${cartLength} product${cartLength > 1 ? 's' : ''}`
                : 'No product added'}
            </h2>
            <Button
              className='!justify-end !p-0 text-xl normal-case text-grayish hover:scale-100 hover:bg-inherit'
              label='Clear'
            />
          </div>
          <ul className='flex flex-col gap-4'>
            {currentCart.map(({ id, title, image, price, quantity }) => (
              <motion.li key={id} {...setTransition({ direction: 'right' })}>
                <div className='rounded-lg border border-neutral-700'>
                  <div className='flex'>
                    <div
                      className='flex h-[100px] w-[100px] shrink-0 items-center 
                                 justify-center rounded-l-lg bg-white'
                    >
                      <img
                        className='h-full w-full p-4'
                        src={image}
                        alt={title}
                      />
                    </div>
                    <div className='w-full p-2'>
                      <div>
                        <h3
                          className='overflow-hidden text-ellipsis [display:-webkit-box]
                                   [-webkit-line-clamp:1] [-webkit-box-orient:vertical]'
                        >
                          {title}
                        </h3>
                        <p>{formatCurrency(price)}</p>
                      </div>
                      <div>
                        <p>Quantity: {quantity}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
