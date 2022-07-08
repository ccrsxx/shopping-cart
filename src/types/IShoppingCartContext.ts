import type { Location, NavigateFunction } from 'react-router-dom';
import type { IProduct } from './IProduct';
import type { ICart } from './ICart';

export interface IShoppingCartContext {
  allProducts: IProduct[];
  currentCart: ICart[];
  isCartOpen: boolean;
  parameter: URLSearchParams;
  location: Location;
  navigate: NavigateFunction;
  clearInput: () => void;
  addProduct: (productId: number) => () => void;
  deleteProduct: (productId: number) => () => void;
  handleProductQuantity: (
    productId: number,
    type?: 'increment' | 'decrement'
  ) => (e?: React.ChangeEvent<HTMLInputElement>) => void;
}
