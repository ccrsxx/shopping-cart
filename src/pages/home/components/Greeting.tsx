import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../../components';
import { setTransition } from '../../../utils';

export function Greeting() {
  return (
    <motion.div
      className='flex max-w-xl flex-col gap-4 text-center'
      {...setTransition({ direction: 'bottom' })}
    >
      <h1 className='text-3xl font-bold sm:text-4xl'>
        The One Stop Shop for All Your Shopping Needs!
      </h1>
      <p className='text-base text-secondary sm:text-lg'>
        Hi! Welcome to our shopping website. We are excited to offer you a great
        selection of products at amazing prices. We are sure you will find
        something you love. Thank you for choosing us.
      </p>
      <div className='mx-auto mt-1'>
        <Link to='/store' tabIndex={-1}>
          <Button
            className='border border-border-secondary sm:text-base'
            label='Start Shopping'
          />
        </Link>
      </div>
    </motion.div>
  );
}
