import styled from 'styled-components'
import {
  Container,
  LayeringMixinProps,
  layeringMixin,
} from '@titicaca/core-elements'

export const DEFAULT_MAP_HEIGHT = 180

export const StickyMapContainer = styled(Container)<LayeringMixinProps>`
  ${layeringMixin(3)}
  background-color: #ffffff;
  position: sticky;
`
