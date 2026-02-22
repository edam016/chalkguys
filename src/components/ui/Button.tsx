import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const variants = {
  primary: 'bg-accent text-ink hover:bg-accent-hover border border-accent hover:border-accent-hover',
  secondary: 'bg-surface-light text-chalk hover:bg-brand border border-white/10',
  outline: 'border border-accent/50 text-chalk hover:bg-accent/10 hover:border-accent/70',
};

const sizes = {
  sm: 'px-4 py-1.5 text-sm tracking-wider',
  md: 'px-6 py-2.5 text-sm tracking-wider',
  lg: 'px-8 py-3.5 text-sm tracking-widest uppercase',
};

export function Button({ variant = 'primary', size = 'md', className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center font-medium transition-colors duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
