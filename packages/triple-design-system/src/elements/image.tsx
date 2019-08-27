import * as React from 'react'
import styled, { css, InterpolationValue } from 'styled-components'
import Icon from './icon'
import { MarginPadding, GlobalSizes } from '../commons'
import * as CSS from 'csstype'

type OverlayType = 'gradient' | 'dark'

const OverlayStyle: { [key in OverlayType]: InterpolationValue[] } = {
  gradient: css`
    background-color: rgba(0, 0, 0, 0.8);
  `,
  dark: css`
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

const IMAGE_FRAME_OPTIONS: Partial<Record<GlobalSizes, string>> = {
  mini: '25%',
  small: '60%',
  medium: '75%',
  large: '100%',
  big: '110%',
  huge: '160%',
}

const RawImage = styled.img<{ borderRadius?: number; overlay?: boolean }>`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
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

  ${({ overlayPadding }) =>
    overlayPadding &&
    css`
      padding-top: ${overlayPadding.top || 0}px;
      padding-bottom: ${overlayPadding.bottom || 0}px;
      padding-left: ${overlayPadding.left || 0}px;
      padding-right: ${overlayPadding.right || 0}px;
    `};
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
}: {
  imageUrl?: string
  borderRadius?: number
  sourceUrl?: string
  ImageSource?: any
  overlay?: React.ReactNode
  overlayPadding?: MarginPadding
  overlayType?: OverlayType
  withLinkIndicator?: boolean
}) => (
  <>
    {imageUrl && (
      <RawImage
        overlay={!!overlay}
        src={imageUrl}
        borderRadius={borderRadius}
      />
    )}
    {sourceUrl && (
      <SourceUrl>
        {ImageSource ? <ImageSource>{sourceUrl}</ImageSource> : sourceUrl}
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
}>`
  position: relative;
  overflow: hidden;
  float: ${({ floated }) => floated || 'none'};

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
      ? css`
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
    (height && `${height}px`) || IMAGE_HEIGHT_OPTIONS[size]};
  width: ${({ width }) => (width && `${width}px`) || '100%'};
`

// eslint-disable-next-line no-unexpected-multiline
const ImageFrameWithFixedRatio = styled(ImageFrameBase)<{
  frame?: GlobalSizes
}>`
  padding-top: ${({ frame }) => IMAGE_FRAME_OPTIONS[frame || 'small']};
  width: 100%;
`

// eslint-disable-next-line no-unexpected-multiline
const RoundImage = styled.img<{
  size?: GlobalSizes
  floated?: CSS.FloatProperty
}>`
  width: ${({ size }) => ROUND_SIZES[size || 'small']}px;
  height: ${({ size }) => ROUND_SIZES[size || 'small']}px;
  border-radius: ${({ size }) => ROUND_SIZES[size || 'small'] / 2}px;
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
}: {
  src?: string
  borderRadius?: number
  circular?: boolean
  sourceUrl?: string
  frame?: GlobalSizes
  size?: GlobalSizes
  ImageSource?: any
  overlay?: React.ReactNode
  overlayPadding?: MarginPadding
  overlayType?: OverlayType
  withLinkIndicator?: boolean
  onClick?: (e?: React.SyntheticEvent) => any
  floated?: CSS.FloatProperty
  width?: number
  height?: number
  margin?: MarginPadding
  asPlaceholder?: boolean
}) {
  if (circular) {
    return <RoundImage src={src} floated={floated} size={size} />
  }

  const Frame =
    size || height
      ? ({ children }: { children?: React.ReactNode }) => (
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
      : ({ children }: { children?: React.ReactNode }) => (
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
        />
      )}
    </Frame>
  )
}

export default Image
