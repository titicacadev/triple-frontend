import type { Meta, StoryObj } from '@storybook/react'

import { MobileFloatingAppBanner } from '.'

export default {
  title: 'app-banner / MobileFloatingAppBanner',
  component: MobileFloatingAppBanner,
} as Meta<typeof MobileFloatingAppBanner>

export const Basic: StoryObj<typeof MobileFloatingAppBanner> = {
  args: {},
}
