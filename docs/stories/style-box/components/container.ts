import { margin, padding, ellipsis, Styles } from '@titicaca/style-box'
import styled from 'styled-components'

export default styled.div<Styles>`
  ${margin()}
  ${padding()}
  ${ellipsis()}
`
