import styled from 'styled-components'
import { marginMixin, MarginPadding } from '@titicaca/tds-ui'

const FluidTable = styled.table<{ margin?: MarginPadding }>`
  width: 100%;
  border-collapse: collapse;

  ${marginMixin}
`

export default FluidTable
