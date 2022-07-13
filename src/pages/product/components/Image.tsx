import { motion } from 'framer-motion';
import { setTransition } from '../../../utils';

interface ImageProps {
  image?: string;
  title?: string;
}

export function Image({ image, title }: ImageProps) {
  return (
    <motion.div
      className='flex h-full w-full shrink-0 items-center justify-center 
                 rounded-lg bg-primary sm:w-[300px]'
      {...setTransition({ direction: 'left' })}
    >
      <img className='aspect-square w-full p-4' src={image} alt={title} />
    </motion.div>
  );
}
