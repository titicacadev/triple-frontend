import {
  FocusEventHandler,
  ForwardedRef,
  forwardRef,
  KeyboardEventHandler,
  MouseEventHandler,
  PropsWithChildren,
  useRef,
} from 'react'
import { useFocusEffect, useRovingTabIndex } from 'react-roving-tabindex'

import { mergeRefs } from '../../utils/merge-refs'

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
  const internalRef = useRef<HTMLButtonElement>(null)
  const [tabIndex, focused, onKeyDown, onClick] = useRovingTabIndex(
    internalRef,
    false,
  )

  const isSelected = tabs.value === value

  const handleClick: MouseEventHandler = () => {
    onClick()
  }

  const handleFocus: FocusEventHandler = () => {
    tabs.handleFocusChanged?.(value)
  }

  const handleKeyDown: KeyboardEventHandler = (event) => {
    onKeyDown(event)
  }

  useFocusEffect(focused && isSelected, internalRef)

  return (
    <button
      ref={mergeRefs([ref, internalRef])}
      id={`${tabs.id}-tab-${value.toString()}`}
      role="tab"
      tabIndex={tabIndex}
      aria-controls={`${tabs.id}-panel-${value.toString()}`}
      aria-selected={isSelected}
      onClick={handleClick}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </button>
  )
}

export const TabBase = forwardRef(TabBaseComponent)
