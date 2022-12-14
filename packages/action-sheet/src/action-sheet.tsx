import { PropsWithChildren, ReactNode, useId } from 'react'

import { ActionSheetBase } from './action-sheet-base'
import { ActionSheetContext } from './action-sheet-context'

export interface ActionSheetProps extends PropsWithChildren {
  open?: boolean
  title?: ReactNode
  borderRadius?: number
  bottomSpacing?: number
  from?: 'top' | 'bottom'
  maxContentHeight?: string | number
  onClose?: () => void
}

export const ActionSheet = ({
  children,
  open = false,
  title,
  borderRadius = 12,
  bottomSpacing = 13,
  from = 'bottom',
  maxContentHeight = 'calc(100vh - 256px)',
  onClose,
  ...props
}: ActionSheetProps) => {
  const titleId = useId()

  return (
    <ActionSheetContext.Provider value={{ open, titleId, onClose }}>
      <ActionSheetBase
        borderRadius={borderRadius}
        bottomSpacing={bottomSpacing}
        maxContentHeight={maxContentHeight}
        from={from}
        title={title}
        {...props}
      >
        {children}
      </ActionSheetBase>
    </ActionSheetContext.Provider>
  )
}
