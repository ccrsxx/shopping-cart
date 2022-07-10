import { Fetching } from '../../components';
import { useShoppingCart } from '../../contexts';
import { Aside, Listing } from './components';

export function Store() {
  const { isFetching, isError } = useShoppingCart();

  return (
    <main className='flex flex-col gap-6 px-8 py-6 pt-36 md:flex-row md:gap-8 md:pt-28'>
      <Aside />
      {isFetching ? <Fetching /> : <Listing />}
    </main>
  );
}
