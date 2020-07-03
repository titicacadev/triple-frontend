import styled, { css } from 'styled-components'
import { Text, Container, MarginPadding } from '@titicaca/core-elements'
import { white, white600, blue980, gray500 } from '@titicaca/color-palette'

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.07);
  background-color: ${gray500};
  z-index: 10;
`

export const BottomFixedContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 11;

  > * {
    margin: 0 auto;
  }
`

const CONTENT_MIN_WIDTH = 320
const CONTENT_MAX_WIDTH = 760
export const ImageBannerWrapper = styled.div`
  box-sizing: border-box;
  max-width: ${CONTENT_MAX_WIDTH}px;
  min-width: ${CONTENT_MIN_WIDTH}px;
  height: 230px;
  padding: 0 20px 20px 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.07);
  background-color: #0179ff;
`
export const ImageWrapper = styled.div`
  margin: 0 auto;
  height: 130px;
`

export const BannerImage = styled.img`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  display: block;
  width: 320px;
  height: 130px;
`

export const InstallLink = styled.a`
  display: block;
  box-sizing: border-box;
  margin-top: 5px;
  margin-bottom: 16px;
  width: 100%;
  height: 44px;
  line-height: 23px;
  border-radius: 25px;
  padding: 10px 0 11px 0;
  background-color: white;
  color: black;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
`

export const DismissButton = styled.button`
  display: block;
  margin: 0 auto;
  border: 0;
  background-color: transparent;
  opacity: 0.6;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  color: white;
  text-decoration: underline;
  outline: none;
  cursor: pointer;
`

export const TextBannerWrapper = styled.a`
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 54px;
  line-height: 17px;
  padding: 19px 0 18px 0;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.07);
  background-color: #0179ff;
  color: white;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
`

export const DownloadIcon = styled.img`
  margin-left: 6px;
  width: 12px;
  height: 13px;
  vertical-align: middle;
  transform: translateY(-1px); /* HACK: 아래로 가있는 이미지 위로 끌어 올림 */
`

const MIN_DESKTOP_WIDTH = 1142
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
  visibility: 1 | 0
  fixed?: 1 | 0
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

export const ChatbotContainer = styled.div<{ visibility: 1 | 0 }>`
  position: fixed;
  bottom: 10px;
  left: 10px;
  right: 10px;

  transform: translate3d(0, calc(100% + 10px), 0);

  ${ChatBalloon} {
    ${({ visibility }) =>
      visibility ? 'box-shadow: 0 30px 100px 0 rgba(0, 0, 0, 0.3);' : ''}
  }

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

  @media (min-width: 768px) {
    bottom: 30px;
    left: 30px;
    right: 30px;

    transform: translate3d(0, calc(100% + 30px), 0);

    &.fade-exit-active {
      transition: transform 300ms ease-out;
      transform: translate3d(0, calc(100% + 30px), 0);
    }
  }
`
