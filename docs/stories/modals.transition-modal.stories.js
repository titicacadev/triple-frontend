import React from 'react'

import { storiesOf } from '@storybook/react'
import { HistoryProvider, useHistoryContext } from '@titicaca/react-contexts'
import { TransitionModal } from '@titicaca/modals'
import { select } from '@storybook/addon-knobs'

storiesOf('Modal.TransitionModal', module).add('Basic', () => (
  <HistoryProvider>
    <UriHashHistoryManipulator
      uriHash={select('Hash', ['general', 'review'], 'general')}
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
