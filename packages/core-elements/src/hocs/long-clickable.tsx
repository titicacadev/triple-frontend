import React, { useCallback, useMemo } from 'react'

interface LongClickableComponentProps {
  onTouchStart?: (e: React.SyntheticEvent) => void
  onTouchMove?: (e: React.SyntheticEvent) => void
  onTouchEnd?: (e: React.SyntheticEvent) => void
  onClick?: (e: React.SyntheticEvent) => void
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

    const onTouchMove = useMemo(() => {
      isScrolled = true
    }, [])

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
