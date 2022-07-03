import { NavLink } from 'react-router-dom';
import { Button } from './Button';
import { MdShoppingCart } from '../utils';

export function Navbar() {
  return (
    <nav
      className='fixed flex w-full items-center justify-between border-b-2
               border-b-neutral-700 bg-dark px-8 py-4'
    >
      <ul className='text flex gap-6 text-2xl text-grayish'>
        <li>
          <NavLink
            className={({ isActive }) =>
              `${isActive && 'text-white'} tab hover:brightness-125`
            }
            to='/'
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `${isActive && 'text-white'} tab hover:brightness-125`
            }
            to='store'
          >
            Store
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              `${isActive && 'text-white'} tab hover:brightness-125`
            }
            to='about'
          >
            About
          </NavLink>
        </li>
      </ul>
      <Button className='relative !w-auto !max-w-none !rounded-full !p-2'>
        <MdShoppingCart size={24} />
        <span
          className='absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center 
                     rounded-full bg-red-400 text-xs'
        >
          24
        </span>
      </Button>
    </nav>
  );
}
