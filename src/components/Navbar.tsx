import { NavLink } from 'react-router-dom';
import { navLinks } from '../data';
import { SearchBar } from './SearchBar';
import { Cart } from './Cart';

export function Navbar(): JSX.Element {
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
        <Cart />
      </div>
    </nav>
  );
}
