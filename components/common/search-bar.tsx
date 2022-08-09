import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import cn from 'clsx';
import { useAnimation, motion } from 'framer-motion';
import { useWindowSize } from '@lib/hooks/useWindowSize';
import { MdSearch } from '@assets/icons';
import { Button } from '@components/ui/button';
import type { ChangeEvent, FormEvent } from 'react';
import type { ExtraQueryType } from '@components/store/listing';

export function SearchBar(): JSX.Element {
  const [searchInput, setSearchInput] = useState('');
  const [width] = useWindowSize();

  const controls = useAnimation();

  const router = useRouter();

  const {
    pathname,
    query: { search, category }
  } = router as ExtraQueryType;

  useEffect(() => {
    if (!search) setSearchInput('');
    else setSearchInput(search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const setMaxWidth = (maxWidth: number) => (): void =>
    void controls.start({
      maxWidth
    });

  const handleChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => setSearchInput(value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    void router.push({
      pathname: '/store',
      query: {
        search: searchInput,
        ...(category && { category })
      }
    });
  };

  const isMobile = width && width < 768;

  return (
    <motion.form
      className={cn(
        `flex w-full flex-1 items-center gap-2 focus-within:max-w-sm
         md:flex-initial lg:-translate-x-[25%]`,
        isMobile && '!max-w-full'
      )}
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
