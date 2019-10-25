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
        [
          TransitionType.General,
          TransitionType.Gallery,
          TransitionType.Scrap,
          TransitionType.Review,
          TransitionType.ReviewWrite,
          TransitionType.Article,
          TransitionType.Tna,
          TransitionType.Hotel,
          TransitionType.View,
        ],
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
