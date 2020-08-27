import React from 'react'

import ActionItemUI from './components/action-item'
import ActionSheetUI from './components/action-sheet'
import { ActionSheetContextValue } from './types'

const DEFAULT_FROM = 'bottom'
const DEFAULT_BORDER_RADIUS = 12

const { Provider, Consumer } = React.createContext<ActionSheetContextValue>({
  from: DEFAULT_FROM,
  borderRadius: DEFAULT_BORDER_RADIUS,
})

function ActionItem(
  props: Omit<Parameters<typeof ActionItemUI>[0], 'onClose'>,
) {
  return (
    <Consumer>
      {({ onClose }) => <ActionItemUI {...props} onClose={onClose} />}
    </Consumer>
  )
}

export default function ActionSheet({
  onClose,
  from = DEFAULT_FROM,
  borderRadius = DEFAULT_BORDER_RADIUS,
  ...restProps
}: Partial<ActionSheetContextValue> &
  Omit<Parameters<typeof ActionSheetUI>[0], 'from' | 'borderRadius'>) {
  return (
    <Provider value={{ onClose, from, borderRadius }}>
      <ActionSheetUI
        {...restProps}
        onClose={onClose}
        from={from}
        borderRadius={borderRadius}
      />
    </Provider>
  )
}

ActionSheet.Item = ActionItem
