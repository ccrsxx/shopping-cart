import { NavLink } from 'react-router-dom';
import { useShoppingCart } from '../contexts';
import { MdShoppingCart } from '../utils';
import { SearchBar } from './SearchBar';
import { Button } from './Button';

const NavLinks = [
  ['Home', '/'],
  ['Store', '/store'],
  ['About', '/about']
];

export function Navbar() {
  const { cartProducts, toggleCart } = useShoppingCart();

  return (
    <nav
      className='fixed z-10 grid w-full gap-2 border-b-2 border-b-neutral-700 
                 bg-dark/75 px-8 py-4 backdrop-blur-md md:grid-cols-2'
    >
      <ul className='flex justify-center gap-6 text-2xl text-grayish md:justify-start'>
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
      <div className='flex justify-between gap-2 md:gap-0'>
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
      </div>
    </nav>
  );
}
