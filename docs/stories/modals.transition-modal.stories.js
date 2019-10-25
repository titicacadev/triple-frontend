import React from 'react'

import { storiesOf } from '@storybook/react'
import { HistoryProvider, useHistoryContext } from '@titicaca/react-contexts'
import { TransitionModal, TransitionType } from '@titicaca/modals'
import { select } from '@storybook/addon-knobs'

storiesOf('Modal.TransitionModal', module).add('Basic', () => (
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
  const { push } = useHistoryContext()

  return (
    <button onClick={() => uriHash && push(`transition.${uriHash}`)}>
      Show
    </button>
  )
}
