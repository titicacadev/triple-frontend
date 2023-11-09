import styled from 'styled-components'
import * as CSS from 'csstype'

import { GlobalSizes } from '../../commons'

const ROUND_SIZES: Partial<Record<GlobalSizes, number>> = {
  small: 40,
  medium: 60,
}

export const ImageCircular = styled.img<{
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
  background-color: var(--color-brightGray);
  object-fit: cover;
  float: ${({ floated }) => floated || 'none'};
`
