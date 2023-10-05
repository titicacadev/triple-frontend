import {
  MouseEventHandler,
  TouchEventHandler,
  ComponentType,
  useCallback,
  MouseEvent,
  ReactNode,
} from 'react'

export interface LongClickableComponentProps<T = Element> {
  children?: ReactNode
  onTouchStart?: TouchEventHandler<T> | null
  onTouchMove?: TouchEventHandler<T> | null
  onTouchEnd?: TouchEventHandler<T> | null
  onClick?: MouseEventHandler<T> | null
}

export function longClickable<T extends LongClickableComponentProps>(
  Component: ComponentType<T>,
  duration = 500,
): ComponentType<T & { onLongClick?: () => void }> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  let isScrolled = false

  return function LongClickComponent({ onLongClick, onClick, ...props }) {
    const onTouchStart: TouchEventHandler = useCallback(() => {
      if (onLongClick) {
        isScrolled = false
        timeoutId = setTimeout(() => {
          timeoutId = undefined
          !isScrolled && onLongClick()
        }, duration)
      }
    }, [onLongClick])

    const onTouchMove: TouchEventHandler = useCallback(() => {
      if (onLongClick) {
        isScrolled = true
      }
    }, [onLongClick])

    const onTouchEnd: TouchEventHandler = useCallback(
      (e) => {
        if (onLongClick) {
          if (timeoutId && !isScrolled) {
            clearTimeout(timeoutId)
            onClick && onClick(e as unknown as MouseEvent) // TODO
          }
        }
      },
      [onLongClick, onClick],
    )

    return (
      <Component
        {...(props as T)}
        onClick={onLongClick ? null : onClick}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />
    )
  }
}
