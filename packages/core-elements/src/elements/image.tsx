import * as React from 'react'
import styled, { css } from 'styled-components'
import * as CSS from 'csstype'

import Icon from './icon'
import {
  MarginPadding,
  GlobalSizes,
  FrameRatioAndSizes,
  MEDIA_FRAME_OPTIONS,
} from '../commons'
import { formatMarginPadding } from '../mixins'

// TODO: children 제거하기. React.ComponentType 사용하기
export type ImageSourceType = (props: {
  sourceUrl?: string
  children?: string
}) => React.ReactNode
type OverlayType = 'gradient' | 'dark'

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

const IMAGE_HEIGHT_OPTIONS: Partial<Record<GlobalSizes, string>> = {
  mini: '80px',
  small: '110px',
  medium: '200px',
  large: '400px',
}

const ROUND_SIZES: Partial<Record<GlobalSizes, number>> = {
  small: 40,
  medium: 60,
}

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

// eslint-disable-next-line no-unexpected-multiline
const ImageOverlay = styled.div<{
  borderRadius?: number
  overlayPadding?: MarginPadding
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

  ${({ overlayPadding }) => formatMarginPadding(overlayPadding, 'padding')}
`

const IconContainer = styled.div`
  position: absolute;
  top: 30px;
  right: 10px;
  width: 20px;
  height: 20px;
`

const ImageFrameContent = ({
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
}) => (
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
        overlayPadding={overlayPadding}
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

// eslint-disable-next-line no-unexpected-multiline
const ImageFrameBase = styled.div<{
  floated?: CSS.FloatProperty
  margin?: MarginPadding
  borderRadius?: number
  asPlaceholder?: boolean
  src?: string
  frame?: FrameRatioAndSizes
}>`
  font-size: 0;
  position: relative;
  float: ${({ floated }) => floated || 'none'};

  ${({ frame }) =>
    (!frame || (frame && frame !== 'original')) &&
    css`
      overflow: hidden;
    `};

  ${({ margin }) =>
    margin &&
    css`
      margin-top: ${margin.top || 0}px;
      margin-bottom: ${margin.bottom || 0}px;
      margin-left: ${margin.left || 0}px;
      margin-right: ${margin.right || 0}px;
    `};

  border-radius: ${({ borderRadius }) =>
    borderRadius === 0 ? 0 : borderRadius || 6}px;

  ${({ asPlaceholder }) =>
    asPlaceholder
      ? css<{ src?: string }>`
          background-color: #efefef;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 40px 40px;
          background-image: url(${({ src }) => src});
        `
      : css`
          background-color: #f5f5f5;
        `};
`

// eslint-disable-next-line no-unexpected-multiline
const ImageFrameWithFixedDimensions = styled(ImageFrameBase)<{
  height?: number
  size?: GlobalSizes
  width?: number
}>`
  height: ${({ height, size }) =>
    (height && `${height}px`) || (size ? IMAGE_HEIGHT_OPTIONS[size] : '')};
  width: ${({ width }) => (width && `${width}px`) || '100%'};
`

// eslint-disable-next-line no-unexpected-multiline
const ImageFrameWithFixedRatio = styled(ImageFrameBase)<{
  frame?: FrameRatioAndSizes
}>`
  ${({ frame }) =>
    frame !== 'original' &&
    formatMarginPadding(
      { top: MEDIA_FRAME_OPTIONS[frame || 'small'] },
      'padding',
    )}
  width: 100%;
`

// eslint-disable-next-line no-unexpected-multiline
const RoundImage = styled.img<{
  size?: GlobalSizes
  floated?: CSS.FloatProperty
  width?: number
}>`
  width: ${({ size, width }) =>
    (size && ROUND_SIZES[size]) || width || ROUND_SIZES['small']}px;
  height: ${({ size, width }) =>
    (size && ROUND_SIZES[size]) || width || ROUND_SIZES['small']}px;
  border-radius: ${({ size, width }) =>
    ((size && ROUND_SIZES[size]) || width || (ROUND_SIZES['small'] as number)) /
    2}px;
  background-color: #efefef;
  object-fit: cover;

  float: ${({ floated }) => floated || 'none'};
`

function Image({
  src,
  borderRadius,
  circular,
  sourceUrl,
  frame,
  size,
  ImageSource,
  overlay,
  overlayPadding,
  overlayType,
  withLinkIndicator,
  onClick,
  floated,
  width,
  height,
  margin,
  asPlaceholder,
  alt,
}: {
  src?: string
  borderRadius?: number
  circular?: boolean
  sourceUrl?: string
  frame?: FrameRatioAndSizes
  size?: GlobalSizes
  ImageSource?: ImageSourceType
  overlay?: React.ReactNode
  overlayPadding?: MarginPadding
  overlayType?: OverlayType
  withLinkIndicator?: boolean
  onClick?: (e: React.SyntheticEvent) => any
  floated?: CSS.FloatProperty
  width?: number
  height?: number
  margin?: MarginPadding
  asPlaceholder?: boolean
  alt?: string
}) {
  if (circular) {
    return (
      <RoundImage
        src={src}
        floated={floated}
        size={size}
        width={width}
        alt={alt || ''}
      />
    )
  }

  const Frame =
    size || height
      ? function WrappedImage({ children }: { children?: React.ReactNode }) {
          return (
            <ImageFrameWithFixedDimensions
              size={size}
              onClick={onClick}
              floated={floated}
              width={width}
              height={height}
              margin={margin}
              borderRadius={borderRadius}
              asPlaceholder={asPlaceholder}
              src={src}
            >
              {children}
            </ImageFrameWithFixedDimensions>
          )
        }
      : function WrappedImage({ children }: { children?: React.ReactNode }) {
          return (
            <ImageFrameWithFixedRatio
              frame={frame}
              onClick={onClick}
              floated={floated}
              margin={margin}
              borderRadius={borderRadius}
              asPlaceholder={asPlaceholder}
              src={src}
            >
              {children}
            </ImageFrameWithFixedRatio>
          )
        }

  return (
    <Frame>
      {asPlaceholder ? null : (
        <ImageFrameContent
          imageUrl={src}
          borderRadius={borderRadius}
          sourceUrl={sourceUrl}
          ImageSource={ImageSource}
          overlay={overlay}
          overlayPadding={overlayPadding}
          overlayType={overlayType}
          withLinkIndicator={withLinkIndicator}
          frame={frame}
          alt={alt || ''}
        />
      )}
    </Frame>
  )
}

export default Image
