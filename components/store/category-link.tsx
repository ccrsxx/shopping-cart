import Link from 'next/link';
import cn from 'clsx';

type CategoryLinkProps = {
  search: string | undefined;
  category: string | undefined;
  categoryName: string;
  currentCategory: string | null;
};

export function CategoryLink({
  search,
  category,
  categoryName,
  currentCategory
}: CategoryLinkProps): JSX.Element {
  const isActive =
    categoryName === 'all' ? !category : category === categoryName;

  return (
    <Link
      href={{
        pathname: '/store',
        query: {
          ...(search && { search }),
          ...(categoryName !== 'all' && { category: categoryName })
        }
      }}
    >
      <a
        className={cn(
          'tab transition hover:brightness-125',
          currentCategory && isActive && 'text-primary'
        )}
      >
        {categoryName}
      </a>
    </Link>
  );
}
