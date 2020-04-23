import React from 'react'
import styled, { css } from 'styled-components'

import { paddingMixin } from '../../mixins'
import { MarginPadding, FrameRatioAndSizes } from '../../commons'
import Icon from '../icon'
import { ImageSourceType, OverlayType } from './types'

const OverlayStyle: { [key in OverlayType]: ReturnType<typeof css> } = {
  dark: css`
    background-color: rgba(0, 0, 0, 0.8);
  `,
  gradient: css`
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0)
    );
  `,
}

const IconContainer = styled.div`
  position: absolute;
  top: 30px;
  right: 10px;
  width: 20px;
  height: 20px;
`

const ImageOverlay = styled.div<{
  borderRadius?: number
  padding?: MarginPadding
  overlayType?: OverlayType
}>`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;

  border-radius: ${({ borderRadius }) =>
    borderRadius === 0 ? 0 : borderRadius || 6}px;

  ${({ overlayType = 'gradient' }) => OverlayStyle[overlayType]}

  ${paddingMixin}
`

const SourceUrl = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  max-width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 9px;
  line-height: 1.2;
  color: rgba(255, 255, 255, 0.9);
`

const RawImage = styled.img<{
  borderRadius?: number
  overlay?: boolean
  frame?: FrameRatioAndSizes
}>`
  ${({ frame }) =>
    (!frame || (frame && frame !== 'original')) &&
    css`
      position: absolute;
      top: 0;
      height: 100%;
    `};
  width: 100%;
  border-radius: ${({ borderRadius }) =>
    borderRadius === 0 ? 0 : borderRadius || 6}px;
  object-fit: cover;
  opacity: ${({ overlay }) => (overlay ? 80 : 100)}%;
`

export default function ImageFrameContent({
  imageUrl,
  borderRadius,
  sourceUrl,
  ImageSource,
  overlay,
  overlayPadding,
  overlayType,
  withLinkIndicator,
  alt,
  frame,
}: {
  asPlaceholder?: boolean
  imageUrl?: string
  borderRadius?: number
  sourceUrl?: string
  ImageSource?: ImageSourceType
  overlay?: React.ReactNode
  overlayPadding?: MarginPadding
  overlayType?: OverlayType
  withLinkIndicator?: boolean
  alt?: string
  frame?: FrameRatioAndSizes
}) {
  return (
    <>
      {imageUrl && (
        <RawImage
          overlay={!!overlay}
          src={imageUrl}
          borderRadius={borderRadius}
          alt={alt || ''}
          frame={frame}
        />
      )}
      {sourceUrl && (
        <SourceUrl>
          {ImageSource ? (
            // TODO: children에 url 전달하는 것 제거하기
            <ImageSource sourceUrl={sourceUrl}>{sourceUrl}</ImageSource>
          ) : (
            sourceUrl
          )}
        </SourceUrl>
      )}
      {overlay && (
        <ImageOverlay
          borderRadius={borderRadius}
          padding={overlayPadding}
          overlayType={overlayType}
        >
          {overlay}
        </ImageOverlay>
      )}
      {withLinkIndicator && (
        <IconContainer>
          <Icon size="medium" name="arrowRight" />
        </IconContainer>
      )}
    </>
  )
}
