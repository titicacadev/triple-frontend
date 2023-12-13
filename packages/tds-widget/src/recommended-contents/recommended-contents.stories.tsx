import type { Meta, StoryObj } from '@storybook/react'

import { contents } from './mocks/recommended-contents.sample.json'
import { RecommendedContents } from './recommended-contents'

export default {
  title: 'recommended-contents / RecommendedContents',
  component: RecommendedContents,
} as Meta<typeof RecommendedContents>

export const Basic: StoryObj<typeof RecommendedContents> = {
  args: {
    contents,
  },
}
