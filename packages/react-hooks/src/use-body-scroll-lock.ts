import { useEffect } from 'react'

export interface BodyScrollLockState {
  scrollTop: number
  style?: Partial<{
    top: string
    overflow: string
    width: string
    position: string
  }>
}

const bodyScrollLockStates: BodyScrollLockState[] = []

export function useBodyScrollLock(lock = false) {
  useEffect(() => {
    const body = document.body as HTMLBodyElement

    if (lock) {
      const { top, overflow, width, position } = body.style
      const scrollTop = document?.documentElement?.scrollTop ?? 0

      const state = {
        scrollTop,
        style: { top, overflow, width, position },
      }

      bodyScrollLockStates.push(state)

      body.style.top = `-${scrollTop}px`
      body.style.overflow = 'hidden'
      body.style.width = '100%'
      body.style.position = 'fixed'
    } else {
      const state = bodyScrollLockStates.pop()

      if (state && bodyScrollLockStates.length === 0) {
        const { scrollTop, style = {} } = state

        for (const [key, value] of Object.entries(style)) {
          body.style[key as keyof BodyScrollLockState['style']] = value ?? ''
        }

        document.documentElement.scrollTop = scrollTop || 0
      }
    }
  }, [lock]) // eslint-disable-line react-hooks/exhaustive-deps
}
