import React, { FC } from 'react'
import styled from 'styled-components'

interface TextBannerProps {
  message: string
  installUrl: string
}

const TextBannerWrapper = styled.a`
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 54px;
  line-height: 17px;
  padding: 19px 0 18px 0;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.07);
  background-color: #0179ff;
  color: white;
  font-family: SFUIText;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
`

const DownloadIcon = styled.img`
  margin-left: 6px;
  width: 12px;
  height: 13px;
  vertical-align: middle;
  transform: translateY(-1px); /* HACK: 아래로 가있는 이미지 위로 끌어 올림 */
`

const TextBanner: FC<TextBannerProps> = ({ message, installUrl }) => {
  return (
    <TextBannerWrapper href={installUrl}>
      {message}
      <DownloadIcon src="https://assets.triple-dev.titicaca-corp.com/images/m-banner-top-dw@3x.png" />
    </TextBannerWrapper>
  )
}

export default TextBanner
