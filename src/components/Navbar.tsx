import { NavLink } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { Button } from './Button';
import { MdSearch, MdShoppingCart } from '../utils';

interface NavbarProps {
  searchInput: string;
  cartProducts: number;
  toggleCart: () => void;
  handleChange: ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function Navbar({
  searchInput,
  cartProducts,
  toggleCart,
  handleChange,
  handleSubmit
}: NavbarProps) {
  const controls = useAnimation();

  const setMaxWidth = (maxWidth: number) => () => {
    controls.start({
      maxWidth
    });
  };

  return (
    <nav
      className='fixed z-10 flex w-full items-center justify-between border-b-2
                 border-b-neutral-700 bg-dark/75 px-8 py-4 backdrop-blur-md'
    >
      <ul className='flex gap-6 text-2xl text-grayish'>
        {[
          ['Home', '/'],
          ['Store', 'store'],
          ['About', 'about']
        ].map(([link, url]) => (
          <li key={url}>
            <NavLink
              className={({ isActive }) =>
                `${isActive && 'text-white'} tab hover:brightness-125`
              }
              to={url}
            >
              {link}
            </NavLink>
          </li>
        ))}
      </ul>
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
      <Button className='relative !rounded-full !p-2' onClick={toggleCart}>
        <MdShoppingCart size={24} />
        <span
          className='absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center 
                     rounded-full bg-red-400 p-1 text-xs'
        >
          {cartProducts}
        </span>
      </Button>
    </nav>
  );
}
