import {
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTransitionStatus,
} from '@floating-ui/react'
import { PropsWithChildren, useCallback, useId, useRef, useState } from 'react'
import { FormField } from '@titicaca/core-elements'

import { ActionSheetSelectContext } from './action-sheet-select-context'
import { TRANSITION_DURATION } from './constants'

export interface ActionSheetSelectProps extends PropsWithChildren {
  value?: string
  disabled?: boolean
  error?: string
  help?: string
  label?: string
  required?: boolean
  onChange?: (value: string) => void
}

export const ActionSheetSelect = ({
  children,
  value,
  disabled,
  error,
  help,
  label,
  required,
  onChange,
}: ActionSheetSelectProps) => {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const listRef = useRef<(HTMLElement | null)[]>([])
  const labelId = useId()

  const floating = useFloating({
    open,
    onOpenChange: setOpen,
  })

  const { context } = floating

  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'listbox' })

  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    selectedIndex,
    loop: true,
    onNavigate: setActiveIndex,
  })

  const interactions = useInteractions([click, dismiss, role, listNav])

  const transitionStatus = useTransitionStatus(context, {
    duration: TRANSITION_DURATION,
  })

  const handleChange = useCallback(
    (value: string, index: number) => {
      setSelectedIndex(index)
      setOpen(false)
      onChange?.(value)
    },
    [onChange],
  )

  const isDisabled = !!disabled
  const isError = !!error
  const isRequired = !!required

  return (
    <ActionSheetSelectContext.Provider
      value={{
        floating,
        interactions,
        transitionStatus,
        listRef,
        labelId,
        activeIndex,
        value,
        open,
        disabled,
        error,
        help,
        label,
        handleChange,
      }}
    >
      <FormField
        isDisabled={isDisabled}
        isError={isError}
        isRequired={isRequired}
      >
        {children}
      </FormField>
    </ActionSheetSelectContext.Provider>
  )
}
