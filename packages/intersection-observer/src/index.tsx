import React from 'react'
import dynamic from 'next/dynamic'
import { Props } from '@researchgate/react-intersection-observer'

interface IntersectionObserverProps extends Props {
  safe?: boolean
}

async function importReactIntersectionObserver() {
  try {
    if (
      typeof window !== 'undefined' &&
      !(
        'IntersectionObserver' in window &&
        'IntersectionObserverEntry' in window &&
        'intersectionRatio' in window.IntersectionObserverEntry.prototype
      )
    ) {
      await import('intersection-observer')
    }

    return import(
      /* eslint-disable-next-line comma-dangle */
      '@researchgate/react-intersection-observer'
    )
  } catch (e) {
    return Promise.resolve((({ children }) => children || null) as React.FC<
      Props
    >)
  }
}

const Observer = dynamic(importReactIntersectionObserver)

const SafeObserver = dynamic(importReactIntersectionObserver, {
  ssr: false,
})

export default function IntersectionObserver({
  safe,
  ...props
}: IntersectionObserverProps) {
  return safe ? <SafeObserver {...props} /> : <Observer {...props} />
}
