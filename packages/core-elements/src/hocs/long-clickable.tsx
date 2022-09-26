import {
  MouseEventHandler,
  TouchEventHandler,
  ComponentType,
  useCallback,
} from 'react'

interface LongClickableComponentProps<T = Element> {
  onTouchStart?: TouchEventHandler<T> | null
  onTouchMove?: TouchEventHandler<T> | null
  onTouchEnd?: TouchEventHandler<T> | null
  onClick?: MouseEventHandler<T> | null
}

export default function longClickable<T extends LongClickableComponentProps>(
  Component: ComponentType<T>,
  duration = 500,
): ComponentType<T & { onLongClick?: () => void }> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  let isScrolled = false

  return function LongClickComponent({ onLongClick, onClick, ...props }) {
    const onTouchStart = useCallback(() => {
      if (onLongClick) {
        isScrolled = false
        timeoutId = setTimeout(() => {
          timeoutId = undefined
          !isScrolled && onLongClick()
        }, duration)
      }
    }, [onLongClick])

    const onTouchMove = useCallback(() => {
      if (onLongClick) {
        isScrolled = true
      }
    }, [onLongClick])

    const onTouchEnd = useCallback(
      (e) => {
        if (onLongClick) {
          if (timeoutId && !isScrolled) {
            clearTimeout(timeoutId)
            onClick && onClick(e)
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
