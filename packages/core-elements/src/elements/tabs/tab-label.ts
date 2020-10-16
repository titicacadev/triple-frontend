import styled, { css } from 'styled-components'

import { paddingMixin } from '../../mixins'
import { MarginPadding } from '../../commons'

const TabLabel = styled.div<{
  active?: boolean
  scroll?: boolean
  padding?: MarginPadding
}>`
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;

  ${({ scroll }) =>
    !scroll &&
    css`
      display: table-cell;
      padding: 11px 0;
    `};

  ${paddingMixin}
`

export default TabLabel
