import React from 'react'

import { storiesOf } from '@storybook/react'
import { HistoryProvider } from '@titicaca/react-contexts'
import {
  TransitionModal,
  TransitionType,
  useTransitionModal,
} from '@titicaca/modals'
import { select } from '@storybook/addon-knobs'

storiesOf('Modal', module).add('TransitionModal', () => (
  <HistoryProvider>
    <UriHashHistoryManipulator
      uriHash={select(
        'Hash',
        Object.keys(TransitionType).map((key) => TransitionType[key]),
        TransitionType.General,
      )}
    />
    <TransitionModal />
  </HistoryProvider>
))

function UriHashHistoryManipulator({ uriHash }) {
  const { show } = useTransitionModal()

  return (
    <button onClick={() => uriHash && show(uriHash)}>
      Show [{uriHash}] type
    </button>
  )
}
