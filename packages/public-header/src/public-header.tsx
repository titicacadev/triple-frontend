import * as React from 'react'
import styled from 'styled-components'
import { white, brightGray, gray100, gray800 } from '@titicaca/color-palette'
import {
  useEventTrackerWithMetadata,
  useUserAgentContext,
} from '@titicaca/react-contexts'

import {
  HEADER_DESKTOP_HEIGHT,
  HEADER_MOBILE_HEIGHT,
  MIN_DESKTOP_WIDTH,
  TRANSITION_TIME,
} from './constants'
import type { Category } from './types'
import {
  getCategoryHref,
  getCategoryImageProps,
  getCategoryTitle,
} from './categories'
import { useAutoHide } from './useAutoHide'
import { useDeeplinkGenerator } from './useDeeplinkGenerator'

const Wrapper = styled.div<{ visible: boolean }>`
  transition: height ease ${TRANSITION_TIME}ms;
  overflow: hidden;
  top: 0;
  height: ${({ visible }) => (visible ? `${HEADER_MOBILE_HEIGHT}px` : '0px')};

  @media (min-width: ${MIN_DESKTOP_WIDTH}px) {
    height: ${({ visible }) =>
      visible ? `${HEADER_DESKTOP_HEIGHT}px` : '0px'};
  }
`

const HeaderFrame = styled.div`
  background-color: ${white};
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${brightGray};
  padding: 0 6px;
  height: ${HEADER_MOBILE_HEIGHT}px;
  box-sizing: border-box;

  @media (min-width: ${MIN_DESKTOP_WIDTH}px) {
    height: ${HEADER_DESKTOP_HEIGHT}px;
    padding: 0 42px;
  }
`

const Logo = styled.a`
  margin: 0;
  padding: 10px 8px;
  text-decoration: none;
  display: flex;
`

const LogoImage = styled.img`
  display: block;
  width: 57px;
  height: 20px;

  @media (min-width: ${MIN_DESKTOP_WIDTH}px) {
    width: 68px;
    height: 24px;
  }
`

const LogoCategoryImage = styled.img`
  display: block;
  margin-left: 2px;
  width: auto;
  height: 20px;

  @media (min-width: ${MIN_DESKTOP_WIDTH}px) {
    height: 24px;
  }
`

const ExtraActionsContainer = styled.div`
  margin-left: auto;
`

const ExtraActionItem = styled.a`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  color: ${gray800};
  font-size: 14px;
  padding: 10px 8px;

  @media (min-width: ${MIN_DESKTOP_WIDTH}px) {
    font-size: 17px;
    padding: 10px 14px;
  }
`

const ExtraActionSeperator = styled.div`
  display: inline-block;
  width: 1px;
  margin: 0 2px;
  height: 10px;
  background-color: ${gray100};

  @media (min-width: ${MIN_DESKTOP_WIDTH}px) {
    height: 14px;
  }
`

export interface PublicHeaderProps {
  category?: Category
  deeplinkPath?: string
  disableAutoHide?: boolean
}

export function PublicHeader({
  category,
  deeplinkPath,
  disableAutoHide,
}: PublicHeaderProps) {
  const { app } = useUserAgentContext()
  const trackEventWithMetadata = useEventTrackerWithMetadata()
  const visible = useAutoHide(disableAutoHide)
  const generateDeeplink = useDeeplinkGenerator()

  if (app) {
    return null
  }

  return (
    <Wrapper visible={visible}>
      <HeaderFrame>
        <Logo
          href={getCategoryHref(category)}
          title={getCategoryTitle(category)}
        >
          <LogoImage
            alt="Triple"
            src="https://assets.triple.guide/images/img_intro_logo_dark.svg"
          />
          {category && (
            <LogoCategoryImage {...getCategoryImageProps(category)} />
          )}
        </Logo>

        <ExtraActionsContainer>
          <ExtraActionItem href="/my-bookings">내 예약</ExtraActionItem>
          {deeplinkPath && (
            <>
              <ExtraActionSeperator />
              <ExtraActionItem
                href={generateDeeplink({ path: deeplinkPath })}
                onClick={() =>
                  trackEventWithMetadata({
                    ga: ['헤더_설치유도_선택', '앱에서 보기'],
                    pixel: {
                      action: '헤더_설치유도_선택',
                    },
                  })
                }
              >
                앱에서 보기
              </ExtraActionItem>
            </>
          )}
        </ExtraActionsContainer>
      </HeaderFrame>
    </Wrapper>
  )
}
