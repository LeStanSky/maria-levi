import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import type { ComponentProps } from 'react'

type Props = {
  data: ComponentProps<typeof PayloadRichText>['data'] | null | undefined
  className?: string
}

export function RichText({ data, className }: Props) {
  if (!data) return null
  return <PayloadRichText data={data} className={className} disableContainer />
}
