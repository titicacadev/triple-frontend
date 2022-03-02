import { useEffect, useRef } from 'react'

/**
 * @param {number|null} delay null인 경우 setInterval을 일시 중지한다.
 */

export function useInterval(callback?: Function, delay: number | null = null) {
  const savedCallback = useRef<Function>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
