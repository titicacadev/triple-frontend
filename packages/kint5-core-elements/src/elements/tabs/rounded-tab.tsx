import styled from 'styled-components'

import { TabBase, TabBaseProps } from './tab-base'

const StyledTabBase = styled(TabBase)`
  flex: none;
  padding: 8px 14px;
  border: 1px solid var(--color-gray100);
  border-radius: 100px;
  background: var(--color-white);
  font-size: 13px;
  font-weight: bold;
  line-height: 16px;
  color: var(--color-gray300);

  &[aria-selected='true'] {
    color: var(--color-white);
    background: var(--color-blue);
    border: 1px solid var(--color-blue);
  }
`

export const RoundedTab = <Value extends number | string | symbol>({
  children,
  ...props
}: TabBaseProps<Value>) => {
  return <StyledTabBase {...props}>{children}</StyledTabBase>
}
