import type { Meta, StoryObj } from '@storybook/react'

import ContentSharing from './content-sharing'

export default {
  title: 'content-sharing / ContentSharing',
  component: ContentSharing,
} as Meta<typeof ContentSharing>

export const Basic: StoryObj<typeof ContentSharing> = {
  args: {
    label: '친구들과 여행 정보를 공유하세요',
  },
}
