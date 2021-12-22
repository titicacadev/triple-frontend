import { useState, useEffect, useRef, useCallback } from 'react'

export default function useDebouncedState<T>(
  value: T,
  timeout: number,
): { debounced: T; clearDebounce: () => void } {
  const [debounced, setDebounced] = useState(value)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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
