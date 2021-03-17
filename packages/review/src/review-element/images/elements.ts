import styled, { css } from 'styled-components'
import { marginMixin } from '@titicaca/core-elements'
import { MarginPadding } from '@titicaca/style-box'

export const ImageElement = styled.img<{
  absolute?: boolean
  height?: number
  fullHeight?: boolean
  margin?: MarginPadding
}>`
  ${({ absolute }) =>
    absolute &&
    css`
      position: absolute;
      top: 0;
    `}

  ${({ fullHeight }) =>
    fullHeight &&
    css`
      height: 100%;
    `}

  ${({ height }) =>
    height &&
    css`
      height: ${height}px;
    `}

  border-radius: 4px;
  width: 100%;
  object-fit: cover;

  ${marginMixin}
`

export const SquareFrame = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  height: 0 !important;
`

export const ImagesContainer = styled.div<{
  flexDirection: 'column' | 'row'
  height?: number
  margin?: MarginPadding
}>`
  display: flex;
  justify-content: space-between;
  ${({ flexDirection }) => css`
    flex-direction: ${flexDirection};
  `}
  ${({ height }) =>
    height &&
    css`
      height: ${height}px;
    `}

  ${marginMixin}
`

export const Dimmer = styled.table`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-gray500);
  border-radius: 4px;
  z-index: 1;

  & > td {
    vertical-align: middle;
  }
`

export const FlexItemContainer = styled.div<{
  flexShrink?: number
  margin?: MarginPadding
}>`
  position: relative;
  flex-basis: 100%;

  ${({ flexShrink = 1 }) => css`
    flex-shrink: ${flexShrink};
  `}

  /* stylelint-disable-next-line selector-type-no-unknown */
  & > div:not(${SquareFrame}) {
    height: 100%;
  }

  ${marginMixin}
`
