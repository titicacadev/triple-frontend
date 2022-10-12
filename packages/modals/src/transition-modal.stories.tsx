import { ComponentStory, Meta } from '@storybook/react'
import { Button } from '@titicaca/core-elements'

import {
  TransitionModal,
  TransitionType,
  useTransitionModal,
} from './transition-modal'

export default {
  title: 'modals / TransitionModal',
  component: TransitionModal,
} as Meta

function UriHashHistoryManipulator({ uriHash }: { uriHash: string }) {
  const { show } = useTransitionModal()

  return (
    <Button onClick={() => uriHash && show(uriHash as TransitionType)}>
      Show [{uriHash}] type
    </Button>
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
