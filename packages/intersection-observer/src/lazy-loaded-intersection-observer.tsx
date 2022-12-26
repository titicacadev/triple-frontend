import { FC } from 'react'
import dynamic from 'next/dynamic'
import { ReactIntersectionObserverProps } from '@titicaca/react-intersection-observer'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
interface IntersectionObserverProps extends ReactIntersectionObserverProps {
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

    return import('@titicaca/react-intersection-observer')
  } catch (e) {
    return Promise.resolve(
      (({ children }) =>
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        children || null) as FC<ReactIntersectionObserverProps>,
    )
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
