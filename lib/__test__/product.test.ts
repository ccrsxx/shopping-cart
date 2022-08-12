import {
  getAllProducts,
  getAllProductsId,
  getProductData
} from '@lib/api/products';

describe('api test', () => {
  it.skip('gets all the products', async () => {
    const products = await getAllProducts();

    expect(products).toHaveLength(20);
  }, 10_000);

  it.skip('gets all products id with range 1-20', async () => {
    const productsId = await getAllProductsId();
    const ids = [...Array(20).keys()].map((i: number) => i + 1);

    expect(productsId).toEqual(ids);
  }, 10_000);

  it.skip('gets product data', async () => {
    const product = await getProductData('3');

    expect(product).toHaveProperty('id', 3);
    expect(product).toHaveProperty('title', 'Mens Cotton Jacket');
    expect(product).toHaveProperty('price', 55.99);
  }, 10_000);

  it.skip('returns null if product not found', async () => {
    const invalidProductIds = [
      '-100',
      '0',
      '21',
      '100',
      'emilia',
      'rem',
      'lena'
    ];

    const promises = invalidProductIds.map((id) => getProductData(id));

    const products = await Promise.all(promises);

    products.forEach((product) => expect(product).toBeNull());
  }, 10_000);
});
