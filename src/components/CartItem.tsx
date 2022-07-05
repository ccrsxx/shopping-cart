import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { ShoppingCartContext } from '../contexts';
import {
  formatCurrency,
  setTransition,
  MdAdd,
  MdRemove,
  MdDelete
} from '../utils';

interface CartItemProps {
  id: number;
  index: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  toggleCart: () => void;
}

export function CartItem({
  id,
  index,
  title,
  image,
  price,
  quantity,
  toggleCart
}: CartItemProps) {
  const { deleteProduct, handleProductQuantity } =
    useContext(ShoppingCartContext);

  return (
    <motion.li
      key={id}
      {...setTransition({
        direction: 'right',
        layout: true,
        durationOut: 0.25,
        delayIn: index < 5 ? index * 0.02 : 0
      })}
    >
      <div className='rounded-lg border border-neutral-700'>
        <div className='flex'>
          <Link
            className='hidden h-[108px] w-[108px] shrink-0 items-center justify-center
                       rounded-l-lg bg-white transition hover:brightness-110 sm:flex'
            to={`/product/${id}`}
            onClick={toggleCart}
          >
            <img className='h-full w-full p-4' src={image} alt={title} />
          </Link>
          <div className='flex w-full flex-col justify-between py-2 px-4'>
            <div>
              <Link
                className='overflow-hidden text-ellipsis font-medium brightness-90 transition
                           duration-300 [display:-webkit-box] [-webkit-line-clamp:1] 
                           [-webkit-box-orient:vertical] hover:brightness-100'
                to={`/product/${id}`}
                onClick={toggleCart}
              >
                {title}
              </Link>
              <p className='text-lg font-bold'>{formatCurrency(price)}</p>
            </div>
            <div className='flex flex-wrap justify-between text-sm font-light'>
              <div className='flex gap-1'>
                <p>Quantity: </p>
                <input
                  className='max-w-[60px] rounded-lg bg-dark px-1 transition
                             focus:outline-none focus:ring-2 focus:ring-pink-400'
                  type='number'
                  min={1}
                  max={10_000}
                  value={quantity}
                  onChange={handleProductQuantity(id)}
                />
              </div>
              <p className='font-semibold'>
                Total: {formatCurrency(price * quantity)}
              </p>
            </div>
          </div>
          <div className='grid border-l border-neutral-700 [&>*]:rounded-none'>
            <Button
              className='!rounded-tr-lg disabled:text-gray-600 disabled:!brightness-100'
              Icon={MdAdd}
              onClick={handleProductQuantity(id, 'increment')}
              disabled={quantity >= 10_000}
            />
            <Button
              className='border-y border-neutral-700 disabled:text-gray-600 disabled:!brightness-100'
              Icon={MdRemove}
              onClick={handleProductQuantity(id, 'decrement')}
              disabled={quantity <= 1}
            />
            <Button
              className='!rounded-br-lg'
              Icon={MdDelete}
              onClick={deleteProduct(id)}
            />
          </div>
        </div>
      </div>
    </motion.li>
  );
}
