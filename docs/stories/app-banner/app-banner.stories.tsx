import AppBanner from '@titicaca/app-banner'
import { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'app-banner / AppBanner',
  component: AppBanner,
} as Meta

export const Basic: StoryObj = {
  name: '공유페이지',
  args: {
    title: '트리플 - 해외여행 가이드',
    description: '가이드북, 일정짜기, 길찾기, 맛집',
    cta: '앱에서 보기',
  },
}
