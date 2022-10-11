import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import AppBanner from '.'

export default {
  title: 'app-banner / AppBanner',
  component: AppBanner,
} as ComponentMeta<typeof AppBanner>

export const Basic: ComponentStoryObj<typeof AppBanner> = {
  args: {
    title: '트리플 - 해외여행 가이드',
    description: '가이드북, 일정짜기, 길찾기, 맛집',
    cta: '앱에서 보기',
  },
}
