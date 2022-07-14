import { Link } from 'react-router-dom';
import { useShoppingCart } from '../../../contexts';

interface CategoryLinkProps {
  category: string;
}

export function CategoryLink({ category }: CategoryLinkProps): JSX.Element {
  const { parameter } = useShoppingCart();

  const searchParam = parameter.get('search');

  const newParameter = new URLSearchParams({
    ...(searchParam && { search: searchParam }),
    ...(category !== 'all' && { category })
  });

  const isActive =
    category === 'all'
      ? !parameter.get('category')
      : parameter.get('category') === category;

  return (
    <Link
      className={`${
        isActive && 'text-primary'
      } tab transition hover:brightness-125`}
      to={`/store?${newParameter}`}
    >
      {category}
    </Link>
  );
}
