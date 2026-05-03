import type { HTMLAttributes, ReactNode } from 'react'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
type HeadingSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'display'

const SIZE_CLASS: Record<HeadingSize, string> = {
  sm: 'text-2xl',
  md: 'text-3xl',
  lg: 'text-4xl',
  xl: 'text-5xl',
  '2xl': 'text-6xl',
  display: 'text-(length:--text-display)',
}

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level: HeadingLevel
  size?: HeadingSize
  children: ReactNode
}

export function Heading({ level, size = 'lg', className = '', children, ...rest }: HeadingProps) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  return (
    <Tag
      className={`font-display font-light tracking-tight leading-snug ${SIZE_CLASS[size]} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
