import { Aside, Fetching, Listing } from './components';

interface StoreProps {
  isFetching: boolean;
  isError: boolean;
}

export function Store({ isFetching, isError }: StoreProps) {
  return (
    <main className='flex gap-8 px-8 py-6 pt-28'>
      <Aside />
      {isFetching ? <Fetching /> : <Listing />}
    </main>
  );
}
