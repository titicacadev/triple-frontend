import React from 'react'
import styled, { css } from 'styled-components'

const HeaderFrame = styled.div`
  background-color: #ffffff;
  height: 80px;
  border-bottom: 1px solid #efefef;
  ${({ fixed }) =>
    fixed
      ? css`
          position: fixed;
        `
      : css`
          position: sticky;
          position: -webkit-sticky;
        `};
`

const Logo = styled.h1`
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
  appStore:
    'http://triple-web-assets-dev.s3-website-ap-northeast-1.amazonaws.com/images/btn-app-store-on@2x.png',
  playStore:
    'http://triple-web-assets-dev.s3-website-ap-northeast-1.amazonaws.com/images/btn-play-store-on@2x.png',
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
  playStoreUrl,
  appStoreUrl,
  children,
  ...props
}) {
  return (
    <HeaderFrame {...props}>
      <Logo>TRIPLE</Logo>
      <MarketLinksContainer>
        <MarketLink marketType="playStore" href={playStoreUrl} />
        <MarketLink marketType="appStore" href={appStoreUrl} />
      </MarketLinksContainer>
      <InventoryContainer>{children}</InventoryContainer>
    </HeaderFrame>
  )
}
