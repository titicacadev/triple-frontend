import { PropsWithChildren, useEffect, useRef } from 'react'

export interface StaticIntersectionObserverProps
  extends PropsWithChildren,
    IntersectionObserverInit {
  onChange?: (entry: IntersectionObserverEntry, unobserve: () => void) => void
}

export function StaticIntersectionObserver({
  children,
  root,
  rootMargin,
  threshold,
  onChange,
}: StaticIntersectionObserverProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const target = ref.current
    if (target) {
      const handleIntersection: IntersectionObserverCallback = (
        entries,
        observer,
      ) => {
        onChange?.(entries[0], () => observer.unobserve(target))
      }

      const observer = new IntersectionObserver(handleIntersection, {
        root,
        rootMargin,
        threshold,
      })

      observer.observe(target)
      return () => observer.disconnect()
    }
  }, [onChange, root, rootMargin, threshold])

  return <div ref={ref}> {children}</div>
}
