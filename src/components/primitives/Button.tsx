import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'text'

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary:
    'bg-ink text-bg hover:tracking-[0.28em] hover:bg-[#2c2a26] focus-visible:ring-2 focus-visible:ring-(--color-focus-ring)',
  secondary:
    'border border-ink text-ink hover:bg-ink hover:text-bg focus-visible:ring-2 focus-visible:ring-(--color-focus-ring)',
  text: 'underline underline-offset-4 hover:no-underline text-ink',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
}

export function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  const base =
    variant === 'text'
      ? 'inline-flex items-center font-body text-sm transition-colors duration-200'
      : 'inline-flex items-center justify-center px-11 py-4.5 font-body uppercase text-xs font-medium tracking-[0.18em] rounded-[2px] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed'

  return (
    <button className={`${base} ${VARIANT_CLASS[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}
