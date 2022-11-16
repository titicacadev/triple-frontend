import { ElementType, useCallback, useState } from 'react'

export function useButtonType(value?: ElementType) {
  const [isButton, setIsButton] = useState(!value)
  const refCallback = useCallback((node: HTMLElement | null) => {
    if (!node) {
      return
    }
    setIsButton(node.tagName === 'BUTTON')
  }, [])
  const type = isButton ? 'button' : undefined
  return { ref: refCallback, type } as const
}
