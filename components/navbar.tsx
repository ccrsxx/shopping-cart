import Link from 'next/link';
import { useRouter } from 'next/router';
import { SearchBar } from '@components/search-bar';
// import { Cart } from './Cart';

const navLinks = [
  ['Home', '/'],
  ['Store', '/store'],
  ['Contact', '/contact']
];

export function Navbar(): JSX.Element {
  const { pathname } = useRouter();

  return (
    <nav
      className='fixed z-10 grid w-full gap-2 border-b-2 border-b-border-primary 
                 bg-background/75 backdrop-blur-md md:grid-cols-2'
    >
      <ul className='flex items-center justify-center gap-6 text-2xl text-secondary md:justify-start'>
        {navLinks.map(([link, url]) => (
          <li key={link}>
            <Link href={url}>
              <a
                className={`${
                  pathname === url ? 'text-primary' : ''
                } tab hover:brightness-125`}
              >
                {link}
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <div className='flex justify-between gap-2 md:gap-0'>
        <SearchBar />
        {/* <Cart /> */}
      </div>
    </nav>
  );
}
