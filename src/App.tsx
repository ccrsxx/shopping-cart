import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { StoreContext } from './contexts';
import { Navbar } from './components';
import { Home, Store, About, Product } from './pages';
import { getAllProducts, getProductById } from './api';
import type { IProduct } from './types/IProduct';

export function App() {
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
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
        setIsError(true);
        return;
      }

      setIsFetching(false);
    };
    fetchAllProducts();
  }, []);

  console.log(JSON.stringify(allProducts));

  return (
    <>
      <Navbar />
      <StoreContext.Provider value={{ allProducts, parameter }}>
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Home />} />
            <Route
              path='store'
              element={<Store isFetching={isFetching} isError={isError} />}
            />
            <Route path='product'>
              <Route path=':productId' element={<Product />} />
            </Route>
            <Route path='about' element={<About />} />
          </Routes>
        </AnimatePresence>
      </StoreContext.Provider>
    </>
  );
}
