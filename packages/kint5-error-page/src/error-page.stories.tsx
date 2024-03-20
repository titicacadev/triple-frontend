import type { Meta, StoryObj } from '@storybook/react'

import { ErrorPage } from './error-page'

export default {
  title: 'kint5-error-page / Error Page',
  component: ErrorPage,
} as Meta<typeof ErrorPage>

export const Basic: StoryObj<typeof ErrorPage> = {
  args: {},
}
