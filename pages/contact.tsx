import { ContactHeader } from '@components/contact/contact-header';
import { Contacts } from '@components/contact/contacts';

export default function Contact(): JSX.Element {
  return (
    <main className='flex flex-col items-center gap-6 md:gap-8'>
      <ContactHeader />
      <Contacts />
    </main>
  );
}
