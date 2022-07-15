import { useState, useEffect } from 'react';
import { useAnimation, motion } from 'framer-motion';
import { useWindowSize } from '../../hooks';
import { useShoppingCart } from '../../context';
import { MdSearch } from '../../assets';
import { Button } from '../ui';

export function SearchBar(): JSX.Element {
  const { parameter, pathname, navigate } = useShoppingCart();

  const [searchInput, setSearchInput] = useState('');
  const [width] = useWindowSize();

  const controls = useAnimation();

  useEffect(() => {
    const searchParams = parameter.get('search');

    if (!searchParams) setSearchInput('');
    else setSearchInput(searchParams);
  }, [pathname]);

  const setMaxWidth = (maxWidth: number) => (): void => {
    controls.start({
      maxWidth
    });
  };

  const handleChange = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>): void => setSearchInput(value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const categoryParam = parameter.get('category');

    const newParameter = new URLSearchParams({
      search: searchInput,
      ...(categoryParam && { category: categoryParam })
    });

    navigate(`/store?${newParameter}`);
  };

  const isMobile = width < 768;

  return (
    <motion.form
      className={`${
        isMobile && '!max-w-full'
      } flex w-full flex-1 items-center gap-2 focus-within:max-w-sm
        md:flex-initial lg:-translate-x-[25%]`}
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
