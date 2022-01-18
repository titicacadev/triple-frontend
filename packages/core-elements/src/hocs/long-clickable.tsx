import React, { useCallback } from 'react'

interface LongClickableComponentProps {
  onTouchStart?: ((e: React.TouchEvent<unknown>) => void) | null
  onTouchMove?: ((e: React.TouchEvent<unknown>) => void) | null
  onTouchEnd?: ((e: React.TouchEvent<unknown>) => void) | null
  onClick?: ((e: React.MouseEvent<unknown>) => void) | null
}

export default function longClickable<T extends LongClickableComponentProps>(
  Component: React.ComponentType<T>,
  duration = 500,
): React.ComponentType<T & { onLongClick?: () => void }> {
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
