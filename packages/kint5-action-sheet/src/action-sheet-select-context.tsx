import {
  UseFloatingReturn,
  useInteractions,
  useTransitionStatus,
} from '@floating-ui/react'
import { MutableRefObject, createContext, useContext } from 'react'

export interface ActionSheetSelectContextValue {
  floating: UseFloatingReturn
  interactions: ReturnType<typeof useInteractions>
  transitionStatus: ReturnType<typeof useTransitionStatus>
  activeIndex: number | null
  listRef: MutableRefObject<(HTMLElement | null)[]>
  labelId: string
  value: string | undefined
  open: boolean
  disabled: boolean | undefined
  error: string | undefined
  help: string | undefined
  label: string | undefined
  handleChange: (value: string, index: number) => void
}

export const ActionSheetSelectContext = createContext<
  ActionSheetSelectContextValue | undefined
>(undefined)

export function useActionSheetSelect() {
  const context = useContext(ActionSheetSelectContext)
  if (!context) {
    throw new Error()
  }
  return context
}
