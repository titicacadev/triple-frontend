import { useState, useEffect, useRef, useCallback } from 'react'

export default function useDebounce<T>(
  value: T,
  timeout: number,
): { debounced: T; clearDebounce: () => void } {
  const [debounced, setDebounced] = useState(value)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const clearDebounce = useCallback(() => {
    const currentTimerId = timerRef.current

    if (currentTimerId) {
      clearTimeout(currentTimerId)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounced(value)
    }, timeout)

    timerRef.current = timerId

    return () => {
      clearTimeout(timerId)
      timerRef.current = null
    }
  }, [timeout, value])

  return { debounced, clearDebounce }
}
