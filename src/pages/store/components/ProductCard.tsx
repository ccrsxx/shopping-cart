import { Link } from 'react-router-dom';
import { useShoppingCart } from '../../../contexts';
import { Button } from '../../../components';
import {
  formatCurrency,
  RiStarSFill,
  MdAddShoppingCart,
  MdRemoveShoppingCart
} from '../../../utils';

interface ProductCardProps {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: {
    count: number;
    rate: number;
  };
}

export function ProductCard({
  id,
  title,
  image,
  price,
  rating: { count, rate }
}: ProductCardProps) {
  const { currentCart, addProduct, deleteProduct } = useShoppingCart();

  const { quantity } =
    currentCart.find(({ id: cartId }) => cartId === id) ?? {};

  const { label, Icon, onClick } = quantity
    ? { label: 'Remove', Icon: MdRemoveShoppingCart, onClick: deleteProduct }
    : { label: 'Add', Icon: MdAddShoppingCart, onClick: addProduct };

  const handleClick = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    onClick(id)();
  };

  return (
    <Link
      to={`/product/${id}`}
      className='tab group relative rounded-lg ring-2 ring-border-primary
                 transition duration-300 hover:ring hover:ring-accent'
    >
      <div
        className='flex h-[230px] items-center justify-center rounded-t-lg bg-primary transition
                   duration-300 group-hover:brightness-95'
      >
        <img
          className='h-full w-auto rounded-t-lg p-4'
          src={image}
          alt={title}
          loading='lazy'
        />
      </div>
      <div className='flex flex-col gap-1 p-2'>
        <div>
          <p
            className='overflow-hidden text-ellipsis [display:-webkit-box]
                       [-webkit-line-clamp:2] [-webkit-box-orient:vertical]'
          >
            {title}
          </p>
          <p className='font-bold'>{formatCurrency(price)}</p>
        </div>
        <div>
          <p className='flex items-center gap-1 text-sm font-light'>
            <i className='text-yellow-400'>
              <RiStarSFill />
            </i>{' '}
            {rate} | Sold {count}
          </p>
        </div>
      </div>
      <div className='absolute bottom-2 right-2'>
        <Button
          className='border border-transparent transition duration-300 
                     group-hover:border-border-secondary'
          label={label}
          Icon={Icon}
          onClick={handleClick}
        />
      </div>
    </Link>
  );
}
