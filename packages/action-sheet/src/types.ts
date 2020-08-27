import { SyntheticEvent } from 'react'

export interface ActionSheetContextValue {
  borderRadius: number
  from: 'bottom' | 'top'
  onClose?: (e?: SyntheticEvent) => any
}
