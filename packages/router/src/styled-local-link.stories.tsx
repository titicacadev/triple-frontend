import styled from 'styled-components'
import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { LocalLink } from './local'

const StyledLocalLink = styled(LocalLink)`
  display: inline-block;
  width: 100%;
  height: 52px;
  background-color: var(--color-blue);
  color: var(--color-white);
  padding: 18px 0;
  border-radius: 8px;
  text-align: center;
`

export default {
  title: 'Router / Styled Local Link',
  component: (args) => (
    <StyledLocalLink href="/foo" target="current" {...args}>
      테스트링크
    </StyledLocalLink>
  ),
} as ComponentMeta<typeof LocalLink>

export const Primary: ComponentStoryObj<typeof LocalLink> = {}
export const Disabled: ComponentStoryObj<typeof LocalLink> = {
  ...Primary,
  args: { allowSource: 'none' },
}
