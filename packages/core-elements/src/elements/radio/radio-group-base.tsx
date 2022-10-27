import {
  Children,
  cloneElement,
  isValidElement,
  KeyboardEventHandler,
  PropsWithChildren,
  ReactElement,
} from 'react'
import { useFocusManager } from '@react-aria/focus'

import { RadioProps } from './radio'
import { useRadioGroup } from './radio-group-context'

export type RadioGroupBaseProps = PropsWithChildren

export const RadioGroupBase = ({ children }: RadioGroupBaseProps) => {
  const group = useRadioGroup()
  if (!group) {
    throw new Error()
  }

  const focusManager = useFocusManager()

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.stopPropagation()
        focusManager.focusNext()
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        event.stopPropagation()
        focusManager.focusPrevious()
        break
      case 'Home':
        event.stopPropagation()
        focusManager.focusFirst()
        break
      case 'End':
        event.stopPropagation()
        focusManager.focusLast()
        break
    }
  }

  const hasNoSelected = group.value === undefined

  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div
      role="radiogroup"
      aria-orientation="vertical"
      onKeyDown={handleKeyDown}
    >
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          let tabIndex = -1

          const isFirstChild = index === 0
          const isSelectedChild = group.value === child.props.value

          const isTabbale = (hasNoSelected && isFirstChild) || isSelectedChild

          if (isTabbale) {
            tabIndex = 0
          }

          return cloneElement(child as ReactElement<RadioProps>, {
            tabIndex,
          })
        }

        return child
      })}
    </div>
  )
}
