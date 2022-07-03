import { Link, useSearchParams } from 'react-router-dom';

interface CategoryLinkProps {
  category: string;
}

export function CategoryLink({ category, ...props }: CategoryLinkProps) {
  const [param] = useSearchParams();
  const isActive =
    category === 'all'
      ? !param.get('category')
      : param.get('category') === category;

  return (
    <Link
      className={`${isActive && 'text-white'} transition hover:brightness-125`}
      to={category === 'all' ? '/store' : `/store?category=${category}`}
      {...props}
    >
      {category}
    </Link>
  );
}
