import type { Location } from 'react-router-dom';
import type { IProduct } from './IProduct';
import type { ICart } from './ICart';

export interface IShoppingCartContext {
  allProducts: IProduct[];
  currentCart: ICart[];
  isCartOpen: boolean;
  parameter: URLSearchParams;
  location: Location;
  addProduct: (productId: number) => () => void;
  deleteProduct: (productId: number) => () => void;
}
