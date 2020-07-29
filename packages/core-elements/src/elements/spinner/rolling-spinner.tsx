import React, { useMemo, PropsWithChildren, useState } from 'react'
import styled, { keyframes, css } from 'styled-components'

import { FALLBACK_ACTION_CLASS_NAME } from '../../constants'
import Container from '../container'

const marquee = keyframes`
  0% {
    transform: translateX(0);
 }
 100% {
    transform: translateX(-100%);
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

const Track = styled.div<{ duration: number; animated: boolean }>`
  position: relative;
  display: inline-block;

  ${({ animated, duration }) =>
    animated &&
    css`
      animation: ${marquee} ${duration}s linear infinite;
    `}
`

const ImageContainer = styled.div<{
  animated: boolean
  duration: number
  offset: number
}>`
  position: relative;
  display: inline-block;
  vertical-align: top;
  font-size: 0;

  ${({ animated, offset, duration }) => {
    if (!animated) {
      return ''
    }

    const keyframeName = `swap-${offset}`
    const snap = (offset + 1) * 20

    return `
      @keyframes ${keyframeName} {
        0%, ${snap}% {
          left: 0%;
        }

        ${snap + 0.01}%, 100% {
          left: 100%;
        }
      }

      animation: ${keyframeName} ${duration}s linear infinite;
  `
  }}
`

const Image = styled.img<{ size: number }>`
  display: inline-block;
  vertical-align: top;
  text-align: center;
  margin: 0 8px;
  box-sizing: border-box;

  ${({ size }) => `
    height: ${size}px;
  `}
`

export default function RollingSpinner({
  imageUrls,
  size = 36,
  duration = 50,
  children,
}: PropsWithChildren<{
  size?: number
  duration?: number
  imageUrls: string[]
}>) {
  const [loadedImage, setLoadedImage] = useState(new Map())

  const everyImageLoaded = loadedImage.size === imageUrls.length

  const images = useMemo(
    () =>
      [...Array(5).keys()].map((_, idx) => {
        return (
          <ImageContainer
            key={idx}
            animated={everyImageLoaded}
            duration={duration}
            offset={idx}
          >
            {imageUrls.map((url: string, index: number) => (
              <Image
                src={url}
                size={size}
                key={index}
                alt="rolling_image"
                onLoad={() => {
                  setLoadedImage((prev) => {
                    if (prev.has(url)) {
                      return prev
                    }
                    return new Map([...prev.entries(), [url, true]])
                  })
                }}
              />
            ))}
          </ImageContainer>
        )
      }),
    [everyImageLoaded, duration, imageUrls, size],
  )

  return (
    <RollingSpinnerFrame className={FALLBACK_ACTION_CLASS_NAME}>
      <RollingSpinnerContainer size={size}>
        {children ? <Container>{children}</Container> : null}
        <TrackContainer>
          <Track animated={everyImageLoaded} duration={duration}>
            {images}
          </Track>
        </TrackContainer>
      </RollingSpinnerContainer>
    </RollingSpinnerFrame>
  )
}
