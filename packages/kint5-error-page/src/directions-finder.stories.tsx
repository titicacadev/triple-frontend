import type { Meta, StoryObj } from '@storybook/react'

import { Page404 } from './404-page'

export default {
  title: 'kint5-error-page / 404 Page',
  component: Page404,
} as Meta<typeof Page404>

export const Basic: StoryObj<typeof Page404> = {
  args: {},
}
