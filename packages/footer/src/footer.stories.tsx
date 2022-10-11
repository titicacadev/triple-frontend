import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import Footer from './default-footer'

export default {
  title: 'footer / Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>

export const Basic: ComponentStoryObj<typeof Footer> = {}

export const NoButtons: ComponentStoryObj<typeof Footer> = {
  args: {
    hideAppDownloadButton: true,
  },
}
