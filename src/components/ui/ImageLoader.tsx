import { useState } from 'react';

interface ImageLoaderProps {
  src: string;
  alt: string;
  divStyle: string;
  imageStyle: string;
  draggable?: boolean;
  children?: React.ReactNode;
}

export function ImageLoader({
  src,
  alt,
  divStyle,
  children,
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
    <div className={`${div} ${divStyle} transition-colors`}>
      <img
        className={`${image} ${imageStyle} transition-opacity`}
        src={src}
        alt={alt}
        onLoad={handleLoad}
        draggable={draggable}
        loading='lazy'
      />
      {children}
    </div>
  );
}
