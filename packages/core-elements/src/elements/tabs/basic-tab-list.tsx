import { brightGray } from '@titicaca/color-palette'
import styled from 'styled-components'

import { TabListBase, TabListBaseProps } from './tab-list-base'

const StyledTabListBase = styled(TabListBase)`
  display: flex;
  background-color: ${brightGray};
  border-radius: 4px;
  padding: 2px;
`

export const BasicTabList = ({ children, ...props }: TabListBaseProps) => {
  return <StyledTabListBase {...props}>{children}</StyledTabListBase>
}
