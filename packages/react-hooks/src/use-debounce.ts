import { useState, useEffect } from 'react'

export default function useDebounce<T>(value: T, timeout: number): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounced(value)
    }, timeout)

    return () => {
      clearTimeout(timerId)
    }
  }, [timeout, value])

  return debounced
}
