import { useContext, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCartContext } from '../../contexts';
import { setTransition } from '../../utils';

export function NotFound() {
  const navigate = useNavigate();

  const {
    location: { pathname }
  } = useContext(ShoppingCartContext);

  useEffect(() => {
    const timeoutId = setTimeout(() => navigate('/'), 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  const currentPage = useMemo(() => pathname, []);

  return (
    <motion.main
      className='flex h-screen flex-col items-center justify-center
                 px-8 py-6 pt-28'
      {...setTransition({ direction: 'top', distance: 100 })}
    >
      <div
        className='flex w-full max-w-md flex-col items-center gap-8
                   rounded-lg border border-neutral-700'
      >
        <div className='flex flex-col items-center gap-4 p-8'>
          <h1 className='text-8xl font-bold text-pink-400'>404</h1>
          <p className='text-2xl font-medium'>
            Page <span className='font-semibold'>{currentPage}</span> not found
          </p>
        </div>
        <div className='flex w-full flex-col items-center gap-4'>
          <h2 className='text-lg font-light text-grayish'>
            Redirection to homepage...
          </h2>
          <motion.span
            className='h-1 w-full self-start rounded-b-lg bg-pink-400'
            initial={{ width: 0 }}
            animate={{ width: '100%', transition: { duration: 3 } }}
          />
        </div>
      </div>
    </motion.main>
  );
}
