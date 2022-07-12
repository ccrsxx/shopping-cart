import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { carouselImages } from '../../../data';
import { Button } from '../../../components';
import { MdArrowBackIos, MdArrowForwardIos } from '../../../utils';
import type { PanInfo } from 'framer-motion';

const duration = 3;

const MotionLink = motion(Link);

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const carousel = useRef<HTMLDivElement>(null!);
  const timeoutId = useRef<NodeJS.Timeout>(null!);

  const carouselControls = useAnimation();

  useEffect(() => {
    animateCarousel();

    if (currentIndex >= carouselImages.length) setCurrentIndex(0);
    else if (currentIndex < 0) setCurrentIndex(carouselImages.length - 1);

    setIndexByTimeout();
    return resetTimeout;
  }, [currentIndex]);

  const animateCarousel = () =>
    carouselControls.start({ x: `${-currentIndex * 100}%` });

  const setIndexByTimeout = () => {
    timeoutId.current = setTimeout(
      () => setCurrentIndex((prevIndex) => prevIndex + 1),
      duration * 1000
    );
  };

  const setIndexByDragging = (_unusedEvent: MouseEvent, info: PanInfo) => {
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

  const setIndex = (index: number) => () => setCurrentIndex(index);
  const flipHover = (hover?: boolean) => () => setIsHovered(!!hover);

  const nextIndex = () => setCurrentIndex((prevIndex) => prevIndex + 1);
  const backIndex = () => setCurrentIndex((prevIndex) => prevIndex - 1);
  const resetTimeout = () => clearTimeout(timeoutId.current);

  const categoryVariants = {
    initial: { opacity: 0, y: -20 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.75 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.25 } }
  };

  return (
    <div
      ref={carousel}
      className='group relative flex w-full max-w-4xl items-center justify-center overflow-hidden rounded-lg'
      onMouseEnter={flipHover(true)}
      onMouseLeave={flipHover()}
    >
      <Button
        className='absolute left-2 z-10 translate-x-10 !rounded-full !p-2 text-xl text-white/80 opacity-0
                   duration-300 hover:!bg-black/40 group-hover:translate-x-0 group-hover:opacity-100'
        tabIndex={isHovered ? undefined : -1}
        onClick={backIndex}
      >
        <MdArrowBackIos className='translate-x-0.5' />
      </Button>
      <Button
        Icon={MdArrowForwardIos}
        className='absolute right-2 z-10 -translate-x-10 !rounded-full !p-2 text-xl text-white/80 opacity-0
                   duration-300 hover:!bg-black/40 group-hover:translate-x-0 group-hover:opacity-100'
        tabIndex={isHovered ? undefined : -1}
        onClick={nextIndex}
      />
      <motion.div
        className='flex cursor-grab active:cursor-grabbing'
        initial={{ x: 0 }}
        animate={carouselControls}
        transition={{ duration: 0.6 }}
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
              className='h-full w-full object-cover [-webkit-user-drag:none]'
              src={src}
              alt={alt}
            />
            <AnimatePresence exitBeforeEnter>
              {index === currentIndex && (
                <MotionLink
                  to={`/store?category=${alt}`}
                  className='tab absolute bottom-10 w-fit rounded-lg bg-black/40 px-1 
                             text-lg capitalize text-white/90 transition-colors duration-300
                             hover:bg-accent hover:text-white sm:text-xl'
                  variants={categoryVariants}
                  initial='initial'
                  animate='enter'
                  exit='exit'
                >
                  {alt}
                </MotionLink>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>
      <div className='absolute bottom-3 flex gap-2'>
        {carouselImages.map((_, index) => (
          <motion.button
            className='tab h-4 w-4 cursor-pointer rounded-full bg-black/40 
                       transition hover:bg-black/60 focus:ring-offset-black/60'
            animate={{ scale: +(currentIndex !== index) }}
            transition={{ duration: 0.25 }}
            onClick={setIndex(index)}
            key={index}
          />
        ))}
        <motion.button
          className='tab absolute h-4 w-4 cursor-pointer rounded-full bg-accent/80 transition-none'
          animate={{ x: currentIndex * 24 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}
