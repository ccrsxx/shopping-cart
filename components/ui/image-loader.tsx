import { useState } from 'react';
import Image from 'next/image';
import cn from 'clsx';

type ImageLoaderProps = {
  src: string;
  alt: string;
  divStyle: string;
  imageStyle?: string;
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  draggable?: boolean;
  children?: React.ReactNode;
};

export function ImageLoader({
  src,
  alt,
  divStyle,
  children,
  objectFit,
  draggable,
  imageStyle
}: ImageLoaderProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = (): void => setIsLoading(false);

  const { div, image } = isLoading
    ? {
        div: 'animate-pulse !bg-white',
        image: 'opacity-0'
      }
    : {
        div: '',
        image: 'opacity-100'
      };

  return (
    <div className={cn('relative transition-colors', div, divStyle)}>
      <Image
        className={cn('transition-opacity', image, imageStyle)}
        src={src}
        alt={alt}
        draggable={draggable}
        objectFit={objectFit}
        layout='fill'
        onLoadingComplete={handleLoad}
      />
      {children}
    </div>
  );
}
