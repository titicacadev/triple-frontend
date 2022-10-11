import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import ContentSharing from '.'

export default {
  title: 'content-sharing / ContentSharing',
  component: ContentSharing,
} as ComponentMeta<typeof ContentSharing>

export const Basic: ComponentStoryObj<typeof ContentSharing> = {
  args: {
    label: '친구들과 여행 정보를 공유하세요',
  },
}
