import type { Meta, StoryObj } from '@storybook/react'

import { AppBanner } from './app-banner'

export default {
  title: 'app-banner / AppBanner',
  component: AppBanner,
} as Meta<typeof AppBanner>

export const Basic: StoryObj<typeof AppBanner> = {
  args: {
    title: '트리플 - 해외여행 가이드',
    description: '가이드북, 일정짜기, 길찾기, 맛집',
    cta: '앱에서 보기',
  },
}
