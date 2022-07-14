import { motion } from 'framer-motion';
import { setTransition, RiCustomerServiceFill, RiRobotFill } from '../../utils';
import { ContactCard } from './components';

export function Contact(): JSX.Element {
  return (
    <main className='flex flex-col items-center gap-6 md:gap-8'>
      <motion.h1
        className='text-4xl font-bold'
        {...setTransition({ direction: 'right' })}
      >
        Contact us
      </motion.h1>
      <motion.div
        className='grid gap-6 md:grid-cols-2 md:gap-8'
        {...setTransition({ direction: 'bottom' })}
      >
        <ContactCard
          Icon={RiCustomerServiceFill}
          title='Talk to our customer service'
          subtitle="We'll help you answer your question and try to solve your problem."
          navigateTo='/live-chat'
          buttonTitle='Live Chat'
        />
        <ContactCard
          Icon={RiRobotFill}
          title='Product and account support'
          subtitle="Our help center is fresh and always open for public. If you can't find the answer you're looking for, we're here to lend a hand."
          navigateTo='/support'
          buttonTitle='Go to help center'
        />
      </motion.div>
    </main>
  );
}
