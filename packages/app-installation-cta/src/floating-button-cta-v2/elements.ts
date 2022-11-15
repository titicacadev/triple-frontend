import {
  Container,
  FlexBox,
  MarginPadding,
  layeringMixin,
  LayeringMixinProps,
} from '@titicaca/core-elements'
import styled, { css } from 'styled-components'

interface FloatingButtonProps {
  visibility: 1 | 0
  fixed?: 1 | 0
  margin?: MarginPadding
}

const MIN_DESKTOP_WIDTH = 1142

const inactiveFloatingButtonStyle = css<{
  fixed?: 1 | 0
  margin?: MarginPadding
}>`
  transform: translate3d(
    0,
    calc(
      100% +
        ${({ fixed, margin }) =>
          margin ? `${margin.right || 0}px` : fixed ? '30px' : '0px'}
    ),
    0
  );
`

const activeFloatingButtonStyle = `
  transform: translate3d(0, 0, 0);
`

const floatingButtonTransitionConfig = `
  transition: transform 300ms ease-out;
`

export const FloatingButtonContainer = styled(Container)<
  FloatingButtonProps & LayeringMixinProps
>`
  background-color: rgba(38, 206, 194, 1);

  ${layeringMixin(1)}

  @media (min-width: ${MIN_DESKTOP_WIDTH}px) {
    display: none;
  }

  ${({ fixed }) =>
    fixed &&
    css`
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    `};

  ${({ margin }) =>
    margin &&
    css`
      margin-top: ${margin.top || 0}px;
      margin-bottom: ${margin.bottom || 0}px;
      margin-left: ${margin.left || 0}px;
      margin-right: ${margin.right || 0}px;
    `};

  ${({ visibility }) => (visibility ? 'display: block;' : 'display: none;')}

  &.floating-button-slide-exit {
    ${activeFloatingButtonStyle}
  }

  &.floating-button-slide-exit-active {
    ${inactiveFloatingButtonStyle}
    ${floatingButtonTransitionConfig}
  }

  &.floating-button-slide-exit-done {
    ${inactiveFloatingButtonStyle}
    display: none;
  }
`

export const ContentContainer = styled(FlexBox).attrs({
  flex: true,
  centered: true,
  maxWidth: 768,
  padding: { top: 24, bottom: 24, left: 20, right: 20 },
  gap: 11,
  position: 'relative',
})`
  overflow: hidden;
`

export const InstallAnchor = styled.a`
  display: inline-block;
  text-decoration: none;
  margin-top: 4px;

  &:visited,
  &:hover,
  &:active {
    color: inherit;
  }
`

export const GoAppButton = styled.img`
  margin-left: 4px;
  vertical-align: middle;
  opacity: 0.8;
`

export const CloseButton = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`
