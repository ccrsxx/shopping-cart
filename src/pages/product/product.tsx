import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Image, Details, AddCart } from './components';
import { Fetching } from '../../components';
import { ShoppingCartContext } from '../../contexts';

interface ProductProps {
  isFetching: boolean;
  isError: boolean;
}

export function Product({ isFetching, isError }: ProductProps) {
  const { allProducts } = useContext(ShoppingCartContext);
  const { productId } = useParams();

  const product = allProducts.find(({ id }) => id === parseInt(productId!, 10));

  const { id, title, price, description, category, image, rating } =
    product ?? {};

  const { count, rate } = rating ?? {};

  return (
    <main className='flex min-h-screen justify-center gap-8 px-8 py-6 pt-28'>
      {isFetching ? (
        <Fetching />
      ) : (
        <>
          <Image image={image} title={title} />
          <Details
            title={title}
            count={count}
            rate={rate}
            price={price}
            category={category}
            description={description}
          />
          <AddCart id={id} />
        </>
      )}
    </main>
  );
}
