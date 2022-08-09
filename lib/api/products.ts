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
