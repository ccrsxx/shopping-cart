import { motion } from 'framer-motion';
import { setTransition, VscLoading } from '../utils';

interface FetchingProps {
  className?: string;
}

export function Fetching({ className }: FetchingProps) {
  return (
    <motion.main
      className={`${className} flex w-full items-center justify-center`}
      {...setTransition({ direction: 'top' })}
    >
      <i className='animate-spin'>
        <VscLoading size={72} />
      </i>
    </motion.main>
  );
}
