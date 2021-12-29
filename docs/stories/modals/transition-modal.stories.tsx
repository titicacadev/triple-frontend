import React from 'react'
import {
  TransitionModal,
  TransitionType,
  useTransitionModal,
} from '@titicaca/modals'
import { ComponentStory, Meta } from '@storybook/react'

import { historyProviderDecorator } from '../../decorators'

export default {
  title: 'modals / TransitionModal',
  component: TransitionModal,
  decorators: [historyProviderDecorator],
} as Meta

function UriHashHistoryManipulator({ uriHash }: { uriHash: string }) {
  const { show } = useTransitionModal()

  return (
    <button onClick={() => uriHash && show(uriHash as TransitionType)}>
      Show [{uriHash}] type
    </button>
  )
}

export const Basic: ComponentStory<typeof TransitionModal> = ({ ...args }) => {
  return (
    <div>
      <UriHashHistoryManipulator uriHash={TransitionType.General} />
      <TransitionModal {...args} />
    </div>
  )
}
Basic.args = {
  deepLink: '',
}
