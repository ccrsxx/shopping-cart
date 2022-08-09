import Image from 'next/image';
import cn from 'clsx';
import { getBlurDataUrl } from '@lib/colors';

type ImageLoaderProps = {
  src: string;
  alt: string;
  divStyle: string;
  imageStyle: string;
  draggable?: boolean;
  children?: React.ReactNode;
};

export function ImageLoader({
  src,
  alt,
  divStyle,
  children,
  draggable,
  imageStyle
}: ImageLoaderProps): JSX.Element {
  return (
    <div className={cn('relative transition-colors', divStyle)}>
      <Image
        className={cn('transition-opacity', imageStyle)}
        src={src}
        alt={alt}
        draggable={draggable}
        layout='fill'
        placeholder='blur'
        blurDataURL={getBlurDataUrl()}
      />
      {children}
    </div>
  );
}
