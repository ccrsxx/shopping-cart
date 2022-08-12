import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useShoppingCart } from '@lib/context/shopping-cart';
import { setTransition } from '@lib/transition';
import { Button } from '@components/ui/button';
import {
  MdAdd,
  MdRemove,
  MdAddShoppingCart,
  MdRemoveShoppingCart
} from '@assets/icons';
import type { Product } from '@lib/api/products';

type AddCartProps = {
  id: number;
  productData: Product;
};

export function ProductCart({ id, productData }: AddCartProps): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [productQuantity, setProductQuantity] = useState(0);

  const { currentCart, addProduct, deleteProduct, handleProductQuantity } =
    useShoppingCart();

  const { quantity } =
    currentCart.find(({ id: cartId }) => cartId === id) ?? {};

  useEffect(() => {
    const sleep = (ms: number): Promise<void> =>
      new Promise((resolve) => setTimeout(resolve, ms));
    const addCartData = async (): Promise<void> => {
      await sleep(500);
      setLoading(false);
    };
    void addCartData();
  }, []);

  useEffect(() => {
    setProductQuantity(quantity ?? 0);
  }, [quantity]);

  return (
    <motion.div
      className='w-full shrink-[1.25] lg:max-w-none xl:max-w-xs'
      {...setTransition({ direction: 'right' })}
    >
      <motion.div
        className='flex flex-col gap-6 self-start overflow-hidden 
                   rounded-lg border border-border-primary p-4'
        animate={{ height: loading ? 200 : quantity ? 183 : 133 }}
      >
        <div className='flex flex-col gap-2'>
          <h2 className='text-xl font-medium'>Buy product</h2>
          <hr />
        </div>
        {loading ? (
          <div
            className='grid h-full grid-cols-2 gap-4 inner:animate-pulse 
                       inner:rounded-lg inner:bg-primary'
          >
            <div className='col-span-2' />
            <div />
            <div />
          </div>
        ) : (
          <AnimatePresence exitBeforeEnter>
            {productQuantity ? (
              <motion.div
                className='flex flex-col gap-4'
                {...setTransition({ direction: 'top', distance: 25 })}
                key={id}
              >
                <div className='flex items-center justify-center gap-4 inner:border-neutral-400'>
                  <Button
                    Icon={MdRemove}
                    className='rounded-full border !p-1 text-sm'
                    onClick={handleProductQuantity(id, 'decrement')}
                    disabled={productQuantity <= 1}
                  />
                  <input
                    className='flex-1 rounded-lg border bg-background px-2 py-1
                             text-center transition focus:ring-2 focus:ring-accent
                             focus:ring-offset-4 focus:ring-offset-background'
                    type='number'
                    min={1}
                    max={10_000}
                    value={productQuantity}
                    onChange={handleProductQuantity(id)}
                  />
                  <Button
                    Icon={MdAdd}
                    className='rounded-full border !p-1 text-sm'
                    onClick={handleProductQuantity(id, 'increment')}
                    disabled={productQuantity >= 10_000}
                  />
                </div>
                <Button
                  Icon={MdRemoveShoppingCart}
                  className='border border-neutral-400 text-sm'
                  onClick={deleteProduct(id)}
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
                  className='w-full border border-neutral-400 text-sm'
                  onClick={addProduct(productData)}
                  label='Add to cart'
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </motion.div>
  );
}
