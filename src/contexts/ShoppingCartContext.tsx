import { useState, useEffect, useMemo, useContext, createContext } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage as useStore } from '../hooks';
import { getAllProducts } from '../api';
import { formatPathname } from '../utils';
import type { IProduct, ICart, IShoppingCartContext } from '../types';

const ShoppingCartContext = createContext<IShoppingCartContext | null>(null);

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);

  if (!context) {
    throw new Error(
      'useShoppingCart must be used within a ShoppingCartContext'
    );
  }

  return context;
}

interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [allProducts, setAllProducts] = useStore<IProduct[]>('allProducts', []);
  const [currentCart, setCurrentCart] = useStore<ICart[]>('currentCart', []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  const [location, navigate] = [useLocation(), useNavigate()];
  const [parameter] = useSearchParams();

  useEffect(() => {
    const fetchAllProducts = async () => {
      setIsFetching(true);

      try {
        const products = await getAllProducts();
        setAllProducts(products);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        setIsFetching(false);
        setIsError(true);
        return;
      }

      setIsFetching(false);
    };

    if (!allProducts.length) fetchAllProducts();
  }, []);

  useEffect(() => {
    document.title = `Shopping Cart | ${formatPathname(location.pathname)}`;
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : '';
  }, [isCartOpen]);

  const addProduct = (productId: number) => () => {
    const inCart = currentCart.find(({ id }) => id === productId);

    if (inCart) {
      setCurrentCart(
        currentCart.map((cartProduct) =>
          cartProduct.id === productId
            ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
            : cartProduct
        )
      );
    } else {
      const product = allProducts.find(({ id }) => id === productId);
      setCurrentCart([{ ...product, quantity: 1 } as ICart, ...currentCart]);
    }
  };

  const deleteProduct = (productId: number) => () => {
    setCurrentCart(currentCart.filter(({ id }) => id !== productId));
  };

  const handleProductQuantity =
    (productId: number, type?: 'increment' | 'decrement') =>
    (e?: React.ChangeEvent<HTMLInputElement>) => {
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

  const clearCart = () => setCurrentCart([]);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

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
        isCartOpen,
        isFetching,
        parameter,
        location,
        isError,
        navigate,
        clearCart,
        toggleCart,
        addProduct,
        deleteProduct,
        handleProductQuantity
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
