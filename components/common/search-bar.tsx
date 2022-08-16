import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import cn from 'clsx';
import { useAnimation, motion } from 'framer-motion';
import { useShoppingCart } from '@lib/context/shopping-cart';
import { MdSearch } from '@assets/icons';
import { Button } from '@components/ui/button';
import type { ChangeEvent, FormEvent } from 'react';
import type { UrlObject } from 'url';
import type { QueryType } from '@components/store/aside';

export type ExtraQueryType = QueryType & {
  push: (url: UrlObject | string) => Promise<boolean>;
};

export function SearchBar(): JSX.Element {
  const { isMobile } = useShoppingCart();

  const {
    pathname,
    query: { search, category },
    push
  } = useRouter() as ExtraQueryType;

  const [searchInput, setSearchInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const controls = useAnimation();

  useEffect(() => {
    if (!search) setSearchInput('');
    else setSearchInput(search);
  }, [search, pathname]);

  useEffect(() => {
    setIsExpanded(isMobile);
  }, [isMobile]);

  const setMaxWidth = (maxWidth: number) => (): void =>
    void controls.start({
      maxWidth
    });

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => setSearchInput(value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    void push({
      pathname: '/store',
      query: {
        ...(searchInput && { search: searchInput }),
        ...(category && { category })
      }
    });
  };

  return (
    <motion.form
      className={cn(
        `flex w-full flex-1 items-center gap-2 focus-within:max-w-sm
         md:flex-initial lg:-translate-x-[25%]`,
        isExpanded && '!max-w-full'
      )}
      initial={{ maxWidth: 300 }}
      animate={controls}
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        className='tab w-full rounded-lg border border-neutral-500 bg-inherit px-2 py-1'
        placeholder='Search product'
        onFocus={setMaxWidth(500)}
        onBlur={setMaxWidth(300)}
        onChange={handleChange}
        value={searchInput}
      />
      <Button type='submit' className='!p-2 text-2xl' Icon={MdSearch} />
    </motion.form>
  );
}
