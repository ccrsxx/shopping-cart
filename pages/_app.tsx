import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { ShoppingCartProvider } from '@lib/context/shopping-cart';
import { AppHead } from '@components/common/app-head';
import { AppLayout } from '@components/common/app-layout';
import '@assets/main.scss';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const { pathname } = useRouter();

  return (
    <>
      <AppHead />
      <ShoppingCartProvider>
        <AppLayout>
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={pathname} />
          </AnimatePresence>
        </AppLayout>
      </ShoppingCartProvider>
    </>
  );
}
