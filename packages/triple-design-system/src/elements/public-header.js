import React from 'react'
import styled, { css } from 'styled-components'

const HeaderFrame = styled.div`
  background-color: #ffffff;
  height: 80px;
  border-bottom: 1px solid #efefef;
  position: sticky;
  position: -webkit-sticky;
  z-index: 1;
  ${({ fixed }) =>
    fixed &&
    css`
      top: 0;
    `};
`

const Logo = styled.a`
  background-repeat: no-repeat;
  background-size: 68px 24px;
  background-image: url(https://triple.guide/images/img-intro-logo-dark@2x.png);
  text-indent: -9999px;
  width: 68px;
  height: 24px;
  margin: 0;
  padding: 0;
  top: 50%;
  left: 50px;
  margin-top: -12px;
  position: absolute;
  text-decoration: none;
`

const InventoryContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
`

const MarketLinksContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 142px;
  margin-top: -12px;
  height: 24px;
`

const MARKET_LINK_BUTTON_ICON_URLS = {
  appStore: 'https://assets.triple.guide/images/btn-app-store-on@2x.png',
  playStore: 'https://assets.triple.guide/images/btn-play-store-on@2x.png',
}

const MarketLink = styled.a`
  display: inline-block;
  background-repeat: no-repeat;
  background-size: 24px 24px;
  background-image: url(${({ marketType }) =>
    MARKET_LINK_BUTTON_ICON_URLS[marketType]});
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
  ...props
}) {
  return (
    <HeaderFrame {...props}>
      <Logo href={href || 'https://triple.guide'}>TRIPLE</Logo>
      <MarketLinksContainer>
        <MarketLink marketType="playStore" href={playStoreUrl} />
        <MarketLink marketType="appStore" href={appStoreUrl} />
      </MarketLinksContainer>
      <InventoryContainer>{children}</InventoryContainer>
    </HeaderFrame>
  )
}
