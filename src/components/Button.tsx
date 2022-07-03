interface ButtonProps {
  label?: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Button({ label, children, className, onClick }: ButtonProps) {
  return (
    <button
      className={`${className} flex w-full max-w-[125px] items-center justify-center gap-4
                  rounded-lg bg-transparent py-2 px-3 text-sm font-bold
                  uppercase transition-all duration-300 hover:scale-110 hover:bg-accent
                  hover:text-white focus:ring-offset-dark focus-visible:scale-110
                  focus-visible:bg-accent focus-visible:text-white focus-visible:outline-none focus-visible:ring
                  focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-90 active:duration-150`}
      type='button'
      onClick={onClick}
    >
      {label || children}
    </button>
  );
}
