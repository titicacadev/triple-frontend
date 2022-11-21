import styled from 'styled-components'
import { gray, white } from '@titicaca/color-palette'

import { TabBase, TabBaseProps } from './tab-base'

const StyledTabBase = styled(TabBase)`
  flex: 1;
  color: rgba(46, 46, 46, 0.3);
  border-radius: 2px;
  font-size: 14px;
  font-weight: bold;
  padding: 11px 0;

  &[aria-selected='true'] {
    color: ${gray};
    background-color: ${white};
  }
`

export const BasicTab = ({ children, ...props }: TabBaseProps) => {
  return <StyledTabBase {...props}>{children}</StyledTabBase>
}
