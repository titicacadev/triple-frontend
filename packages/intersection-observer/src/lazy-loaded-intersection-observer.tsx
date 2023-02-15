import { FC } from 'react'
import dynamic from 'next/dynamic'
import { ReactIntersectionObserverProps } from '@titicaca/react-intersection-observer'

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
        children || null) as FC<ReactIntersectionObserverProps>,
    )
  }
}

const Observer = dynamic(importReactIntersectionObserver)

const SafeObserver = dynamic(importReactIntersectionObserver, {
  ssr: false,
})

/**
 * @deprecated StaticIntersectionObserver를 사용해 주세요.
 */
export default function IntersectionObserver({
  safe,
  ...props
}: IntersectionObserverProps) {
  return safe ? <SafeObserver {...props} /> : <Observer {...props} />
}
