import { MainLayout } from '@components/common/main-layout';
import { Carousel } from '@components/home/carousel';
import { Greeting } from '@components/home/greeting';

export default function Home(): JSX.Element {
  return (
    <MainLayout
      className='flex flex-col items-center gap-8'
      title='Shopping Cart - Best Online Shopping Platform'
      description='The one stop shop for all your shopping needs.'
      image='/home.png'
    >
      <Carousel />
      <Greeting />
    </MainLayout>
  );
}
