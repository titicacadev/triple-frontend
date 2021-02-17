import * as React from 'react'
import styled, { css } from 'styled-components'
import { white, brightGray } from '@titicaca/color-palette'

enum MarketType {
  appStore = 'appStore',
  playStore = 'playStore',
}

const MIN_DESKTOP_WIDTH = 1142
const MAX_PHONE_WIDTH = 1141

const HeaderFrame = styled.header<{
  fixed?: boolean
  minWidth?: number
  mobileViewHeight?: number
  borderless?: boolean
}>`
  background-color: ${white};
  position: sticky;
  z-index: 1;
  ${({ fixed }) =>
    fixed &&
    css`
      top: 0;
    `};

  @media (min-width: ${MIN_DESKTOP_WIDTH}px) {
    height: 80px;
  }

  @media (max-width: ${MAX_PHONE_WIDTH}px) {
    height: ${({ mobileViewHeight }) => mobileViewHeight || 50}px;
  }

  ${({ borderless }) =>
    !borderless &&
    css`
      border-bottom: 1px solid ${brightGray};
    `}

  ${({ minWidth }) =>
    minWidth &&
    css`
      @media (max-width: ${minWidth - 1}px) {
        display: none;
      }
    `};
`

const Logo = styled.a`
  background-repeat: no-repeat;
  background-image: url(https://triple.guide/images/img-intro-logo-dark@2x.png);
  text-indent: -9999px;
  margin: 0;
  padding: 0;
  top: 50%;
  position: absolute;
  text-decoration: none;

  @media (min-width: ${MIN_DESKTOP_WIDTH}px) {
    left: 50px;
    width: 68px;
    height: 24px;
    background-size: cover;
    margin-top: -12px;
  }

  @media (max-width: ${MAX_PHONE_WIDTH}px) {
    left: 14px;
    width: 56px;
    height: 20px;
    background-size: cover;
    margin-top: -10px;
  }
`

const InventoryContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
`

const ExtraActionsContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;

  @media (min-width: ${MIN_DESKTOP_WIDTH}px) {
    padding-right: 50px;
  }

  @media (max-width: ${MAX_PHONE_WIDTH}px) {
    padding-right: 14px;
  }
`

const ExtraActionItem = styled.a`
  text-decoration: none;
  display: inline-block;
  color: rgba(58, 58, 58, 0.8);

  @media (min-width: ${MIN_DESKTOP_WIDTH}px) {
    line-height: 80px;
    font-size: 17px;
    margin: 0 0 0 34px;
    height: 80px;
  }

  @media (max-width: ${MAX_PHONE_WIDTH}px) {
    line-height: 50px;
    font-size: 14px;
    margin: 0 0 0 14px;
    height: 50px;
  }
`

const MarketLinksContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 142px;
  margin-top: -12px;
  height: 24px;
`

const MARKET_LINK_BUTTON_ICON_URLS: { [key in MarketType]: string } = {
  appStore: 'https://assets.triple.guide/images/btn-app-store-on@3x.png',
  playStore: 'https://assets.triple.guide/images/btn-play-store-on@3x.png',
}

const MarketLink = styled.a<{ marketType: MarketType }>`
  display: inline-block;
  background-repeat: no-repeat;
  background-size: 24px 24px;
  ${({ marketType }) =>
    `background-image: url(${MARKET_LINK_BUTTON_ICON_URLS[marketType]});`}
  width: 24px;
  height: 24px;
  margin: 0 5px 0 0;
  padding: 0;
`

export default function PublicHeader({
  href,
  playStoreUrl,
  appStoreUrl,
  children,
  fixed,
  minWidth,
  borderless = false,
  ...props
}: {
  href?: string
  playStoreUrl?: string
  appStoreUrl?: string
  fixed?: boolean
  minWidth?: number
  mobileViewHeight?: number
  borderless?: boolean
  children?: React.ReactNode
}) {
  return (
    <HeaderFrame
      fixed={fixed}
      minWidth={minWidth}
      borderless={borderless}
      {...props}
    >
      <Logo href={href || 'https://triple.guide'}>TRIPLE</Logo>
      <MarketLinksContainer>
        {playStoreUrl ? (
          <MarketLink marketType={MarketType.playStore} href={playStoreUrl} />
        ) : null}
        {appStoreUrl ? (
          <MarketLink marketType={MarketType.appStore} href={appStoreUrl} />
        ) : null}
      </MarketLinksContainer>
      {children}
    </HeaderFrame>
  )
}

PublicHeader.InventoryContainer = InventoryContainer
PublicHeader.ExtraActionsContainer = ExtraActionsContainer
PublicHeader.ExtraActionItem = ExtraActionItem
