import { useEffect } from 'react'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'

export function useBodyScrollLock(id: string, open: boolean) {
  useEffect(() => {
    if (open) {
      disableBodyScroll(document.getElementById(id) as HTMLElement)
    } else {
      const element = document.getElementById(id) as HTMLElement

      if (!element) {
        return clearAllBodyScrollLocks()
      }

      enableBodyScroll(element)
    }
  }, [id, open])
}
