import styled from 'styled-components'

import { TabListBase, TabListBaseProps } from './tab-list-base'

const StyledTabListBase = styled(TabListBase)`
  display: flex;
  background-color: var(--color-brightGray);
  border-radius: 4px;
  padding: 2px;
`

export const BasicTabList = ({ children, ...props }: TabListBaseProps) => {
  return <StyledTabListBase {...props}>{children}</StyledTabListBase>
}
