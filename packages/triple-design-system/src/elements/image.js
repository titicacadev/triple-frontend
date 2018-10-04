import React from 'react'
import styled, { css } from 'styled-components'
import Icon from './icon'

const RawImage = styled.img`
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
  font-family: sans-serif;
  font-size: 9px;
  color: rgba(255, 255, 255, 0.9);
`

const ImageOverlay = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0)
  );
  padding: 16px 60px 16px 20px;
  border-radius: ${({ borderRadius }) =>
    borderRadius === 0 ? 0 : borderRadius || 6}px;
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
  withLinkIndicator,
}) => (
  <>
    <RawImage overlay={!!overlay} src={imageUrl} borderRadius={borderRadius} />
    {sourceUrl && (
      <SourceUrl>
        {ImageSource ? <ImageSource>{sourceUrl}</ImageSource> : sourceUrl}
      </SourceUrl>
    )}
    {overlay && (
      <ImageOverlay borderRadius={borderRadius}>{overlay}</ImageOverlay>
    )}
    {withLinkIndicator && (
      <IconContainer>
        <Icon size="medium" name="arrowRight" />
      </IconContainer>
    )}
  </>
)

const ImageFrameBase = styled.div`
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
`

const ImageFrameWithFixedDimensions = styled(ImageFrameBase)`
  height: ${({ height }) => height};
  width: ${({ width }) => (width && `${width}px`) || '100%'};
`

const IMAGE_FRAME_OPTIONS = {
  mini: '25%',
  small: '60%',
  medium: '75%',
  large: '100%',
  big: '110%',
}

const ImageFrameWithFixedRatio = styled(ImageFrameBase)`
  padding-top: ${({ frame }) => IMAGE_FRAME_OPTIONS[frame || 'small']};
  width: 100%;
`

const IMAGE_HEIGHT_OPTIONS = {
  mini: '80px',
  small: '110px',
  medium: '200px',
}

const ROUND_SIZES = {
  small: 40,
  medium: 60,
}

const RoundImage = styled.img`
  width: ${({ size }) => ROUND_SIZES[size || 'small']}px;
  height: ${({ size }) => ROUND_SIZES[size || 'small']}px;
  border-radius: ${({ size }) => ROUND_SIZES[size || 'small'] / 2}px;
  background-color: #efefef;

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
  withLinkIndicator,
  onClick,
  floated,
  width,
  margin,
}) {
  if (circular) {
    return <RoundImage src={src} floated={floated} size={size} />
  }

  const Frame = size
    ? ({ children }) => (
        <ImageFrameWithFixedDimensions
          height={IMAGE_HEIGHT_OPTIONS[size]}
          onClick={onClick}
          floated={floated}
          width={width}
          margin={margin}
        >
          {children}
        </ImageFrameWithFixedDimensions>
      )
    : ({ children }) => (
        <ImageFrameWithFixedRatio
          frame={frame}
          onClick={onClick}
          floated={floated}
          width={width}
          margin={margin}
        >
          {children}
        </ImageFrameWithFixedRatio>
      )

  return (
    <Frame>
      <ImageFrameContent
        imageUrl={src}
        borderRadius={borderRadius}
        sourceUrl={sourceUrl}
        ImageSource={ImageSource}
        overlay={overlay}
        withLinkIndicator={withLinkIndicator}
      />
    </Frame>
  )
}

export default Image
