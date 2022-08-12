export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    count: number;
    rate: number;
  };
};

export type Products = Product[];

export async function getAllProducts(): Promise<Products> {
  const res = await fetch('https://fakestoreapi.com/products');
  const data = (await res.json()) as Products;
  return data;
}

type ProductParams = {
  params: {
    pid: string;
  };
};

export type ProductsParams = ProductParams[];

export async function getAllProductsId(): Promise<ProductsParams> {
  const res = await getAllProducts();
  return res.map((product) => ({
    params: {
      pid: String(product.id)
    }
  }));
}

function isInDb(id: string): boolean {
  if (isNaN(+id)) return false;
  const num = parseInt(id, 10);
  return num >= 1 && num <= 20;
}

export async function getProductData(id: string): Promise<Product | null> {
  if (!isInDb(id)) return null;

  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = (await res.json()) as Product;
  return data;
}
