import { Meta, StoryObj } from '@storybook/react'

import { contents } from './mocks/recommended-contents.sample.json'

import RecommendedContents from '.'

export default {
  title: 'recommended-contents / RecommendedContents',
  component: RecommendedContents,
} as Meta

export const Primary: StoryObj = {
  name: '추천 컨텐츠',
  args: {
    contents,
  },
}
