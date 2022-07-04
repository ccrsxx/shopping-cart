import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from '../../../contexts';

interface CategoryLinkProps {
  category: string;
}

export function CategoryLink({ category }: CategoryLinkProps) {
  const { parameter } = useContext(ShoppingCartContext);
  const isActive =
    category === 'all'
      ? !parameter.get('category')
      : parameter.get('category') === category;

  return (
    <Link
      className={`${isActive && 'text-white'} transition hover:brightness-125`}
      to={category === 'all' ? '/store' : `/store?category=${category}`}
    >
      {category}
    </Link>
  );
}
