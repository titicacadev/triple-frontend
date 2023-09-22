import type { StoryFn, Meta } from '@storybook/react'

import { ConfirmSelector } from './confirm-selector'

export default {
  title: 'core-elements / ConfirmSelector',
  component: ConfirmSelector,
} as Meta<typeof ConfirmSelector>

export const Default: StoryFn<typeof ConfirmSelector> = () => {
  return <ConfirmSelector>이용약관 동의</ConfirmSelector>
}
