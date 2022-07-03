import { getAllProducts, getProductById } from '../api';

describe('api test', () => {
  it('gets all the products', async () => {
    const products = await getAllProducts();
    expect(products).toHaveLength(20);
  }, 10_000);

  it('can get product with id', async () => {
    const product = await getProductById(12);
    expect(product.id).toBe(12);
  }, 10_000);
});
