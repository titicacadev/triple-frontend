import type { Meta, StoryObj } from '@storybook/react'

import { LineFillHeartIcon } from './line-fill-heart-icon'

export default {
  title: 'kint5-core-elements / Icons / Line fill heart icon',
  component: LineFillHeartIcon,
} as Meta<typeof LineFillHeartIcon>

export const Default: StoryObj<typeof LineFillHeartIcon> = {
  args: {
    width: 24,
    height: 24,
    lineColor: '#FFF',
    fillColor: '#000',
  },
}
