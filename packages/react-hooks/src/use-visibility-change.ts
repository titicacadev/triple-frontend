import { useEffect } from 'react'
import { useUserAgentContext } from '@titicaca/react-contexts'

export function useVisibilityChange(
  onChange: (visible: boolean) => void,
  deps: unknown[] = [],
) {
  const { isPublic } = useUserAgentContext()

  useEffect(() => {
    function handleChange() {
      onChange(!document.hidden)
    }

    if (!isPublic) {
      document.addEventListener('visibilitychange', handleChange)
    }

    return () => {
      if (!isPublic) {
        document.removeEventListener('visibilitychange', handleChange)
      }
    }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}
