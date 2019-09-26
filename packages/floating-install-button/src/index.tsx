import * as React from 'react'
import styled from 'styled-components'
import { GetGlobalColor, Text, Container } from '@titicaca/core-elements'

declare var window: any

const MIN_DESKTOP_WIDTH = 1142
const CLOSE_INSTALL_BUTTON_KEY = 'close_install_button'

const FloatingButton = styled.div`
  position: fixed;
  height: 84px;
  border-radius: 42px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.07);
  background-color: rgba(${GetGlobalColor('blue')}, 0.98);
  bottom: 0;
  left: 10px;
  right: 10px;
  margin-bottom: 30px;
  overflow: hidden;

  @media (min-width: ${MIN_DESKTOP_WIDTH}px) {
    display: none;
  }
`

const InstallDescription = styled(Text)`
  height: 21px;
  font-size: 18px;
  font-weight: bold;
  margin: 23px 0px 0px 32px;
  color: rgb(${GetGlobalColor('white')});
`

const InstallAnchor = styled.a`
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

export default function FloatingInstallButton({
  appInstallLink,
  isPublic,
  trackEvent,
  trackEventParams,
}: {
  appInstallLink?: string
  isPublic?: boolean
  trackEvent?: any
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

  return buttonVisibility && isPublic ? (
    <FloatingButton>
      <Container floated="left">
        <InstallDescription>
          <InstallAnchor href={appInstallLink} onClick={onSelect}>
            <Container floated="left">트리플 앱 설치하기</Container>
            <GoAppButton src="https://assets.triple.guide/images/ico-arrow@4x.png" />
          </InstallAnchor>
        </InstallDescription>
        <Description>가이드북, 일정짜기, 길찾기, 맛집</Description>
      </Container>
      <Container floated="right" onClick={onClose}>
        <CloseButton src="https://assets.triple.guide/images/btn-closebanner@3x.png" />
      </Container>
    </FloatingButton>
  ) : null
}
