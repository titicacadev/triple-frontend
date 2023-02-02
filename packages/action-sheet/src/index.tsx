import { createContext } from 'react'

import ActionItemUI from './components/action-item'
import ActionSheetUI from './components/action-sheet'

type ActionSheetContextValue = Pick<
  Parameters<typeof ActionItemUI>[0],
  'onClose'
>

const { Provider, Consumer } = createContext<ActionSheetContextValue>({})

export function ActionSheetItem(
  props: Omit<Parameters<typeof ActionItemUI>[0], 'onClose'>,
) {
  return (
    <Consumer>
      {({ onClose }) => <ActionItemUI {...props} onClose={onClose} />}
    </Consumer>
  )
}

export function ActionSheet({
  onClose,
  ...restProps
}: ActionSheetContextValue & Parameters<typeof ActionSheetUI>[0]) {
  return (
    <Provider value={{ onClose }}>
      <ActionSheetUI {...restProps} onOverlayClick={onClose} />
    </Provider>
  )
}
