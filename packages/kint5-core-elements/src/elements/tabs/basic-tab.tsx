import styled from 'styled-components'
import { ForwardedRef, forwardRef } from 'react'

import { TabBase, TabBaseProps } from './tab-base'

const StyledTabBase = styled(TabBase)`
  flex: 1;
  color: rgba(46, 46, 46, 0.3);
  border-radius: 2px;
  font-size: 14px;
  font-weight: bold;
  padding: 11px 0;

  &[aria-selected='true'] {
    color: var(--color-gray);
    background-color: var(--color-white);
  }
`

function BasicTabImpl<Value extends number | string | symbol>(
  { children, ...props }: TabBaseProps<Value>,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <StyledTabBase ref={ref} {...props}>
      {children}
    </StyledTabBase>
  )
}

export const BasicTab = forwardRef(BasicTabImpl)
