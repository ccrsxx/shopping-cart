import { Fetching } from '../../components';
import { useShoppingCart } from '../../contexts';
import { Aside, Listing } from './components';

export function Store() {
  const { isFetching, isError } = useShoppingCart();

  return (
    <main className='flex flex-col items-start gap-6 md:flex-row md:gap-8'>
      <Aside />
      {isFetching ? <Fetching /> : <Listing />}
    </main>
  );
}
