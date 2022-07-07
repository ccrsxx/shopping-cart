import { motion } from 'framer-motion';
import { setTransition } from '../../utils';

export function Home() {
  return (
    <motion.main
      className='px-8 py-6 pt-28'
      {...setTransition({ direction: 'left' })}
    >
      <h1 className='text-3xl'>Home</h1>
      <p className='text-grayish'>
        This is a simple React app that demonstrates the use of React Router.
      </p>
    </motion.main>
  );
}
