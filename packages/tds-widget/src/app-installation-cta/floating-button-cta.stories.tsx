import type { Meta, StoryObj } from '@storybook/react'

import { FloatingButtonCta as FloatingButtonCTA } from './floating-button-cta'

export default {
  title: 'app-installation-cta / FloatingButtonCTA',
  component: FloatingButtonCTA,
  parameters: {
    chromatic: {
      viewports: [375],
    },
  },
} as Meta<typeof FloatingButtonCTA>

export const Basic: StoryObj<typeof FloatingButtonCTA> = {
  args: {
    appInstallLink: 'https://triple.onelink.me/aZP6/21d43a81',
  },
}
