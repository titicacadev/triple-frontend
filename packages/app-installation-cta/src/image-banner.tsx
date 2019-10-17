import React, { FC } from 'react'
import styled from 'styled-components'

interface ImageBannerProps {
  imgUrl: string
  installUrl: string
  onDismiss: () => void
}

const CONTENT_MIN_WIDTH = 320
const CONTNET_MAX_WIDTH = 760

const ImageBannerWrapper = styled.div`
  box-sizing: border-box;
  max-width: ${CONTNET_MAX_WIDTH}px;
  min-width: ${CONTENT_MIN_WIDTH}px;
  height: 230px;
  padding: 0 20px 20px 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.07);
  background-color: #0179ff;
`
const ImageWrapper = styled.div`
  margin: 0 auto;
  height: 130px;
`

const BannerImage = styled.img`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
  width: 320px;
  height: 130px;
`

const InstallLink = styled.a`
  display: block;
  box-sizing: border-box;
  margin-top: 5px;
  margin-bottom: 16px;
  width: 100%;
  height: 44px;
  line-height: 23px;
  border-radius: 25px;
  padding: 10px 0 11px 0;
  background-color: white;
  color: black;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
`

const DismissButton = styled.button`
  display: block;
  margin: 0 auto;
  border: 0;
  background-color: transparent;
  opacity: 0.6;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  color: white;
  text-decoration: underline;
  outline: none;
  cursor: pointer;
`

const ImageBanner: FC<ImageBannerProps> = ({
  imgUrl,
  installUrl,
  onDismiss,
}) => {
  return (
    <ImageBannerWrapper>
      <ImageWrapper>
        <BannerImage src={imgUrl} />
      </ImageWrapper>

      <InstallLink href={installUrl}>👋🏻 손쉽게 앱 설치하기</InstallLink>

      <DismissButton onClick={onDismiss}>
        아깝지만 나중에 받을게요
      </DismissButton>
    </ImageBannerWrapper>
  )
}

export default ImageBanner
