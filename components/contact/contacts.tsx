import { motion } from 'framer-motion';
import { setTransition } from '@lib/transition';
import { RiCustomerServiceFill, RiRobotFill } from '@assets/icons';
import { ContactCard } from './contact-card';

const contactsData = [
  {
    Icon: RiCustomerServiceFill,
    title: 'Talk to our customer service',
    subtitle:
      "We'll help you answer your question and try to solve your problem.",
    navigateTo: '/live-chat',
    buttonTitle: 'Live Chat'
  },
  {
    Icon: RiRobotFill,
    title: 'Product and account support',
    subtitle:
      "Our help center is fresh and always open for public. If you can't find the answer you're looking for, we're here to lend a hand.",
    navigateTo: '/support',
    buttonTitle: 'Go to help center'
  }
];

export function Contacts(): JSX.Element {
  return (
    <motion.div
      className='grid gap-6 md:grid-cols-2 md:gap-8'
      {...setTransition({ direction: 'bottom' })}
    >
      {contactsData.map((contactData) => (
        <ContactCard key={contactData.navigateTo} {...contactData} />
      ))}
    </motion.div>
  );
}
