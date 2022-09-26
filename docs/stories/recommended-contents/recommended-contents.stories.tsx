import RecommendedContents from '@titicaca/recommended-contents'
import { Meta, StoryObj } from '@storybook/react'

import { contents } from '../__mocks__/recommended-contents.sample.json'

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
