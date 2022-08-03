import { motion } from 'framer-motion';
import { ImageLoader } from '../../../components';
import { setTransition } from '../../../utils';

interface ImageProps {
  image?: string;
  title?: string;
}

export function Image({ image, title }: ImageProps): JSX.Element {
  return (
    <motion.div {...setTransition({ direction: 'left' })}>
      <ImageLoader
        divStyle='h-full w-full shrink-0 rounded-lg bg-primary sm:w-[300px]'
        imageStyle='aspect-square w-full p-4'
        src={image!}
        alt={title!}
      />
    </motion.div>
  );
}
