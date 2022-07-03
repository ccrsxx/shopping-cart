import type { IProduct } from './IProduct';

export interface IStoreContext {
  allProducts: IProduct[];
  parameter: URLSearchParams;
}
