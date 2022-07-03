interface SetTransitionProps {
  layout?: boolean;
  direction?: 'left' | 'right' | 'top' | 'bottom' | 'none';
  distance?: number;
  durationIn?: number;
  durationOut?: number;
}

export function setTransition({
  layout = false,
  direction = 'none',
  distance = 50,
  durationIn,
  durationOut
}: SetTransitionProps) {
  const directions = {
    left: { x: -distance },
    right: { x: distance },
    top: { y: -distance },
    bottom: { y: distance },
    none: { x: 0, y: 0 }
  };

  const transitionIn = {
    type: 'spring',
    duration: durationIn
  };

  const transitionOut = {
    type: 'spring',
    duration: durationOut
  };

  const variants = {
    initial: {
      opacity: 0,
      ...directions[direction]
    },
    enter: {
      opacity: 1,
      ...directions.none,
      transition: transitionIn
    },
    exit: {
      opacity: 0,
      ...directions[direction],
      transition: transitionOut
    }
  };

  return {
    layout,
    variants,
    initial: 'initial',
    animate: 'enter',
    exit: 'exit'
  };
}
