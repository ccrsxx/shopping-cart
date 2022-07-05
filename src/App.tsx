import { useState, useEffect, useMemo } from 'react';
import { useLocation, useSearchParams, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLocalStorage as useStore } from './hooks';
import { ShoppingCartContext } from './contexts';
import { Navbar, Cart } from './components';
import { Home, Store, Product, About, NotFound } from './pages';
import { getAllProducts } from './api';
import { formatPathname } from './utils';
import type { IProduct, ICart } from './types';

export function App() {
  const [allProducts, setAllProducts] = useStore<IProduct[]>('allProducts', []);
  const [currentCart, setCurrentCart] = useStore<ICart[]>('currentCart', []);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  const [parameter, setParameter] = useSearchParams();
  const location = useLocation();

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
    if (isCartOpen) document.documentElement.style.overflow = 'hidden';
    else document.documentElement.style.overflow = '';
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
                  inputValue ||
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
    () => [
      currentCart.reduce((acc, { quantity }) => acc + quantity, 0),
      currentCart.reduce(
        (acc, { price, quantity }) => acc + price * quantity,
        0
      )
    ],
    [currentCart]
  );

  return (
    <ShoppingCartContext.Provider
      value={{
        allProducts,
        currentCart,
        isCartOpen,
        parameter,
        location,
        addProduct,
        deleteProduct,
        handleProductQuantity
      }}
    >
      <Navbar cartProducts={cartProducts} toggleCart={toggleCart} />
      <AnimatePresence exitBeforeEnter>
        {isCartOpen && (
          <Cart
            totalPrice={totalPrice}
            clearCart={clearCart}
            toggleCart={toggleCart}
          />
        )}
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Home />} />
          <Route
            path='store'
            element={<Store isFetching={isFetching} isError={isError} />}
          />
          <Route
            path='product/:productId'
            element={<Product isFetching={isFetching} isError={isError} />}
          />
          <Route path='about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </ShoppingCartContext.Provider>
  );
}
