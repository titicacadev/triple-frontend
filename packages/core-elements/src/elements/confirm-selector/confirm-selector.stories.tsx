import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ConfirmSelector } from './confirm-selector'

export default {
  title: 'core-elements / ConfirmSelector',
  component: ConfirmSelector,
} as ComponentMeta<typeof ConfirmSelector>

export const Default: ComponentStory<typeof ConfirmSelector> = () => {
  return <ConfirmSelector>이용약관 동의</ConfirmSelector>
}
