import { useEffect } from 'react'

export function useVisibilityChange(
  onChange: (visible: boolean) => void,
  deps: unknown[] = [],
) {
  useEffect(() => {
    function handleChange() {
      onChange(!document.hidden)
    }

    document.addEventListener('visibilitychange', handleChange)

    return () => {
      document.removeEventListener('visibilitychange', handleChange)
    }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}
