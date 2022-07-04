import { motion } from 'framer-motion';
import { setTransition } from '../../../utils';

interface ImageProps {
  image?: string;
  title?: string;
}

export function Image({ image, title }: ImageProps) {
  return (
    <motion.div
      className='flex h-[300px] w-[300px] shrink-0 items-center justify-center rounded-lg bg-white'
      {...setTransition({ direction: 'left' })}
    >
      <img className='h-full w-full p-4' src={image} alt={title} />
    </motion.div>
  );
}
