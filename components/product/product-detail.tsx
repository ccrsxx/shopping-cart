/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { motion } from 'framer-motion';
import { setTransition } from '@lib/transition';
import { formatCurrency } from '@lib/currency';
import { RiStarSFill } from '@assets/icons';

interface ProductDetailProps {
  title?: string;
  count?: number;
  rate?: number;
  price?: number;
  category?: string;
  description?: string;
}

export function ProductDetail({
  title,
  count,
  rate,
  price,
  category,
  description
}: ProductDetailProps): JSX.Element {
  return (
    <motion.div
      className='flex w-full shrink flex-col gap-4 self-start rounded-lg
                 border border-border-primary p-4 lg:max-w-none xl:max-w-xl'
      {...setTransition({ direction: 'bottom' })}
    >
      <div className='flex flex-col gap-4'>
        <div>
          <h1 className='text-2xl font-bold'>{title}</h1>
          <div className='flex gap-1'>
            <p>
              Sold <span className='font-light'>{count}</span>
            </p>
            <i>•</i>
            <p className='flex items-center justify-center'>
              <i className='text-yellow-400'>
                <RiStarSFill />
              </i>{' '}
              {rate}
            </p>
          </div>
        </div>
        <h2 className='text-3xl font-bold'>{formatCurrency(price!)}</h2>
      </div>
      <hr />
      <div className='flex flex-col gap-2'>
        <div>
          <p className='text-secondary'>
            Category: <span className='capitalize text-white'>{category}</span>
          </p>
        </div>
        <div>
          <p>{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
