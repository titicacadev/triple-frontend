import React from 'react'
import dynamic from 'next/dynamic'

const OriginalObserver = dynamic(
  async () => {
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

      const component = await import(
        '@researchgate/react-intersection-observer'
      )

      return component
    } catch (e) {
      return ({ children }) => children || null
    }
  },
  {
    loading: ({ children }) => children || null,
    ssr: ({ children }) => children || null,
  },
)

export default function IntersectionObserver(props) {
  return <OriginalObserver {...props} />
}
