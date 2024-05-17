import type { Meta, StoryObj } from '@storybook/react'

import { DesktopFloatingAppBanner } from '.'

export default {
  title: 'app-banner / DesktopFloatingAppBanner',
  component: DesktopFloatingAppBanner,
} as Meta<typeof DesktopFloatingAppBanner>

export const Basic: StoryObj<typeof DesktopFloatingAppBanner> = {
  args: {},
}
