import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ShoppingCartProvider } from './contexts';
import { Navbar, Cart, Footer } from './components';
import { Home, Store, Product, About, NotFound } from './pages';

export function App() {
  const location = useLocation();

  return (
    <ShoppingCartProvider>
      <Navbar />
      <Cart />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Home />} />
          <Route path='/store' element={<Store />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </ShoppingCartProvider>
  );
}
