import { motion } from 'framer-motion';
import cn from 'clsx';
import { setTransition } from '@lib/transition';
import { VscLoading } from '@assets/icons';

export function Loading(): JSX.Element {
  return (
    <motion.div
      className='flex items-center justify-center'
      {...setTransition({ direction: 'top' })}
    >
      <i className='animate-spin text-6xl'>
        <VscLoading />
      </i>
    </motion.div>
  );
}
