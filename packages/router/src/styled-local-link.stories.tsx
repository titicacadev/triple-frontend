import styled from 'styled-components'
import { Meta } from '@storybook/react'

import { LocalLink } from './local'

const StyledLocalLink = styled(LocalLink)`
  width: 100%;
  height: 52px;
  background-color: var(--color-blue);
  color: var(--color-white);
  padding: 18px 0;
  border-radius: 8px;
  text-align: center;
`

export default {
  component: (args) => (
    <StyledLocalLink href="/foo" target="current" {...args}>
      테스트링크
    </StyledLocalLink>
  ),
} as Meta

export const Primary = {}
export const Disabled = {
  ...Primary,
  args: { allowSource: 'none' },
}
