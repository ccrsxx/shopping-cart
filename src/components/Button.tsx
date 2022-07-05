import type { IconType } from 'react-icons';

interface ButtonProps {
  Icon?: IconType;
  label?: string;
  flipped?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Button({
  Icon,
  label,
  flipped,
  disabled,
  children,
  className,
  onClick
}: ButtonProps) {
  return (
    <button
      className={`${className} tab flex items-center justify-center gap-2
                  rounded-lg bg-transparent py-2 px-3 text-sm font-bold
                  uppercase transition-all duration-300 hover:text-white
                  active:scale-90 active:duration-150 enabled:hover:bg-accent
                  disabled:cursor-not-allowed disabled:brightness-50`}
      type='button'
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && !flipped && <Icon />}
      {label}
      {Icon && flipped && <Icon />}
      {children}
    </button>
  );
}
