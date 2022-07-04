import { NavLink } from 'react-router-dom';
import { Button } from './Button';
import { MdShoppingCart } from '../utils';

interface NavBarProps {
  cartLength: number;
  toggleCart: () => void;
}

export function Navbar({ cartLength, toggleCart }: NavBarProps) {
  return (
    <nav
      className='fixed z-10 flex w-full items-center justify-between
                 border-b-2 border-b-neutral-700 bg-dark px-8 py-4'
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
      <Button className='relative !rounded-full !p-2' onClick={toggleCart}>
        <MdShoppingCart size={24} />
        <span
          className='absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center 
                     rounded-full bg-red-400 text-xs'
        >
          {cartLength}
        </span>
      </Button>
    </nav>
  );
}
