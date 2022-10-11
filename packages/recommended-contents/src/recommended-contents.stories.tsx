import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { contents } from './mocks/recommended-contents.sample.json'

import RecommendedContents from '.'

export default {
  title: 'recommended-contents / RecommendedContents',
  component: RecommendedContents,
} as ComponentMeta<typeof RecommendedContents>

export const Basic: ComponentStoryObj<typeof RecommendedContents> = {
  args: {
    contents,
  },
}
