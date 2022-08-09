import { motion } from 'framer-motion';
import { setTransition } from '@lib/transition';

export function ContactHeader(): JSX.Element {
  return (
    <motion.h1
      className='text-4xl font-bold'
      {...setTransition({ direction: 'right' })}
    >
      Contact us
    </motion.h1>
  );
}
