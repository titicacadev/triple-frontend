import styled from 'styled-components'
import { getColor } from '@titicaca/color-palette'
import * as CSS from 'csstype'

import { GlobalSizes } from '../../commons'

const ROUND_SIZES: Partial<Record<GlobalSizes, number>> = {
  small: 40,
  medium: 60,
}

const ImageCircular = styled.img<{
  size?: GlobalSizes
  floated?: CSS.Property.Float
  width?: number
}>`
  width: ${({ size, width }) =>
    (size && ROUND_SIZES[size]) || width || ROUND_SIZES.small}px;
  height: ${({ size, width }) =>
    (size && ROUND_SIZES[size]) || width || ROUND_SIZES.small}px;
  border-radius: ${({ size, width }) =>
    ((size && ROUND_SIZES[size]) || width || (ROUND_SIZES.small as number)) /
    2}px;
  background-color: rgba(${getColor('brightGray')});
  object-fit: cover;

  float: ${({ floated }) => floated || 'none'};
`
export default ImageCircular
