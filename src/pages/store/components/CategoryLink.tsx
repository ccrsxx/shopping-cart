import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from '../../../contexts';

interface CategoryLinkProps {
  category: string;
}

export function CategoryLink({ category }: CategoryLinkProps) {
  const { parameter } = useContext(ShoppingCartContext);

  const searchParam = parameter.get('search');
  const searchQuery = searchParam ? `?search=${searchParam}` : '';

  const isActive =
    category === 'all'
      ? !parameter.get('category')
      : parameter.get('category') === category;

  return (
    <Link
      className={`${isActive && 'text-white'} transition hover:brightness-125`}
      to={
        category === 'all'
          ? `/store${searchQuery}`
          : `/store${searchQuery}${searchQuery ? '&' : '?'}category=${category}`
      }
    >
      {category}
    </Link>
  );
}
