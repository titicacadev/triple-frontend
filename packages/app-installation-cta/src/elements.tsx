import styled, { css } from 'styled-components'
import { Text, Container, MarginPadding } from '@titicaca/core-elements'
import { white, white600, blue980 } from '@titicaca/color-palette'

export const MIN_DESKTOP_WIDTH = 1142
export const FloatingButton = styled.div<{
  fixed?: boolean
  margin?: MarginPadding
}>`
  height: 84px;
  border-radius: 42px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.07);
  background-color: ${blue980};
  overflow: hidden;

  @media (min-width: ${MIN_DESKTOP_WIDTH}px) {
    display: none;
  }

  ${({ fixed }) =>
    fixed &&
    css`
      position: fixed;
      bottom: 0;
      left: 10px;
      right: 10px;
      margin-bottom: 30px;
    `};

  ${({ margin }) =>
    margin &&
    css`
      margin-top: ${margin.top || 0}px;
      margin-bottom: ${margin.bottom || 0}px;
      margin-left: ${margin.left || 0}px;
      margin-right: ${margin.right || 0}px;
    `};
`

export const InstallDescription = styled(Text)`
  height: 21px;
  font-size: 18px;
  font-weight: bold;
  padding: 23px 0px 0px 32px;
  color: ${white};
`

export const InstallAnchor = styled.a`
  width: 100%;
  height: 100%;
  display: block;
  text-decoration: none;
  &:visited,
  &:hover,
  &:active {
    color: inherit;
  }
`

export const Description = styled(Text)`
  width: 200px;
  height: 15px;
  font-size: 12px;
  font-weight: 500;
  color: ${white600};
  margin: 3px 0px 22px 32px;
`

export const GoAppButton = styled.img`
  width: 20px;
  height: 20px;
`

export const CloseButton = styled.img`
  width: 30px;
  height: 30px;
  margin: 27px 16px 27px 0;
`

export const LeftContainer = styled(Container)`
  float: left;
  width: 100%;
  height: 100%;
  margin-right: -46px;
  padding-right: 46px;
  box-sizing: border-box;
`

export const RightContainer = styled(Container)`
  float: right;
  width: 46px;
`
