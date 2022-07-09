import { useParams } from 'react-router-dom';
import { Fetching } from '../../components';
import { NotFound } from '../404';
import { useShoppingCart } from '../../contexts';
import { Image, Details, AddCart } from './components';

export function Product() {
  const { allProducts, isFetching, isError } = useShoppingCart();
  const { productId } = useParams();

  const product = allProducts.find(({ id }) => id === parseInt(productId!, 10));

  const {
    id,
    title,
    price,
    description,
    category,
    image,
    rating: { count, rate }
  } = product ?? { rating: {} };

  return isFetching ? (
    <Fetching className='min-h-screen justify-center pt-28' />
  ) : id ? (
    <main className='flex min-h-screen justify-center gap-8 px-8 py-6 pt-28'>
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
    </main>
  ) : (
    <NotFound productId={productId} />
  );
}
