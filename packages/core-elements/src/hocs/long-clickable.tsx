import React, { useCallback } from 'react'

interface LongClickableComponentProps {
  onTouchStart: ((e: React.TouchEvent<any>) => void) | undefined | null
  onTouchMove: ((e: React.TouchEvent<any>) => void) | undefined | null
  onTouchEnd: ((e: React.TouchEvent<any>) => void) | undefined | null
  onClick: ((e: React.MouseEvent<any>) => void) | undefined | null
}

export default function longClickable<T extends LongClickableComponentProps>(
  Component: React.ComponentType<T>,
  duration: number = 500,
): React.ComponentType<T & { onLongClick?: () => void }> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined
  let isScrolled: boolean = false

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
