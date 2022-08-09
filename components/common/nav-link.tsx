import Link from 'next/link';
import cn from 'clsx';

type NavLinkProps = {
  href: string;
  linkName: string;
  pathname: string;
};

export function NavLink({
  href,
  linkName,
  pathname
}: NavLinkProps): JSX.Element {
  return (
    <Link href={href} key={href}>
      <a
        className={cn(
          'tab hover:brightness-125',
          pathname === href && 'text-primary'
        )}
      >
        {linkName}
      </a>
    </Link>
  );
}
