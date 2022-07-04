import { motion } from 'framer-motion';
import { setTransition, VscLoading } from '../utils';

export function Fetching() {
  return (
    <motion.main
      className='flex w-full items-center justify-center'
      {...setTransition({ direction: 'top' })}
    >
      <i className='animate-spin'>
        <VscLoading size={72} />
      </i>
    </motion.main>
  );
}
