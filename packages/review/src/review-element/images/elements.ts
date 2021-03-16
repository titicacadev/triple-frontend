import styled, { css } from 'styled-components'

export const ImageElement = styled.img<{
  absolute?: boolean
  height?: number
  fullHeight?: boolean
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
  topMargin?: boolean
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

  @media (max-width: 500px) {
    gap: 5px;
  }

  @media (min-width: 499px) and (max-width: 768px) {
    gap: 6px;
  }

  @media (min-width: 767px) {
    column-gap: 10px;
    row-gap: 6px;
  }
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

export const FlexItemContainer = styled.div<{ flexShrink?: number }>`
  position: relative;
  flex-basis: 100%;

  ${({ flexShrink = 1 }) => css`
    flex-shrink: ${flexShrink};
  `}

  /* stylelint-disable-next-line selector-type-no-unknown */
  & > div:not(${SquareFrame}) {
    height: 100%;
  }
`
