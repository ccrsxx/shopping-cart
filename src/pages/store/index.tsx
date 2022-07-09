import { Fetching } from '../../components';
import { useShoppingCart } from '../../contexts';
import { Aside, Listing } from './components';

export function Store() {
  const { isFetching, isError } = useShoppingCart();

  return (
    <main className='flex gap-8 px-8 py-6 pt-28'>
      <Aside />
      {isFetching ? <Fetching /> : <Listing />}
    </main>
  );
}
