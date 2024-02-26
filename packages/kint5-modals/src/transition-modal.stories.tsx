import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@titicaca/kint5-core-elements'

import {
  TransitionModal,
  TransitionType,
  useTransitionModal,
} from './transition-modal'

export default {
  title: 'kint5-modals / TransitionModal',
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

export const Basic: StoryObj<typeof TransitionModal> = {
  render: ({ ...args }) => {
    return (
      <div>
        <UriHashHistoryManipulator uriHash={TransitionType.General} />
        <TransitionModal {...args} />
      </div>
    )
  },

  args: {
    deepLink: '',
  },
}
