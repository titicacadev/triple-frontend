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

import { ActionSheetSelectContext } from './action-sheet-select-context'
import { TRANSITION_DURATION } from './constants'

export interface ActionSheetSelectProps extends PropsWithChildren {
  value?: string
  onChange?: (value: string) => void
}

export const ActionSheetSelect = ({
  children,
  value,
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
        handleChange,
      }}
    >
      {children}
    </ActionSheetSelectContext.Provider>
  )
}
