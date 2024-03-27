import type { Meta, StoryObj } from '@storybook/react'

import Footer from './default-footer'

export default {
  title: 'footer / Footer',
  component: Footer,
} as Meta<typeof Footer>

export const Basic: StoryObj<typeof Footer> = {}

export const NoButtons: StoryObj<typeof Footer> = {
  args: {
    hideAppDownloadButton: true,
  },
}
