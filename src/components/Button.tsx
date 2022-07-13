import type { IconType } from 'react-icons';

interface ButtonProps {
  Icon?: IconType;
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  label?: string;
  flipped?: boolean;
  disabled?: boolean;
  tabIndex?: number;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

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
  onClick
}: ButtonProps) {
  return (
    <button
      id={id}
      className={`${className} tab flex select-none items-center justify-center gap-2 rounded-lg
                   bg-transparent py-2 px-3 text-sm font-medium transition-all duration-300
                  hover:text-primary active:scale-90 active:duration-150 enabled:hover:bg-accent
                   disabled:cursor-not-allowed disabled:brightness-50`}
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
