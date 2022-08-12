import { MainLayout } from '@components/common/main-layout';
import { ContactHeader } from '@components/contact/contact-header';
import { Contacts } from '@components/contact/contacts';

export default function Contact(): JSX.Element {
  return (
    <MainLayout
      className='flex flex-col items-center gap-6 md:gap-8'
      title='Shopping Cart | Contact'
      description='We are here to help you if you have problem.'
      image='/contact.png'
      url='/contact'
    >
      <ContactHeader />
      <Contacts />
    </MainLayout>
  );
}
