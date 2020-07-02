import styled, { css } from 'styled-components'
import { Text, Container, MarginPadding } from '@titicaca/core-elements'
import { white, white600, blue980 } from '@titicaca/color-palette'

export const MIN_DESKTOP_WIDTH = 1142
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

export const FloatingButton = styled.div<{
  visibility: boolean
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

  ${({ visibility }) => (visibility ? 'display: block;' : 'display: none;')}

  &.fade-exit {
    transform: translate3d(0, 0, 0);
  }

  &.fade-exit-active {
    transition: transform 300ms ease-out;
    transform: translate3d(
      0,
      calc(
        100% +
          ${({ fixed, margin }) =>
            margin ? `${margin.right || 0}px` : fixed ? '30px' : '0px'}
      ),
      0
    );
  }

  &.fade-exit-done {
    display: none;
  }
`

// ChatbotCTA
export const ChatBalloon = styled.div`
  position: relative;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.98);
  border-radius: 26px 26px 0 26px;
  padding: 30px 0 30px 30px;
  margin-right: 50px;
  box-sizing: border-box;
  min-height: 132px;
`

export const ChatbotAction = styled.a`
  display: inline-block;
  font-size: 13px;
  font-weight: bold;
  text-decoration: none;
  line-height: 16px;
  color: ${blue980};
  padding-right: 14px;
  background-size: 14px 14px;
  background-image: url(https://assets.triple.guide/images/ico-right-blue-arrow-s@3x.png);
  background-repeat: no-repeat;
  background-position: right 1px;
  margin-top: 10px;
`

export const CharbotCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  margin: 0;
  padding: 0;
  width: 24px;
  height: 24px;
  overflow: hidden;
  text-indent: -1000px;
  border-radius: 12px;
  box-sizing: border-box;
  background-color: transparent;
  background-image: url(https://assets.triple-dev.titicaca-corp.com/images/btn-gray-close-circle-s@3x.png);
  background-size: 24px 24px;
  background-position: left top;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`

export const ChatbotIcon = styled.a`
  position: absolute;
  z-index: 1;
  bottom: 0;
  right: 0;
  display: block;
  width: 40px;
  height: 40px;
  overflow: hidden;
  text-indent: -1000px;
  background-color: transparent;
  background-image: url(https://assets.triple-dev.titicaca-corp.com/images/ico-circle-triple-bi@3x.png);
  background-size: 40px 40px;
  background-position: left top;
  background-repeat: no-repeat;
`

export const ChatbotContainer = styled.div<{ visibility: string }>`
  position: fixed;
  bottom: 10px;
  left: 10px;
  right: 10px;

  @media (min-width: 768px) {
    bottom: 30px;
    left: 30px;
    right: 30px;
  }

  transform: translate3d(0, calc(100% + 10px), 0);

  &.fade-appear,
  &.fade-enter-done {
    transition: transform 300ms ease-in;
    transform: translate3d(0, 0, 0);
  }
  &.fade-exit {
    transform: translate3d(0, 0, 0);
  }

  &.fade-exit-active {
    transition: transform 300ms ease-out;
    transform: translate3d(0, calc(100% + 10px), 0);
  }

  &.fade-exit-done {
    display: none;
  }

  ${ChatBalloon} {
    ${({ visibility }) =>
      visibility === 'true'
        ? 'box-shadow: 0 30px 100px 0 rgba(0, 0, 0, 0.3);'
        : ''}
  }
`
