import React from 'react'
import styled from 'styled-components'

const AppBannerFrame = styled.div`
  background-color: #ffffff;
  position: sticky;
  position: -webkit-sticky;
  height: 60px;
  border-bottom: 1px solid #efefef;
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

const ContentTitle = styled.h1`
  margin: 0 0 1px 0;
  padding: 0;
  font-size: 12px;
  font-weight: bold;
  color: #3a3a3a;
  height: 15px;
  line-height: 15px;
`

const ContentDescription = styled.div`
  margin: 0;
  padding: 0;
  font-size: 12px;
  color: rgba(46, 46, 46, 0.7);
  height: 15px;
  line-height: 15px;
`

const CallToAction = styled.a`
  box-sizing: border-box;
  position: absolute;
  right: 30px;
  top: 50%;
  margin-top: -15px;
  padding: 9px 15px 8px 15px;
  width: 82px;
  height: 30px;
  border-radius: 15px;
  line-height: 13px;
  font-size: 11px;
  font-weight: bold;
  color: #3a3a3a;
  background-color: #efefef;
`

export default function AppBanner({ title, description, href }) {
  return (
    <AppBannerFrame>
      <Logo />
      <ContentContainer>
        <ContentTitle>{title}</ContentTitle>
        <ContentDescription>{description}</ContentDescription>
      </ContentContainer>
      <CallToAction>앱에서 보기</CallToAction>
    </AppBannerFrame>
  )
}
