import { useEffect } from 'react'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

export function useBodyScrollLock(id: string, open: boolean) {
  useEffect(() => {
    if (open) {
      disableBodyScroll(document.getElementById(id) as HTMLElement)
    } else {
      enableBodyScroll(document.getElementById(id) as HTMLElement)
    }
  }, [id, open])
}
