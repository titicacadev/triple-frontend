import { ComponentStory, Meta } from '@storybook/react'

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
