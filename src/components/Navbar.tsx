import { NavLink } from 'react-router-dom';
import { useShoppingCart } from '../contexts';
import { MdShoppingCart } from '../utils';
import { navLinks } from '../data';
import { SearchBar } from './SearchBar';
import { Button } from './Button';

export function Navbar(): JSX.Element {
  const { cartProducts, toggleCart } = useShoppingCart();

  return (
    <nav
      className='fixed z-10 grid w-full gap-2 border-b-2 border-b-border-primary 
                 bg-background/75 backdrop-blur-md md:grid-cols-2'
    >
      <ul className='flex items-center justify-center gap-6 text-2xl text-secondary md:justify-start'>
        {navLinks.map(([link, url]) => (
          <li key={url}>
            <NavLink
              className={({ isActive }): string =>
                `${isActive && 'text-primary'} tab hover:brightness-125`
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
        <Button className='relative !p-2' onClick={toggleCart}>
          <MdShoppingCart size={24} />
          <span
            className='absolute -right-0.5 -top-0.5 flex h-5 min-w-[20px] items-center justify-center 
                       rounded-full bg-main-red p-1 text-xs'
          >
            {cartProducts}
          </span>
        </Button>
      </div>
    </nav>
  );
}
