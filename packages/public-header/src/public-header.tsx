import * as React from 'react'
import styled, { css } from 'styled-components'
import { white, brightGray, gray100, gray800 } from '@titicaca/color-palette'

import { MIN_DESKTOP_WIDTH } from './constants'
import type { Category } from './types'
import {
  getCategoryHref,
  getCategoryImageProps,
  getCategoryTitle,
} from './categories'

const HeaderFrame = styled.header<{ fixed?: boolean }>`
  background-color: ${white};
  display: flex;
  align-items: center;
  position: sticky;
  border-bottom: 1px solid ${brightGray};
  padding: 0 6px;
  height: 50px;
  z-index: 1;
  ${({ fixed }) =>
    fixed &&
    css`
      top: 0;
    `};

  @media (min-width: ${MIN_DESKTOP_WIDTH}px) {
    height: 80px;
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
  fixed?: boolean
  deeplinkHref?: string
  category?: Category
}

export function PublicHeader({
  fixed,
  deeplinkHref,
  category,
  ...props
}: PublicHeaderProps) {
  return (
    <HeaderFrame fixed={fixed} {...props}>
      <Logo href={getCategoryHref(category)} title={getCategoryTitle(category)}>
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
        {deeplinkHref && (
          <>
            <ExtraActionSeperator />
            <ExtraActionItem href={deeplinkHref}>앱에서 보기</ExtraActionItem>
          </>
        )}
      </ExtraActionsContainer>
    </HeaderFrame>
  )
}
