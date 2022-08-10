import Link from 'next/link';
import cn from 'clsx';

type NavLinkProps = {
  href: string;
  linkName: string;
  pathname: string;
  disableScroll?: boolean;
};

export function NavLink({
  href,
  linkName,
  pathname,
  disableScroll
}: NavLinkProps): JSX.Element {
  const delayScroll = (): void => {
    setTimeout(() => window.scrollTo(0, 0), 500);
  };

  return (
    <Link href={href} key={href} scroll={!disableScroll}>
      <a
        className={cn(
          'tab hover:brightness-125',
          pathname === href && 'text-primary'
        )}
        onClick={disableScroll ? delayScroll : undefined}
      >
        {linkName}
      </a>
    </Link>
  );
}
