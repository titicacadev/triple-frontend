import styled, { css } from 'styled-components'
import * as CSS from 'csstype'
import { getColor } from '@titicaca/color-palette'

import { MarginPadding, FrameRatioAndSizes } from '../../commons'
import { marginMixin } from '../../mixins'

export interface ImageFrameBaseProps {
  floated?: CSS.Property.Float
  margin?: MarginPadding
  borderRadius?: number
  asPlaceholder?: boolean
  src?: string
  frame?: FrameRatioAndSizes
}

const ImageFrameBase = styled.div<ImageFrameBaseProps>`
  font-size: 0;
  position: relative;
  float: ${({ floated }) => floated || 'none'};

  ${({ frame }) =>
    (!frame || (frame && frame !== 'original')) &&
    css`
      overflow: hidden;
    `};

  ${marginMixin}

  border-radius: ${({ borderRadius }) =>
    borderRadius === 0 ? 0 : borderRadius || 6}px;

  ${({ asPlaceholder }) =>
    asPlaceholder
      ? css<{ src?: string }>`
          background-color: rgba(${getColor('brightGray')});
          background-repeat: no-repeat;
          background-position: center;
          background-size: 40px 40px;
          background-image: url(${({ src }) => src});
        `
      : css`
          background-color: #f5f5f5;
        `};
`

export default ImageFrameBase
