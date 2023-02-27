import { useFocusManager } from '@react-aria/focus'
import {
  ForwardedRef,
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
  PropsWithChildren,
} from 'react'

import { useTabs } from './tabs-context'

export interface TabBaseProps<Value> extends PropsWithChildren {
  /**
   * 각 탭마다의 유니크한 값
   */
  value: Value
}

function TabBaseComponent<Value extends number | string | symbol>(
  { children, value, ...props }: TabBaseProps<Value>,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const tabs = useTabs<Value>()
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
      id={`${tabs.id}-tab-${value.toString()}`}
      role="tab"
      tabIndex={isSelected ? 0 : -1}
      aria-controls={`${tabs.id}-panel-${value.toString()}`}
      aria-selected={isSelected}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </button>
  )
}

export const TabBase = forwardRef(TabBaseComponent)
