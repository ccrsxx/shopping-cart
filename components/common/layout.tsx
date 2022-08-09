import { Footer } from './footer';
import { Navbar } from './navbar';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
