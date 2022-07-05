import { motion } from 'framer-motion';
import { setTransition } from '../../utils';

export function About() {
  return (
    <motion.main
      className='px-8 py-6 pt-28'
      {...setTransition({ direction: 'right' })}
    >
      <h1 className='text-3xl'>About</h1>
      <p className='text-darkgray'>
        This is a simple React app that demonstrates the use of React Router.
      </p>
    </motion.main>
  );
}
