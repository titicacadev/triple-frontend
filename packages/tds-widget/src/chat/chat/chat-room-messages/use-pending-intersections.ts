import { useRef, useEffect, useCallback } from 'react'

interface PendingIntersection {
  entry: IntersectionObserverEntry
  id: string | number
  createdMessage?: boolean
}

export function usePendingIntersections(
  processFn: (params: PendingIntersection) => void,
) {
  const isPageVisibleRef = useRef(!document.hidden)
  const pendingIntersectionsRef = useRef<PendingIntersection[]>([])

  const addPendingIntersection = (
    pending: PendingIntersection,
    add: boolean = false,
  ) => {
    if (add) {
      pendingIntersectionsRef.current.push(pending)
      return
    }

    pendingIntersectionsRef.current = [pending]
  }

  const processPendingIntersections = useCallback(() => {
    if (pendingIntersectionsRef.current.length > 0) {
      pendingIntersectionsRef.current.forEach((params) => {
        processFn(params)
      })
      pendingIntersectionsRef.current = []
    }
  }, [processFn])

  const removeAllPendingIntersections = () => {
    pendingIntersectionsRef.current = []
  }

  const isVisible = () => isPageVisibleRef.current

  useEffect(() => {
    const handleVisibilityChange = () => {
      const wasHidden = isPageVisibleRef.current === false
      isPageVisibleRef.current = !document.hidden

      // 페이지가 숨겨졌다가 다시 보일 때 pending 작업들 처리
      if (wasHidden && !document.hidden) {
        processPendingIntersections()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [processPendingIntersections])

  return {
    isVisible,
    addPendingIntersection,
    processPendingIntersections,
    removeAllPendingIntersections,
  }
}
