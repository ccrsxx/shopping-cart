import { MainLayout } from '@components/common/main-layout';
import { ProductImage } from './product-image';
import { ProductDetail } from './product-detail';
import { ProductCart } from './product-cart';
import type { Product } from '@lib/api/products';

type ProductViewProps = {
  pid: string;
  productData: Product;
};

export function ProductView({
  pid,
  productData
}: ProductViewProps): JSX.Element {
  const {
    id,
    title,
    price,
    description,
    category,
    image,
    rating: { count, rate }
  } = productData;

  return (
    <MainLayout
      className='flex flex-col items-start gap-4 sm:flex-row md:gap-6 lg:justify-center lg:gap-8'
      title='Shopping Cart | Product'
      description='Buy this product and get free shipping.'
      image='/product.png'
      url={`/product/${pid}`}
    >
      <ProductImage image={image} title={title} key={id} />
      <div className='flex w-full max-w-4xl flex-col-reverse gap-4 md:gap-6 lg:flex-row lg:gap-8'>
        <ProductDetail
          title={title}
          count={count}
          rate={rate}
          price={price}
          category={category}
          description={description}
          key={title}
        />
        <ProductCart id={id} productData={productData} key={price} />
      </div>
    </MainLayout>
  );
}
