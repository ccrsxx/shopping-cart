import { motion } from 'framer-motion';
import { setTransition } from '../../utils';
import { Carousel } from './components';

export function Home() {
  return (
    <motion.main
      className='flex flex-col items-center'
      {...setTransition({ direction: 'left' })}
    >
      <Carousel />
    </motion.main>
  );
}
