import { RiGithubFill, MdApi } from '../utils';

export function Footer() {
  return (
    <footer
      className='[&>*]:tab flex justify-between text-lg font-medium
                 text-secondary [&>*]:flex [&>*]:items-center [&>*]:gap-2
                 [&>*]:transition-colors hover:[&>*]:text-primary'
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
