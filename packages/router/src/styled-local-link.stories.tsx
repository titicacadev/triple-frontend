import type { Meta, StoryObj } from '@storybook/react'
import styled from 'styled-components'

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
} as Meta<typeof LocalLink>

export const Primary: StoryObj<typeof LocalLink> = {}
export const Disabled: StoryObj<typeof LocalLink> = {
  ...Primary,
  args: { allowSource: 'none' },
}
