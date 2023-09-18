import styled from 'styled-components'

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

export const BasicTab = <Value extends number | string | symbol>({
  children,
  ...props
}: TabBaseProps<Value>) => {
  return <StyledTabBase {...props}>{children}</StyledTabBase>
}
