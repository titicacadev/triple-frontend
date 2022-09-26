import { LogoFooter } from '@titicaca/footer'
import { Meta, StoryObj } from '@storybook/react'

import { sessionContextProviderDecorator } from '../../decorators'

export default {
  title: 'footer / LogoFooter',
  component: LogoFooter,
  decorators: [sessionContextProviderDecorator],
} as Meta

export const Basic: StoryObj = {
  name: '로고 푸터',
}
