import type { HTMLAttributes, ReactNode } from 'react'

type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl'
type TextTone = 'ink' | 'soft' | 'muted'

const SIZE_CLASS: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

const TONE_CLASS: Record<TextTone, string> = {
  ink: 'text-ink',
  soft: 'text-soft',
  muted: 'text-muted',
}

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: TextSize
  tone?: TextTone
  children: ReactNode
}

export function Text({
  size = 'base',
  tone = 'ink',
  className = '',
  children,
  ...rest
}: TextProps) {
  return (
    <p
      className={`font-body leading-relaxed ${SIZE_CLASS[size]} ${TONE_CLASS[tone]} ${className}`}
      {...rest}
    >
      {children}
    </p>
  )
}
