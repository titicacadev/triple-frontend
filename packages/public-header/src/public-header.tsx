import * as React from 'react'
import styled, { css } from 'styled-components'
import { white, brightGray, gray100, gray800 } from '@titicaca/color-palette'
import { useUserAgentContext } from '@titicaca/react-contexts'

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

const AnimationWrapper = styled.div<{ visible: boolean }>`
  transition: height ease ${TRANSITION_TIME}ms;
  overflow: hidden;
  ${({ visible }) =>
    css`
      height: ${visible ? '51px' : '0px'};
    `}

  @media (min-width: ${MIN_DESKTOP_WIDTH}px) {
    ${({ visible }) =>
      css`
        height: ${visible ? '81px' : '0px'};
      `}
  }

  > header {
    /**
     * HACK: header가 사라질 때 그래픽이 깨지는 문제 때문에 position을 static으로 초기화합니다.
     * 참고: https://github.com/titicacadev/triple-hotels-web/pull/2346#issuecomment-871214559
     * HACK: header의 자식이 absolute position이 적용되어있어 쌓임 맥락이 필요합니다.
     * 그래서 position 대신 transform으로 쌓임 맥락을 만듭니다.
     */
    position: static;
    transform: translate(0);
  }
`

const HeaderFrame = styled.header<{ fixed?: boolean }>`
  background-color: ${white};
  display: flex;
  align-items: center;
  position: sticky;
  border-bottom: 1px solid ${brightGray};
  padding: 0 6px;
  height: ${HEADER_MOBILE_HEIGHT}px;
  z-index: 1;
  ${({ fixed }) =>
    fixed &&
    css`
      top: 0;
    `};

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
  fixed?: boolean
}

export function PublicHeader({
  category,
  deeplinkPath,
  disableAutoHide,
  fixed,
}: PublicHeaderProps) {
  const { app } = useUserAgentContext()
  const visible = useAutoHide(disableAutoHide)
  const generateDeeplink = useDeeplinkGenerator()

  if (app) {
    return null
  }

  return (
    <AnimationWrapper visible={visible}>
      <HeaderFrame fixed={fixed}>
        <Logo
          href={getCategoryHref(category)}
          title={getCategoryTitle(category)}
        >
          <LogoImage
            alt=""
            src="https://assets.triple.guide/images/img_intro_logo_dark.svg"
          />
          {category && (
            <LogoCategoryImage alt="" {...getCategoryImageProps(category)} />
          )}
        </Logo>

        <ExtraActionsContainer>
          <ExtraActionItem href="/my-bookings">내 예약</ExtraActionItem>
          {deeplinkPath && (
            <>
              <ExtraActionSeperator />
              <ExtraActionItem href={generateDeeplink({ path: deeplinkPath })}>
                앱에서 보기
              </ExtraActionItem>
            </>
          )}
        </ExtraActionsContainer>
      </HeaderFrame>
    </AnimationWrapper>
  )
}
