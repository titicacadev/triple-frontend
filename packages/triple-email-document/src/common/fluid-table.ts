import styled from 'styled-components'
import { marginMixin, MarginPadding } from '@titicaca/core-elements'

const FluidTable = styled.table<{ margin?: MarginPadding }>`
  width: 100%;
  border-collapse: collapse;

  ${marginMixin}
`

export default FluidTable
