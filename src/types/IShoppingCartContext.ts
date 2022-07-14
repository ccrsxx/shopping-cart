import type { NavigateFunction } from 'react-router-dom';
import type { IProduct } from './IProduct';
import type { ICart } from './ICart';

export interface IShoppingCartContext {
  cartProducts: number;
  allProducts: IProduct[];
  currentCart: ICart[];
  totalPrice: number;
  isCartOpen: boolean;
  isFetching: boolean;
  parameter: URLSearchParams;
  pathname: string;
  isError: boolean;
  navigate: NavigateFunction;
  clearCart: () => void;
  toggleCart: () => void;
  addProduct: (productId: number) => () => void;
  deleteProduct: (productId: number) => () => void;
  fetchAllProducts: (retry?: boolean) => () => void;
  handleProductQuantity: (
    productId: number,
    type?: 'increment' | 'decrement'
  ) => (e?: React.ChangeEvent<HTMLInputElement>) => void;
}
