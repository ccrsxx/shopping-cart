import { useRouter } from 'next/router';
import { Cart } from '@components/cart/cart';
import { NavLink } from './nav-link';
import { SearchBar } from './search-bar';

const navLinks = [
  ['Home', '/'],
  ['Store', '/store'],
  ['Contact', '/contact']
];

export function Navbar(): JSX.Element {
  const { pathname } = useRouter();

  const inStore = pathname === '/store';

  return (
    <header
      className='fixed z-10 grid w-full gap-2 border-b-2 border-b-border-primary 
                 bg-background/75 backdrop-blur-md md:grid-cols-2'
    >
      <nav className='flex items-center justify-center gap-6 text-2xl text-secondary md:justify-start'>
        {navLinks.map(([linkName, url]) => (
          <NavLink
            href={url}
            linkName={linkName}
            pathname={pathname}
            disableScroll={inStore}
            key={url}
          />
        ))}
      </nav>
      <div className='flex justify-between gap-2 md:gap-0'>
        <SearchBar />
        <Cart />
      </div>
    </header>
  );
}
