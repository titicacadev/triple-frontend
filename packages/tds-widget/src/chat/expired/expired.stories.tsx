import { ComponentProps } from 'react'
import type { Meta, StoryFn } from '@storybook/react'

import { Expired } from './expired'

export default {
  title: 'tds-widget / chat / Expired',
  component: Expired,
} as Meta<ComponentProps<typeof Expired>>

export const Default: StoryFn<ComponentProps<typeof Expired>> = () => (
  <Expired />
)
