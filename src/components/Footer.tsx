import { RiGithubFill, MdApi } from '../assets';

export function Footer(): JSX.Element {
  return (
    <footer
      className='inner:tab flex justify-between text-lg font-medium
                 text-secondary inner:flex inner:items-center inner:gap-2
                 inner:transition-colors hover:inner:text-primary'
    >
      <a href='https://github.com/ccrsxx' target='_blank' rel='noreferrer'>
        <RiGithubFill /> ccrsxx
      </a>
      <a href='https://fakestoreapi.com' target='_blank' rel='noreferrer'>
        <MdApi />
        Fake Store API
      </a>
    </footer>
  );
}
