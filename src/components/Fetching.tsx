import { motion } from 'framer-motion';
import { setTransition, VscLoading } from '../utils';

interface FetchingProps {
  className?: string;
}

export function Fetching({ className }: FetchingProps) {
  return (
    <motion.div
      className={`${className} flex w-full flex-1 items-center justify-center self-center`}
      {...setTransition({ direction: 'top' })}
    >
      <i className='animate-spin'>
        <VscLoading size={72} />
      </i>
    </motion.div>
  );
}
