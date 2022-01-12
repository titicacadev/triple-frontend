import styled from 'styled-components'
import {
  Container,
  LayeringMixinProps,
  layeringMixin,
} from '@titicaca/core-elements'

export const StickyMapContainer = styled(Container)<LayeringMixinProps>`
  ${layeringMixin(3)}
  position: sticky;
`
