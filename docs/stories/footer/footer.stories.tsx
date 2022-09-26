import Footer from '@titicaca/footer'
import { Meta, StoryObj } from '@storybook/react'

import { sessionContextProviderDecorator } from '../../decorators'

export default {
  title: 'footer / Footer',
  component: Footer,
  decorators: [sessionContextProviderDecorator],
} as Meta

export const Basic: StoryObj = {
  name: '기본 푸터',
}
