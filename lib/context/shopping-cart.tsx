import { useState, useEffect, useMemo, useContext, createContext } from 'react';
import { useLocalStorage as useStore } from '@lib/hooks/useLocalStorage';
import { getAllProducts } from '@lib/api/products';
import type { MouseEvent, ChangeEvent } from 'react';
import type { Product, Products } from '@lib/api/products';

export type Cart = Product & { quantity: number };
export type Carts = Cart[];

export type ShoppingCartContext = {
  cartProducts: number;
  allProducts: Products;
  currentCart: Carts;
  totalPrice: number;
  isFetching: boolean;
  isError: boolean;
  clearCart: () => void;
  addProduct: (productId: number) => () => void;
  deleteProduct: (productId: number) => () => void;
  fetchAllProducts: (e?: MouseEvent<HTMLButtonElement>) => void;
  handleProductQuantity: (
    productId: number,
    type?: 'increment' | 'decrement'
  ) => (e?: ChangeEvent<HTMLInputElement>) => void;
};

const ShoppingCartContext = createContext<ShoppingCartContext | null>(null);

export function useShoppingCart(): ShoppingCartContext {
  const context = useContext(ShoppingCartContext);

  if (!context)
    throw new Error(
      'useShoppingCart must be used within a ShoppingCartContext'
    );

  return context;
}

type ShoppingCartProviderProps = {
  children: React.ReactNode;
};

export function ShoppingCartProvider({
  children
}: ShoppingCartProviderProps): JSX.Element {
  const [currentCart, setCurrentCart] = useStore<Carts>('currentCart', []);
  const [allProducts, setAllProducts] = useState<Products>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    void fetchAllProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAllProducts = async (
    e?: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    if (e) setIsError(false);

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
    setCurrentCart([{ ...product, quantity: 1 } as Cart, ...currentCart]);
  };

  const deleteProduct = (productId: number) => (): void =>
    setCurrentCart(currentCart.filter(({ id }) => id !== productId));

  const handleProductQuantity =
    (productId: number, type?: 'increment' | 'decrement') =>
    (e?: ChangeEvent<HTMLInputElement>): void => {
      let inputValue = !type ? parseInt(e?.target.value as string, 10) : null;

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

  const value = {
    cartProducts,
    allProducts,
    currentCart,
    totalPrice,
    isFetching,
    isError,
    clearCart,
    addProduct,
    deleteProduct,
    fetchAllProducts,
    handleProductQuantity
  };

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
