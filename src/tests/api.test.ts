import { getAllProducts } from '../api';

describe('api test', () => {
  it('gets all the products', async () => {
    const products = await getAllProducts();
    expect(products).toHaveLength(20);
  }, 10_000);
});
