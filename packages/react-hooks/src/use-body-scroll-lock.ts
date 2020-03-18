import { useEffect } from 'react'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

export function useBodyScrollLock(id: string, open: boolean) {
  useEffect(() => {
    if (open) {
      disableBodyScroll(document.querySelector(id) as HTMLElement)
    } else {
      enableBodyScroll(document.querySelector(id) as HTMLElement)
    }
  }, [id, open])
}
