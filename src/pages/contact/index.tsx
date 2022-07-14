import { Header, Contacts } from './components';

export function Contact(): JSX.Element {
  return (
    <main className='flex flex-col items-center gap-6 md:gap-8'>
      <Header />
      <Contacts />
    </main>
  );
}
