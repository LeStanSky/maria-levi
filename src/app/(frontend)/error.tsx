'use client'

import * as Sentry from '@sentry/nextjs'
import Link from 'next/link'
import { useEffect } from 'react'
import { Button } from '@/components/primitives/Button'
import { Container } from '@/components/primitives/Container'
import { Heading } from '@/components/primitives/Heading'
import { Section } from '@/components/primitives/Section'
import { Text } from '@/components/primitives/Text'

type Props = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function FrontendError({ error, reset }: Props) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <Section padding="lg">
      <Container size="prose">
        <div className="text-center">
          <p className="font-body uppercase text-xs tracking-[0.18em] text-muted mb-6">
            Something went sideways
          </p>
          <Heading level={1} size="2xl">
            We hit a snag loading this page.
          </Heading>
          <Text tone="soft" className="mt-6">
            Try again in a moment — the team has been notified.
          </Text>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <Button type="button" onClick={reset}>
              Try again
            </Button>
            <Link
              href="/"
              className="font-body uppercase text-xs tracking-[0.18em] text-ink underline underline-offset-4 hover:no-underline"
            >
              Go home
            </Link>
          </div>
          {error.digest && (
            <p className="mt-12 font-body text-xs text-muted">
              Reference: <code className="font-mono">{error.digest}</code>
            </p>
          )}
        </div>
      </Container>
    </Section>
  )
}
