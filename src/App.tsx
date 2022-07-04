import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLocalStorage as useStore } from './hooks';
import { ShoppingCartContext } from './contexts';
import { Navbar, Cart } from './components';
import { Home, Store, About, Product } from './pages';
import { getAllProducts } from './api';
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
    if (isCartOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
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
      setCurrentCart([...currentCart, { ...product, quantity: 1 } as ICart]);
    }
  };

  const deleteProduct = (productId: number) => () => {
    setCurrentCart(currentCart.filter(({ id }) => id !== productId));
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const cartLength = currentCart.reduce(
    (acc, { quantity }) => acc + quantity,
    0
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
        deleteProduct
      }}
    >
      <Navbar cartLength={cartLength} toggleCart={toggleCart} />
      <AnimatePresence exitBeforeEnter>
        {isCartOpen && <Cart toggleCart={toggleCart} />}
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
        </Routes>
      </AnimatePresence>
    </ShoppingCartContext.Provider>
  );
}
