import React from 'react'
import { HistoryProvider } from '@titicaca/react-contexts'
import {
  TransitionModal,
  TransitionType,
  useTransitionModal,
} from '@titicaca/modals'
import { select } from '@storybook/addon-knobs'
import { StoryFn } from '@storybook/addons'

export default {
  title: 'modals | Modal',
}

export function BaseTransitionModal() {
  return (
    <div>
      <UriHashHistoryManipulator
        uriHash={select(
          'Hash',
          Object.keys(TransitionType).map(
            (key) => TransitionType[key as keyof typeof TransitionType],
          ),
          TransitionType.General,
        )}
      />
      <TransitionModal deepLink="" />
    </div>
  )
}

BaseTransitionModal.story = {
  name: 'TransitionModal',
  decorators: [
    (storyFn: StoryFn<JSX.Element>) => (
      <HistoryProvider
        appUrlScheme="dev-soto"
        webUrlBase="https://triple-dev.titicaca-corp.com"
        isPublic={false}
        isAndroid={false}
        transitionModalHash="transition.general"
      >
        <div>{storyFn()}</div>
      </HistoryProvider>
    ),
  ],
}

function UriHashHistoryManipulator({ uriHash }: { uriHash: string }) {
  const { show } = useTransitionModal()

  return (
    <button onClick={() => uriHash && show(uriHash as TransitionType)}>
      Show [{uriHash}] type
    </button>
  )
}
