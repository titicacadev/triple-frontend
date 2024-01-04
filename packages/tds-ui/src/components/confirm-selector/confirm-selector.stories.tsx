import type { StoryObj, Meta } from '@storybook/react'

import { ConfirmSelector } from './confirm-selector'

const meta: Meta<typeof ConfirmSelector> = {
  title: 'tds-ui / ConfirmSelector',
  component: ConfirmSelector,
}

export default meta

export const Default: StoryObj<typeof ConfirmSelector> = {
  args: {
    children: '이용약관 동의',
  },
}
