import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useShoppingCart } from '../contexts';
import {
  formatCurrency,
  setTransition,
  MdAdd,
  MdRemove,
  MdDelete
} from '../utils';
import { Button } from './Button';

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
  const { deleteProduct, handleProductQuantity } = useShoppingCart();

  const handleClick = () => toggleCart();

  return (
    <motion.li
      key={id}
      {...setTransition({
        layout: true,
        delayIn: index * 0.02,
        direction: 'right',
        durationOut: 0.25
      })}
    >
      <div className='flex rounded-lg border border-neutral-700'>
        <Link
          className='hidden h-[110px] w-[110px] shrink-0 items-center justify-center
                     rounded-l-lg bg-white transition hover:brightness-110 md:flex'
          to={`/product/${id}`}
          onClick={handleClick}
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
              onClick={handleClick}
            >
              {title}
            </Link>
            <p className='font-bold'>{formatCurrency(price)}</p>
          </div>
          <div className='flex flex-wrap justify-between text-sm font-light'>
            <div className='flex gap-1'>
              <p>Quantity: </p>
              <input
                className='max-w-[60px] rounded-lg bg-dark px-1 transition hover:ring-2 hover:ring-accent
                           focus:outline-none focus:ring-2 focus:ring-accent'
                type='number'
                min={1}
                max={10_000}
                value={quantity}
                onChange={handleProductQuantity(id)}
              />
            </div>
            <p>
              Total:{' '}
              <span className='font-semibold'>
                {formatCurrency(price * quantity)}
              </span>
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
    </motion.li>
  );
}
