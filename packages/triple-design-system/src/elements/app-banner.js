import React from 'react'
import styled, { css } from 'styled-components'
import Text from './text'

const AppBannerFrame = styled.div`
  background-color: #ffffff;
  border-bottom: 1px solid #efefef;
  height: 60px;
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
  background-size: 34px 34px;
  background-image: url(http://triple-web-assets-dev.s3-website-ap-northeast-1.amazonaws.com/images/app-download@2x.png);
  width: 34px;
  height: 34px;
  margin: 0;
  padding: 0;
  top: 50%;
  left: 20px;
  margin-top: -17px;
  position: absolute;
`

const ContentContainer = styled.div`
  top: 50%;
  left: 64px;
  margin-top: -15.5px;
  position: absolute;
  height: 31px;
`

const CallToAction = styled.a`
  box-sizing: border-box;
  position: absolute;
  right: 30px;
  top: 50%;
  margin-top: -15px;
  padding: 9px 15px 8px 15px;
  height: 30px;
  border-radius: 15px;
  line-height: 13px;
  font-size: 11px;
  font-weight: bold;
  color: #3a3a3a;
  background-color: #efefef;
  font-family: sans-serif;
  text-decoration: none;
`

export default function AppBanner({ title, description, href, ...props }) {
  return (
    <AppBannerFrame {...props}>
      <Logo />
      <ContentContainer>
        <Text
          bold
          size="mini"
          lineHeight="15px"
          color="gray"
          margin={{ bottom: 1 }}
        >
          {title}
        </Text>
        <Text size="mini" lineHeight="15px" color="gray" alpha={0.7}>
          {description}
        </Text>
      </ContentContainer>
      <CallToAction href={href}>앱에서 보기</CallToAction>
    </AppBannerFrame>
  )
}
