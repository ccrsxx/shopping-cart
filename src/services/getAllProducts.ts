import type { IProduct } from '../types/IProduct';

export async function getAllProducts(): Promise<IProduct[]> {
  const res = await fetch('https://fakestoreapi.com/products');
  const data = await res.json();
  return data;
}
