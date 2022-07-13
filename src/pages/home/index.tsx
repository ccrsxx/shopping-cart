import { Carousel, Greeting } from './components';

export function Home() {
  return (
    <main className='flex flex-col items-center gap-8'>
      <Carousel />
      <Greeting />
    </main>
  );
}
