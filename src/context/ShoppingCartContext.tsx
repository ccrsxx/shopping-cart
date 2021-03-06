import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useContext,
  createContext
} from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage as useStore } from '../hooks';
import { getAllProducts } from '../services';
import { formatPathname } from '../utils';
import type { IProduct, ICart, IShoppingCartContext } from '../types';

const ShoppingCartContext = createContext<IShoppingCartContext | null>(null);

export function useShoppingCart(): IShoppingCartContext {
  const context = useContext(ShoppingCartContext);

  if (!context)
    throw new Error(
      'useShoppingCart must be used within a ShoppingCartContext'
    );

  return context;
}

interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

export function ShoppingCartProvider({
  children
}: ShoppingCartProviderProps): JSX.Element {
  const [allProducts, setAllProducts] = useStore<IProduct[]>('allProducts', []);
  const [currentCart, setCurrentCart] = useStore<ICart[]>('currentCart', []);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  const isFirstRender = useRef<boolean | null>(null);

  const [{ pathname }, [parameter], navigate] = [
    useLocation(),
    useSearchParams(),
    useNavigate()
  ];

  useEffect(() => {
    if (!allProducts.length) fetchAllProducts()();

    isFirstRender.current = true;
  }, []);

  useEffect(() => {
    if (isFirstRender.current) isFirstRender.current = false;
    else setTimeout(() => window.scrollTo(0, 0), 300);

    document.title = `Shopping Cart | ${formatPathname(pathname)}`;
  }, [pathname]);

  const fetchAllProducts = (retry?: boolean) => async (): Promise<void> => {
    if (retry) setIsError(false);

    setIsFetching(true);

    try {
      const products = await getAllProducts();
      setAllProducts(products);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setIsError(true);
    }

    setIsFetching(false);
  };

  const addProduct = (productId: number) => (): void => {
    const product = allProducts.find(({ id }) => id === productId);
    setCurrentCart([{ ...product, quantity: 1 } as ICart, ...currentCart]);
  };

  const deleteProduct = (productId: number) => (): void =>
    setCurrentCart(currentCart.filter(({ id }) => id !== productId));

  const handleProductQuantity =
    (productId: number, type?: 'increment' | 'decrement') =>
    (e?: React.ChangeEvent<HTMLInputElement>): void => {
      let inputValue = !type ? parseInt(e!.target.value, 10) : null;

      if (!type && !inputValue) inputValue = 1;
      else if (inputValue && inputValue >= 10_000) inputValue = 10_000;

      setCurrentCart(
        currentCart.map((cartProduct) =>
          cartProduct.id === productId
            ? {
                ...cartProduct,
                quantity:
                  inputValue ??
                  (type === 'increment'
                    ? cartProduct.quantity + 1
                    : cartProduct.quantity - 1)
              }
            : cartProduct
        )
      );
    };

  const clearCart = (): void => setCurrentCart([]);

  const [cartProducts, totalPrice] = useMemo(
    () =>
      currentCart.reduce(
        ([products, total], { price, quantity }) => [
          products + quantity,
          total + price * quantity
        ],
        [0, 0]
      ),
    [currentCart]
  );

  return (
    <ShoppingCartContext.Provider
      value={{
        cartProducts,
        allProducts,
        currentCart,
        totalPrice,
        isFetching,
        parameter,
        pathname,
        isError,
        navigate,
        clearCart,
        addProduct,
        deleteProduct,
        fetchAllProducts,
        handleProductQuantity
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
