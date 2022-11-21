import { useFocusManager } from '@react-aria/focus'
import {
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
  PropsWithChildren,
} from 'react'

import { useTabs } from './tabs-context'

export interface TabBaseProps extends PropsWithChildren {
  value: string
}

export const TabBase = forwardRef<HTMLButtonElement, TabBaseProps>(
  function TabBase({ children, value, ...props }, ref) {
    const tabs = useTabs()
    const focusManager = useFocusManager()

    const isSelected = tabs.value === value

    const handleClick: MouseEventHandler = () => {
      tabs.onChange?.(value)
    }

    const handleKeyDown: KeyboardEventHandler = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          event.stopPropagation()
          focusManager.focusPrevious({ wrap: true })
          break
        case 'ArrowRight':
          event.stopPropagation()
          focusManager.focusNext({ wrap: true })
          break
        case 'Home':
          event.stopPropagation()
          focusManager.focusFirst({ wrap: true })
          break
        case 'End':
          event.stopPropagation()
          focusManager.focusLast({ wrap: true })
          break
      }
    }

    return (
      <button
        ref={ref}
        id={`${tabs.id}-tab-${value}`}
        role="tab"
        tabIndex={isSelected ? 0 : -1}
        aria-controls={`${tabs.id}-panel-${value}`}
        aria-selected={isSelected}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </button>
    )
  },
)
