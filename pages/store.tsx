import { MainLayout } from '@components/common/main-layout';
import { Aside } from '@components/store/aside';
import { Listing } from '@components/store/listing';
import { getAllProducts } from '@lib/api/products';
import type { InferGetStaticPropsType } from 'next';
import type { Products } from '@lib/api/products';

type StaticProps = {
  props: {
    allProducts: Products;
  };
};

export async function getStaticProps(): Promise<StaticProps> {
  const allProducts = await getAllProducts();

  return {
    props: {
      allProducts
    }
  };
}

export default function Store({
  allProducts
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return (
    <MainLayout
      className='flex flex-col items-start gap-6 md:flex-row md:gap-8'
      title='Shopping Cart | Store'
      description='You can find everything you need here.'
      image='/store.png'
      url='/store'
    >
      <Aside />
      <Listing allProducts={allProducts} />
    </MainLayout>
  );
}
