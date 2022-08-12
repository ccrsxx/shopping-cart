import { motion } from 'framer-motion';
import { ImageLoader } from '@components/ui/image-loader';
import { setTransition } from '@lib/transition';

interface ProductImageProps {
  image: string;
  title: string;
}

export function ProductImage({ image, title }: ProductImageProps): JSX.Element {
  return (
    <motion.div
      className='w-full sm:w-auto'
      {...setTransition({ direction: 'left' })}
    >
      <ImageLoader
        divStyle='h-full w-full shrink-0 rounded-lg bg-primary sm:w-[300px] aspect-square'
        imageStyle='!p-4'
        src={image}
        alt={title}
      />
    </motion.div>
  );
}
