interface SetTransitionProps {
  delay?: boolean;
  layout?: boolean;
  direction?: 'left' | 'right' | 'top' | 'bottom' | 'none';
  distance?: 'full' | number;
  delayIn?: number;
  delayOut?: number;
  durationIn?: number;
  durationOut?: number;
}

export function setTransition({
  layout = false,
  direction = 'none',
  distance = 50,
  delayIn,
  delayOut,
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

  const rawDirection = directions[direction];

  const directionProp =
    direction !== 'none' && distance === 'full'
      ? Object.keys(rawDirection).reduce(
          (acc, key) => ({
            ...acc,
            [key]: '100%'
          }),
          {}
        )
      : rawDirection;

  const transitionIn = {
    type: 'spring',
    delay: delayIn,
    duration: durationIn
  };

  const transitionOut = {
    type: 'normal',
    delay: delayOut,
    duration: durationOut
  };

  const variants = {
    initial: {
      opacity: 0,
      ...directionProp
    },
    enter: {
      opacity: 1,
      transition: transitionIn,
      ...directions.none
    },
    exit: {
      opacity: 0,
      transition: transitionOut,
      ...directionProp
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
