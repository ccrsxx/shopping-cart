import { useState, useEffect } from 'react';
import { useAnimation, motion } from 'framer-motion';
import { useShoppingCart } from '../contexts';
import { MdSearch } from '../utils';
import { Button } from './Button';

export function SearchBar() {
  const {
    parameter,
    location: { pathname },
    navigate
  } = useShoppingCart();

  const [searchInput, setSearchInput] = useState('');
  const controls = useAnimation();

  useEffect(() => {
    if (pathname !== '/store') setSearchInput('');
  }, [pathname]);

  const setMaxWidth = (maxWidth: number) => () => {
    controls.start({
      maxWidth
    });
  };

  const handleChange = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => setSearchInput(value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const categoryParam = parameter.get('category');

    const searchParams = new URLSearchParams({
      search: searchInput,
      ...(categoryParam && { category: categoryParam })
    });

    navigate(`/store?${searchParams}`);
  };

  return (
    <motion.form
      className='flex w-full items-center gap-2 focus-within:max-w-sm'
      initial={{ maxWidth: 300 }}
      animate={controls}
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        className='tab w-full rounded-lg border border-neutral-500 bg-inherit px-2 py-1'
        placeholder='Search product...'
        onFocus={setMaxWidth(500)}
        onBlur={setMaxWidth(300)}
        onChange={handleChange}
        value={searchInput}
      />
      <Button type='submit' className='!p-2 text-2xl' Icon={MdSearch} />
    </motion.form>
  );
}
