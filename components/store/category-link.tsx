import { useRouter } from 'next/router';
import Link from 'next/link';
import cn from 'clsx';

type CategoryLinkProps = {
  categoryName: string;
};

export type QueryType = {
  query: {
    [queryName: string]: string | undefined;
  };
};

export function CategoryLink({ categoryName }: CategoryLinkProps): JSX.Element {
  const {
    query: { search, category }
  } = useRouter() as QueryType;

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
          isActive && 'text-primary'
        )}
      >
        {categoryName}
      </a>
    </Link>
  );
}
