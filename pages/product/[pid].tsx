import NotFound from 'pages/404';
import { getAllProductsId, getProductData } from '@lib/api/products';
import { ProductView } from '@components/product/product-view';
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import type { Product, ProductsParams } from '@lib/api/products';

type StaticPaths = {
  paths: ProductsParams;
  fallback: boolean | 'blocking';
};

export async function getStaticPaths(): Promise<StaticPaths> {
  const paths = await getAllProductsId();

  return {
    paths,
    fallback: 'blocking'
  };
}

type StaticProps = {
  props: {
    pid: string;
    productData: Product | null;
  };
};

export async function getStaticProps({
  params
}: GetStaticPropsContext<{ pid: string }>): Promise<StaticProps> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { pid } = params!;
  const productData = await getProductData(pid);

  return {
    props: {
      pid,
      productData
    }
  };
}

export default function Product({
  pid,
  productData
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  return productData ? (
    <ProductView pid={pid} productData={productData} />
  ) : (
    <NotFound pid={pid} />
  );
}
