import { createContext } from 'react';
import type { IStoreContext } from '../types';

export const StoreContext = createContext<IStoreContext>({} as IStoreContext);
