import { Carousel, Greeting } from './components';

export function Home(): JSX.Element {
  return (
    <main className='flex flex-col items-center gap-8'>
      <Carousel />
      <Greeting />
    </main>
  );
}
