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
  title: string;
  image: string;
  price: number;
  quantity: number;
  cartLength: number;
  toggleCart: () => void;
}

export function CartItem({
  id,
  title,
  image,
  price,
  quantity,
  cartLength,
  toggleCart
}: CartItemProps) {
  const { deleteProduct, handleProductQuantity } =
    useContext(ShoppingCartContext);

  return (
    <motion.li
      className={`${cartLength > 5 && 'mr-6'}`}
      key={id}
      {...setTransition({
        direction: 'right',
        layout: true,
        durationOut: 0.25
      })}
    >
      <div className='rounded-lg border border-neutral-700'>
        <div className='flex'>
          <Link
            className='flex h-[108px] w-[108px] shrink-0 items-center 
                       justify-center rounded-l-lg bg-white'
            to={`/product/${id}`}
            onClick={toggleCart}
          >
            <img className='h-full w-full p-4' src={image} alt={title} />
          </Link>
          <div className='flex w-full flex-col justify-between py-2 px-4'>
            <Link to={`/product/${id}`} onClick={toggleCart}>
              <h3
                className='overflow-hidden text-ellipsis [display:-webkit-box]
                           [-webkit-line-clamp:1] [-webkit-box-orient:vertical]'
              >
                {title}
              </h3>
              <p className='text-lg font-bold'>{formatCurrency(price)}</p>
            </Link>
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
              <p>Total: {formatCurrency(price * quantity)}</p>
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
