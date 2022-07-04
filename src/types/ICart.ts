import type { IProduct } from './IProduct';

export interface ICart extends IProduct {
  quantity: number;
}
