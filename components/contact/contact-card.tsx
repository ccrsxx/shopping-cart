import Link from 'next/link';
import { Button } from '@components/ui/button';
import type { IconType } from 'react-icons';

type ContactCardProps = {
  Icon: IconType;
  title: string;
  subtitle: string;
  navigateTo: string;
  buttonTitle: string;
};

export function ContactCard({
  Icon,
  title,
  subtitle,
  navigateTo,
  buttonTitle
}: ContactCardProps): JSX.Element {
  return (
    <div
      className='flex w-full max-w-md flex-col items-center justify-between
                 gap-8 rounded-lg border border-border-primary p-8'
    >
      <i className='rounded-full border-2 p-2'>
        <Icon size={50} />
      </i>
      <div className='flex flex-col gap-4 text-center'>
        <h2 className='text-2xl font-medium'>{title}</h2>
        <p className='font-light text-secondary'>{subtitle}</p>
      </div>
      <Link href={navigateTo}>
        <a className='w-full' tabIndex={-1}>
          <Button
            className='w-full border border-border-secondary text-sm font-medium normal-case'
            label={buttonTitle}
          />
        </a>
      </Link>
    </div>
  );
}
