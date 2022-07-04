interface ButtonProps {
  label?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Button({ label, children, className, onClick }: ButtonProps) {
  return (
    <button
      className={`${className} tab flex items-center justify-center gap-4
                  rounded-lg bg-transparent py-2 px-3 text-sm font-bold
                  uppercase transition-all duration-300 hover:bg-accent
                  hover:text-white active:scale-90 active:duration-150`}
      type='button'
      onClick={onClick}
    >
      {label || children}
    </button>
  );
}
