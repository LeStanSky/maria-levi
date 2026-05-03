import type { HTMLAttributes, ReactNode } from 'react'

type SectionPadding = 'sm' | 'md' | 'lg'

const PADDING_CLASS: Record<SectionPadding, string> = {
  sm: 'py-12',
  md: 'py-(--spacing-section)',
  lg: 'py-32 lg:py-48',
}

interface SectionProps extends HTMLAttributes<HTMLElement> {
  padding?: SectionPadding
  children: ReactNode
}

export function Section({ padding = 'md', className = '', children, ...rest }: SectionProps) {
  return (
    <section className={`${PADDING_CLASS[padding]} ${className}`} {...rest}>
      {children}
    </section>
  )
}
