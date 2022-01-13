import {
  Container,
  LayeringMixinProps,
  layeringMixin,
} from '@titicaca/core-elements'
import styled from 'styled-components'

export const OverlayWrapper = styled(Container)<LayeringMixinProps>`
  width: 100%;
  position: absolute;
  ${layeringMixin(5)}
`
