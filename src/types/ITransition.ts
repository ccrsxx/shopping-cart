import type { Variants } from 'framer-motion';

export interface ITransition {
  layout: boolean;
  variants: Variants;
  initial: 'initial';
  animate: 'enter';
  exit: 'exit';
}
