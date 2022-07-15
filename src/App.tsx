import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ShoppingCartProvider } from './context';
import { Navbar, Footer } from './components';
import { Home, Store, Product, Contact, NotFound } from './pages';

export function App(): JSX.Element {
  const location = useLocation();

  return (
    <ShoppingCartProvider>
      <Navbar />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<Home />} />
          <Route path='/store' element={<Store />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </ShoppingCartProvider>
  );
}
