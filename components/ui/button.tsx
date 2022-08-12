import cn from 'clsx';
import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';

type ButtonProps = {
  Icon?: IconType;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  label?: string;
  flipped?: boolean;
  disabled?: boolean;
  tabIndex?: number;
  children?: ReactNode;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
};

export function Button({
  Icon,
  id,
  type,
  label,
  flipped,
  disabled,
  tabIndex,
  children,
  className,
  ariaLabel,
  onClick
}: ButtonProps): JSX.Element {
  return (
    <button
      id={id}
      className={cn(
        `tab flex select-none items-center justify-center gap-2 rounded-lg bg-transparent py-2 px-3 
         font-medium transition duration-300 hover:text-primary active:scale-90 active:duration-150 
         enabled:hover:bg-accent disabled:cursor-not-allowed disabled:brightness-50`,
        className
      )}
      aria-label={ariaLabel}
      type={type ?? 'button'}
      onClick={onClick}
      tabIndex={tabIndex}
      disabled={disabled}
    >
      {Icon && !flipped && <Icon />}
      {label}
      {Icon && flipped && <Icon />}
      {children}
    </button>
  );
}
