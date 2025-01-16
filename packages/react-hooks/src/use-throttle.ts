import { useEffect, useRef, useState } from 'react'

export function useThrottledState<T>(value: T, timeout: number) {
  const [throttled, setIsThrottled] = useState(value)
  const activeValue = useRef(value)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearThrottle = () => {
    timerRef.current && clearTimeout(timerRef.current)
    timerRef.current = null
  }

  useEffect(() => {
    if (!timerRef.current) {
      timerRef.current = setTimeout(() => {
        setIsThrottled(activeValue.current)
        timerRef.current = null
      }, timeout)
    } else {
      activeValue.current = value
    }

    return clearThrottle
  }, [timeout, throttled, value])

  return { throttled, clearThrottle }
}

export function useThrottle<T extends unknown[]>(
  callbackFn: (...args: T) => void,
  timeout: number,
) {
  const [throttled, setThrottled] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearThrottle = () => {
    setThrottled(false)
    timerRef.current && clearTimeout(timerRef.current)
    timerRef.current = null
  }

  return (...args: T) => {
    if (!throttled) {
      setThrottled(true)
      callbackFn(...args)
      timerRef.current = setTimeout(() => {
        clearThrottle()
      }, timeout)
    }
  }
}
