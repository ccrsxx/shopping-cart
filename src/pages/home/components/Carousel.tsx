import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { carouselImages } from '../../../data';
import { Button } from '../../../components';
import { setTransition } from '../../../utils';
import { MdArrowBackIos, MdArrowForwardIos } from '../../../assets';
import type { PanInfo } from 'framer-motion';

const MotionLink = motion(Link);

export function Carousel(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const carousel = useRef<HTMLDivElement>(null!);
  const timeoutId = useRef<NodeJS.Timeout>(null!);

  const controls = useAnimation();

  useEffect(() => {
    animateCarousel();

    if (currentIndex >= carouselImages.length) setCurrentIndex(0);
    else if (currentIndex < 0) setCurrentIndex(carouselImages.length - 1);

    setIndexByTimeout();
    return resetTimeout;
  }, [currentIndex]);

  const animateCarousel = (): void => {
    controls.start({ x: `${-currentIndex * 100}%` });
  };

  const setIndexByTimeout = (): void => {
    timeoutId.current = setTimeout(
      () => setCurrentIndex(currentIndex + 1),
      5 * 1000
    );
  };

  const setIndexByDragging = (
    _unusedEvent: MouseEvent,
    info: PanInfo
  ): void => {
    const {
      offset: { x }
    } = info;

    const carouselWidth = carousel.current.clientWidth ?? 1;
    const initialOffset = currentIndex * carouselWidth;

    const newIndex = Math.round((initialOffset + x * -2) / carouselWidth);

    if (newIndex !== currentIndex) setCurrentIndex(newIndex);
    else {
      animateCarousel();
      setIndexByTimeout();
    }
  };

  const setIndex = (index: number) => (): void => setCurrentIndex(index);
  const flipHover = (hover?: boolean) => (): void => setIsHovered(!!hover);

  const nextIndex = (): void => setCurrentIndex(currentIndex + 1);
  const backIndex = (): void => setCurrentIndex(currentIndex - 1);
  const resetTimeout = (): void => clearTimeout(timeoutId.current);

  return (
    <motion.div
      ref={carousel}
      className='group relative flex w-full max-w-4xl items-center justify-center overflow-hidden rounded-lg'
      onMouseEnter={flipHover(true)}
      onMouseLeave={flipHover()}
      {...setTransition({ direction: 'left' })}
    >
      <Button
        className='absolute left-2 z-10 translate-x-10 !rounded-full !p-2 text-xl text-primary/80 opacity-0
                   duration-300 hover:!bg-black/40 group-hover:translate-x-0 group-hover:opacity-100'
        tabIndex={isHovered ? undefined : -1}
        onClick={backIndex}
      >
        <MdArrowBackIos className='translate-x-[3px]' />
      </Button>
      <motion.div
        className='flex w-full cursor-grab active:cursor-grabbing'
        initial={{ x: 0 }}
        animate={controls}
        transition={{ duration: 0.5 }}
        drag='x'
        onDragStart={resetTimeout}
        onDragEnd={setIndexByDragging}
      >
        {carouselImages.map(({ src, alt }, index) => (
          <div
            className='flex h-60 min-w-full justify-center sm:h-80'
            key={index}
          >
            <img
              className='h-full w-full object-cover'
              src={src}
              alt={alt}
              draggable={false}
            />
            <AnimatePresence exitBeforeEnter>
              {index === currentIndex && (
                <MotionLink
                  className='absolute bottom-10 w-max'
                  to={`/store?category=${alt}`}
                  tabIndex={-1}
                  {...setTransition({
                    typeIn: 'tween',
                    typeOut: 'tween',
                    distance: 20,
                    direction: 'top',
                    durationIn: 0.75,
                    durationOut: 0.25
                  })}
                >
                  <Button
                    className='bg-black/40 !p-0 !px-1 text-lg font-normal capitalize
                               text-primary/90 hover:bg-accent hover:text-primary sm:text-xl'
                    label={alt}
                  />
                </MotionLink>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>
      <Button
        Icon={MdArrowForwardIos}
        className='absolute right-2 z-10 -translate-x-10 !rounded-full !p-2 text-xl text-primary/80 opacity-0
                   duration-300 hover:!bg-black/40 group-hover:translate-x-0 group-hover:opacity-100'
        tabIndex={isHovered ? undefined : -1}
        onClick={nextIndex}
      />
      <div className='[&>*]:tab absolute bottom-3 flex gap-2 [&>*]:h-4 [&>*]:w-4 [&>*]:rounded-full'>
        {carouselImages.map((_, index) => (
          <motion.button
            className='bg-black/40 transition hover:bg-black/60 focus:ring-offset-black/60'
            animate={{ scale: +(currentIndex !== index) }}
            transition={{ duration: 0.25 }}
            onClick={setIndex(index)}
            key={index}
          />
        ))}
        <motion.button
          className='absolute cursor-not-allowed bg-accent/80 !transition-none'
          animate={{ x: currentIndex * 24 }}
          transition={{ duration: 0.5 }}
          disabled
        />
      </div>
    </motion.div>
  );
}
