import { Link } from 'react-router-dom';
import { Button } from '../../../components';
import type { IconType } from 'react-icons';

interface ContactCardProps {
  Icon: IconType;
  title: string;
  subtitle: string;
  navigateTo: string;
  buttonTitle: string;
}

export function ContactCard({
  Icon,
  title,
  subtitle,
  navigateTo,
  buttonTitle
}: ContactCardProps) {
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
      <Link className='w-full' to={navigateTo} tabIndex={-1}>
        <Button
          className='w-full border border-border-secondary font-medium normal-case'
          label={buttonTitle}
        />
      </Link>
    </div>
  );
}
