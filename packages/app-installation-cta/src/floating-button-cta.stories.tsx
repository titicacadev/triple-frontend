import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import FloatingButtonCTA from './floating-button-cta'

export default {
  title: 'app-installation-cta / FloatingButtonCTA',
  component: FloatingButtonCTA,
  parameters: {
    chromatic: {
      viewports: [375],
    },
  },
} as ComponentMeta<typeof FloatingButtonCTA>

export const Basic: ComponentStoryObj<typeof FloatingButtonCTA> = {
  args: {
    appInstallLink: 'https://triple.onelink.me/aZP6/21d43a81',
  },
}
