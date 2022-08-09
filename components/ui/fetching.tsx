import cn from 'clsx';
import { motion } from 'framer-motion';
import { setTransition } from '@lib/transition';
import { VscLoading } from '@assets/icons';

type FetchingProps = {
  className?: string;
};

export function Fetching({ className }: FetchingProps): JSX.Element {
  return (
    <motion.div
      className={cn(
        'flex w-full flex-1 items-center justify-center self-center',
        className
      )}
      {...setTransition({ direction: 'top' })}
    >
      <i className='animate-spin'>
        <VscLoading size={72} />
      </i>
    </motion.div>
  );
}
