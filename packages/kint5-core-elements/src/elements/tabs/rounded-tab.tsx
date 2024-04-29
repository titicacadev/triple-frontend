import { ForwardedRef, forwardRef } from 'react'
import styled from 'styled-components'

import { TabBase, TabBaseProps } from './tab-base'

const StyledTabBase = styled(TabBase)`
  flex: none;
  padding: 9.5px 14px;
  border-radius: 100px;
  background: #f1f3f5;
  font-size: 14px;
  line-height: 16px;
  color: #000;

  &[aria-selected='true'] {
    color: #fff;
    background: #000;
    font-weight: 700;
  }
`

function RoundedTabImpl<Value extends number | string | symbol>(
  { children, ...props }: TabBaseProps<Value>,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <StyledTabBase ref={ref} {...props}>
      {children}
    </StyledTabBase>
  )
}

export const RoundedTab = forwardRef(RoundedTabImpl)
