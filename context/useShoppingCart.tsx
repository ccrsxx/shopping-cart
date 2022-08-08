// import {
//   useState,
//   useRef,
//   useEffect,
//   useMemo,
//   useContext,
//   createContext
// } from 'react';
// import { useLocalStorage as useStore } from '@hooks/useLocalStorage';
// import { getAllProducts } from '@lib/products';
// import type { Products } from '@lib/products';

// export interface IShoppingCartContext {
//   cartProducts: number;
//   allProducts: Products;
//   currentCart: any[];
//   totalPrice: number;
//   isFetching: boolean;
//   isError: boolean;
//   clearCart: () => void;
//   addProduct: (productId: number) => () => void;
//   deleteProduct: (productId: number) => () => void;
//   fetchAllProducts: (retry?: boolean) => () => void;
//   handleProductQuantity: (
//     productId: number,
//     type?: 'increment' | 'decrement'
//   ) => (e?: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const ShoppingCartContext = createContext<IShoppingCartContext | null>(null);

// export function useShoppingCart(): IShoppingCartContext {
//   const context = useContext<IShoppingCartContext>(ShoppingCartContext);

//   if (!context)
//     throw new Error(
//       'useShoppingCart must be used within a ShoppingCartContext'
//     );

//   return context;
// }

// interface ShoppingCartProviderProps {
//   children: React.ReactNode;
// }

// export function ShoppingCartProvider({
//   children
// }: ShoppingCartProviderProps): JSX.Element {
//   const [allProducts, setAllProducts] = useStore<Products>('allProducts', []);
//   const [currentCart, setCurrentCart] = useStore<ICart[]>('currentCart', []);
//   const [isFetching, setIsFetching] = useState(false);
//   const [isError, setIsError] = useState(false);

//   const isFirstRender = useRef<boolean | null>(null);

//   useEffect(() => {
//     if (!allProducts.length) void fetchAllProducts()();

//     isFirstRender.current = true;
//   }, []);

//   const fetchAllProducts = (retry?: boolean) => async (): Promise<void> => {
//     if (retry) setIsError(false);

//     setIsFetching(true);

//     try {
//       const products = await getAllProducts();
//       setAllProducts(products);
//     } catch (error) {
//       // eslint-disable-next-line no-console
//       console.error(error);
//       setIsError(true);
//     }

//     setIsFetching(false);
//   };

//   const addProduct = (productId: number) => (): void => {
//     const product = allProducts.find(({ id }) => id === productId);
//     setCurrentCart([{ ...product, quantity: 1 } as ICart, ...currentCart]);
//   };

//   const deleteProduct = (productId: number) => (): void =>
//     setCurrentCart(currentCart.filter(({ id }) => id !== productId));

//   const handleProductQuantity =
//     (productId: number, type?: 'increment' | 'decrement') =>
//     (e?: React.ChangeEvent<HTMLInputElement>): void => {
//       let inputValue = !type ? parseInt(e!.target.value, 10) : null;

//       if (!type && !inputValue) inputValue = 1;
//       else if (inputValue && inputValue >= 10_000) inputValue = 10_000;

//       setCurrentCart(
//         currentCart.map((cartProduct) =>
//           cartProduct.id === productId
//             ? {
//                 ...cartProduct,
//                 quantity:
//                   inputValue ??
//                   (type === 'increment'
//                     ? cartProduct.quantity + 1
//                     : cartProduct.quantity - 1)
//               }
//             : cartProduct
//         )
//       );
//     };

//   const clearCart = (): void => setCurrentCart([]);

//   const [cartProducts, totalPrice] = useMemo(
//     () =>
//       currentCart.reduce(
//         ([products, total], { price, quantity }) => [
//           products + quantity,
//           total + price * quantity
//         ],
//         [0, 0]
//       ),
//     [currentCart]
//   );

//   const value = {
//     cartProducts,
//     allProducts,
//     currentCart,
//     totalPrice,
//     isFetching,
//     isError,
//     clearCart,
//     addProduct,
//     deleteProduct,
//     fetchAllProducts,
//     handleProductQuantity
//   };

//   return (
//     <ShoppingCartContext.Provider value={value}>
//       {children}
//     </ShoppingCartContext.Provider>
//   );
// }

export {};
