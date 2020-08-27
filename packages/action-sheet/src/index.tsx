import React from 'react'

import ActionItemUI from './components/action-item'
import ActionSheetUI from './components/action-sheet'
import { ActionSheetContextValue } from './types'

const { Provider, Consumer } = React.createContext<ActionSheetContextValue>({})

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
  ...restProps
}: Parameters<typeof ActionSheetUI>[0]) {
  return (
    <Provider value={{ onClose }}>
      <ActionSheetUI {...restProps} onClose={onClose} />
    </Provider>
  )
}

ActionSheet.Item = ActionItem
