import React, { useMemo, PropsWithChildren } from 'react'
import styled, { keyframes } from 'styled-components'

import Container from '../container'

const marquee = keyframes`
  0% {
    transform: translateX(0);
 }
 100% {
    transform: translateX(-100%);
 }
`

const swap = keyframes`
    0%, 50% {
      left: 0%;
    }
    50.01%,
    100% {
      left: 100%;
  }
`
const RollingSpinnerFrame = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
`

const RollingSpinnerContainer = styled.div<{ size: number }>`
  position: absolute;
  width: 100%;
  top: 50%;
  overflow: visible;
  text-align: center;
  box-sizing: border-box;

  ${({ size }) => `
    transform: translateY(calc(-50% - ${size / 2}px));
  `}
`

const TrackContainer = styled.div`
  position: relative;
  white-space: nowrap;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: -3px;
    width: 55px;
    height: 40px;
    z-index: 1;
  }
  &:before {
    left: 0;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.99) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }
  &:after {
    right: 0;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.99) 100%
    );
  }
`

const Track = styled.div`
  display: inline-block;
  animation: ${marquee} 50s linear infinite;
`

const ImageContainer = styled.div`
  display: inline-block;
  vertical-align: top;
  font-size: 0;
  &:first-child {
    position: relative;
    left: 0%;
  }
  animation: ${swap} 50s linear infinite;
`

const Image = styled.img<{ size: number }>`
  display: inline-block;
  vertical-align: top;
  text-align: center;
  margin: 0 8px;
  box-sizing: border-box;

  ${({ size }) => `
    width: ${size}px;
    height: ${size}px;
  `}
`

export default function RollingSpinner({
  imageUrls,
  size = 36,
  children,
}: PropsWithChildren<{
  size?: number
  imageUrls: string[]
}>) {
  const images = useMemo(
    () =>
      [...Array(5).keys()].map((_, idx) => {
        return (
          <ImageContainer key={idx}>
            {imageUrls.map((url: string, index: number) => (
              <Image src={url} size={size} key={index} alt="rolling_image" />
            ))}
          </ImageContainer>
        )
      }),
    [imageUrls, size],
  )

  return (
    <RollingSpinnerFrame>
      <RollingSpinnerContainer size={size}>
        {children ? <Container>{children}</Container> : null}
        <TrackContainer>
          <Track>{images}</Track>
        </TrackContainer>
      </RollingSpinnerContainer>
    </RollingSpinnerFrame>
  )
}
