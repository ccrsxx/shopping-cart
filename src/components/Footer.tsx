import { RiGithubFill } from '../utils';

export function Footer() {
  return (
    <footer className='flex w-full justify-between text-lg font-medium'>
      <a
        className='flex items-center gap-2 text-grayish transition-colors hover:text-white'
        href='https://github.com/ccrsxx'
        target='_blank'
        rel='noreferrer'
      >
        <RiGithubFill /> ccrsxx
      </a>
      <p className='text-grayish'>Fake Store API</p>
    </footer>
  );
}
