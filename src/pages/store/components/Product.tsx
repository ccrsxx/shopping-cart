import { Link } from 'react-router-dom';

interface ProductProps {
  id: number;
  title: string;
  image: string;
  price: number;
}

export function Product({ id, title, image, price }: ProductProps) {
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
        />
      </div>
      <div className='p-2'>
        <p
          className='overflow-hidden text-ellipsis [display:-webkit-box] 
                           [-webkit-line-clamp:2] [-webkit-box-orient:vertical]'
        >
          {title}
        </p>
        <p className='font-bold'>${price}</p>
      </div>
    </Link>
  );
}
