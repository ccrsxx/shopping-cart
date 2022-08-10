import { setTransition } from '@lib/transition';

describe('test setTransition', () => {
  it('returns correct transition', () => {
    const expectedResult = {
      layout: false,
      variants: {
        initial: {
          opacity: 0,
          x: -50
        },
        enter: {
          opacity: 1,
          transition: {
            type: 'spring',
            delay: undefined,
            duration: 0.5
          },
          x: 0,
          y: 0
        },
        exit: {
          opacity: 0,
          transition: {
            type: 'tween',
            delay: undefined,
            duration: undefined
          },
          x: -50
        }
      },
      initial: 'initial',
      animate: 'enter',
      exit: 'exit'
    };

    expect(setTransition({ direction: 'left', durationIn: 0.5 })).toEqual(
      expectedResult
    );
  });

  it('returns correct transition when direction is "full"', () => {
    const expectedResult = {
      layout: false,
      variants: {
        initial: {
          opacity: 0,
          x: '100%'
        },
        enter: {
          opacity: 1,
          transition: {
            type: 'spring',
            delay: undefined,
            duration: undefined
          },
          x: 0,
          y: 0
        },
        exit: {
          opacity: 0,
          transition: {
            type: 'tween',
            delay: undefined,
            duration: undefined
          },
          x: '100%'
        }
      },
      initial: 'initial',
      animate: 'enter',
      exit: 'exit'
    };

    expect(setTransition({ direction: 'left', distance: 'full' })).toEqual(
      expectedResult
    );
  });

  it('returns correct transition when all arguments are passed in', () => {
    const expectedResult = {
      layout: true,
      variants: {
        initial: {
          opacity: 0,
          y: -100
        },
        enter: {
          opacity: 1,
          transition: {
            type: 'inertia',
            delay: 0.1,
            duration: 0.5
          },
          x: 0,
          y: 0
        },
        exit: {
          opacity: 0,
          transition: {
            type: 'spring',
            delay: 0.2,
            duration: 1
          },
          y: -100
        }
      },
      initial: 'initial',
      animate: 'enter',
      exit: 'exit'
    };

    expect(
      setTransition({
        layout: true,
        direction: 'top',
        distance: 100,
        typeIn: 'inertia',
        typeOut: 'spring',
        delayIn: 0.1,
        delayOut: 0.2,
        durationIn: 0.5,
        durationOut: 1
      })
    ).toEqual(expectedResult);
  });
});
