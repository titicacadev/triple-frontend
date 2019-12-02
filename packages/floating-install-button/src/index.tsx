import * as React from 'react'
import styled, { css } from 'styled-components'
import {
  GetGlobalColor,
  Text,
  Container,
  MarginPadding,
} from '@titicaca/core-elements'

declare var window: any

const MIN_DESKTOP_WIDTH = 1142
const CLOSE_INSTALL_BUTTON_KEY = 'close_install_button'
const DEFAULT_DESCRIPTION_TEXT = '가이드북, 일정짜기, 길찾기, 맛집'

const FloatingButton = styled.div<{ fixed?: boolean; margin?: MarginPadding }>`
  height: 84px;
  border-radius: 42px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.07);
  background-color: rgba(${GetGlobalColor('blue')}, 0.98);
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

const InstallDescription = styled(Text)`
  height: 21px;
  font-size: 18px;
  font-weight: bold;
  padding: 23px 0px 0px 32px;
  color: rgb(${GetGlobalColor('white')});
`

const InstallAnchor = styled.a`
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

const Description = styled(Text)`
  width: 200px;
  height: 15px;
  font-size: 12px;
  font-weight: 500;
  color: rgba(${GetGlobalColor('white')}, 0.6);
  margin: 3px 0px 22px 32px;
`

const GoAppButton = styled.img`
  width: 20px;
  height: 20px;
`

const CloseButton = styled.img`
  width: 30px;
  height: 30px;
  margin: 27px 16px 27px 0;
`

const LeftContainer = styled(Container)`
  float: left;
  width: 100%;
  height: 100%;
  margin-right: -46px;
  padding-right: 46px;
  box-sizing: border-box;
`

const RightContainer = styled(Container)`
  float: right;
  width: 46px;
`

export default function FloatingInstallButton({
  fixed,
  appInstallLink,
  description = DEFAULT_DESCRIPTION_TEXT,
  trackEvent,
  margin,
  trackEventParams,
}: {
  fixed?: boolean
  appInstallLink?: string
  description?: string
  trackEvent?: any
  margin?: MarginPadding
  trackEventParams?: {
    onShow?: any
    onSelect?: any
    onClose?: any
  }
}) {
  const [buttonVisibility, setButtonVisibility] = React.useState(false)

  const sendTrackEventRequest = React.useCallback(
    (param) => {
      trackEvent && param && trackEvent(param)
    },
    [trackEvent],
  )

  React.useEffect(() => {
    const visitedPages = window.sessionStorage.getItem(CLOSE_INSTALL_BUTTON_KEY)
    if (!visitedPages && !buttonVisibility) {
      setButtonVisibility(true)
      sendTrackEventRequest(trackEventParams && trackEventParams.onShow)
    }
  }, [buttonVisibility, sendTrackEventRequest, trackEventParams])

  const onClose = () => {
    setButtonVisibility(false)
    window.sessionStorage.setItem(CLOSE_INSTALL_BUTTON_KEY, 'true')
    sendTrackEventRequest(trackEventParams && trackEventParams.onClose)
  }

  const onSelect = () => {
    sendTrackEventRequest(trackEventParams && trackEventParams.onSelect)
    return true
  }

  return buttonVisibility ? (
    <FloatingButton fixed={fixed} margin={margin}>
      <LeftContainer>
        <InstallAnchor href={appInstallLink} onClick={onSelect}>
          <InstallDescription>
            <Text floated="left" color="white">
              트리플 앱 설치하기
            </Text>
            <GoAppButton src="https://assets.triple.guide/images/ico-arrow@4x.png" />
          </InstallDescription>
          <Description>{description}</Description>
        </InstallAnchor>
      </LeftContainer>
      <RightContainer onClick={onClose}>
        <CloseButton src="https://assets.triple.guide/images/btn-closebanner@3x.png" />
      </RightContainer>
    </FloatingButton>
  ) : null
}
