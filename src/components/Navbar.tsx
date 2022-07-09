import { NavLink } from 'react-router-dom';
import { MdShoppingCart } from '../utils';
import { SearchBar } from './SearchBar';
import { Button } from './Button';
import { useShoppingCart } from '../contexts';

const NavLinks = [
  ['Home', '/'],
  ['Store', '/store'],
  ['About', '/about']
];

export function Navbar() {
  const { cartProducts, toggleCart } = useShoppingCart();

  return (
    <nav
      className='fixed z-10 flex w-full items-center justify-between border-b-2
                 border-b-neutral-700 bg-dark/75 px-8 py-4 backdrop-blur-md'
    >
      <ul className='flex gap-6 text-2xl text-grayish'>
        {NavLinks.map(([link, url]) => (
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
      <SearchBar />
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
