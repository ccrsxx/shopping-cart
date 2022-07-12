import { motion } from 'framer-motion';
import { setTransition } from '../../utils';

export function About() {
  return (
    <motion.main {...setTransition({ direction: 'right' })}>
      <h1 className='text-3xl'>About</h1>
      <p className='text-grayish'>
        This is a simple React app that demonstrates the use of React Router.
      </p>
    </motion.main>
  );
}
