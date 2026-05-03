import type { HTMLAttributes, ReactNode } from 'react'

type ContainerSize = 'prose' | 'narrow' | 'content' | 'wide'

const SIZE_CLASS: Record<ContainerSize, string> = {
  prose: 'max-w-(--container-prose)',
  narrow: 'max-w-(--container-narrow)',
  content: 'max-w-(--container-content)',
  wide: 'max-w-(--container-wide)',
}

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize
  children: ReactNode
}

export function Container({ size = 'content', className = '', children, ...rest }: ContainerProps) {
  return (
    <div className={`mx-auto px-6 lg:px-12 ${SIZE_CLASS[size]} ${className}`} {...rest}>
      {children}
    </div>
  )
}
