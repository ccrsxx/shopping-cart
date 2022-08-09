import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { Layout } from '@components/common/layout';
import { ShoppingCartProvider } from '@lib/context/useShoppingCart';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { pathname } = useRouter();

  return (
    <ShoppingCartProvider>
      <Layout>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={pathname} />
        </AnimatePresence>
      </Layout>
    </ShoppingCartProvider>
  );
}
