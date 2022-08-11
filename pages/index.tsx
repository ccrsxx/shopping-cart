import Head from 'next/head';
import { Carousel } from '@components/home/carousel';
import { Greeting } from '@components/home/greeting';

export default function Home(): JSX.Element {
  return (
    <main className='flex flex-col items-center gap-8'>
      <Head>
        <title>Shopping Cart | Home</title>
      </Head>
      <Carousel />
      <Greeting />
    </main>
  );
}
