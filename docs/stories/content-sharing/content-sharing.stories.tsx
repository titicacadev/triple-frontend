import ContentSharing from '@titicaca/content-sharing'
import { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'content-sharing / ContentSharing',
  component: ContentSharing,
} as Meta

export const Basic: StoryObj = {
  name: '기본 컨텐츠 공유',
  args: {
    label: '친구들과 여행 정보를 공유하세요',
  },
}
