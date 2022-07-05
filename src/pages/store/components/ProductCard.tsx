import { Link } from 'react-router-dom';
import { formatCurrency, RiStarSFill } from '../../../utils';

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
  return (
    <Link
      to={`/product/${id}`}
      className='rounded-lg border border-neutral-700'
      key={id}
    >
      <div className='flex h-[230px] items-center justify-center rounded-t-lg bg-white'>
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
    </Link>
  );
}
