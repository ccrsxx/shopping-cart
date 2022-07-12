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
    <main className='flex flex-col justify-center gap-4 sm:flex-row md:gap-6 lg:gap-8'>
      <Image image={image} title={title} />
      <div className='flex w-full max-w-4xl flex-col-reverse gap-4 md:gap-6 lg:flex-row lg:gap-8'>
        <Details
          title={title}
          count={count}
          rate={rate}
          price={price}
          category={category}
          description={description}
        />
        <AddCart id={id} />
      </div>
    </main>
  ) : (
    <NotFound productId={productId} />
  );
}
