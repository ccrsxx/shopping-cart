import { createContext } from 'react';
import type { IShoppingCartContext } from '../types';

export const ShoppingCartContext = createContext<IShoppingCartContext>(
  {} as IShoppingCartContext
);
