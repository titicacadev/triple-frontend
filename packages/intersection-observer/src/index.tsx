import React from 'react'
import dynamic from 'next/dynamic'

const OriginalObserver = dynamic(async () => {
  try {
    if (
      typeof window !== 'undefined' &&
      !(
        'IntersectionObserver' in window &&
        'IntersectionObserverEntry' in window &&
        'intersectionRatio' in
          (window as any).IntersectionObserverEntry.prototype
      )
    ) {
      await import('intersection-observer')
    }

    return import(
      /* eslint-disable-next-line comma-dangle */
      '@researchgate/react-intersection-observer'
    )
  } catch (e) {
    return Promise.resolve(({ children }) => children || null)
  }
})

export default function IntersectionObserver(props) {
  return <OriginalObserver {...props} />
}
