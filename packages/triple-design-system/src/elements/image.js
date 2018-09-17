import React from 'react'
import styled from 'styled-components'

const RawImage = styled.img`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: ${({ borderRadius }) =>
    borderRadius === 0 ? 0 : borderRadius || 6}px;
  object-fit: cover;
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

const ImageFrameContent = ({
  imageUrl,
  borderRadius,
  sourceUrl,
  ImageSource,
}) => (
  <>
    <RawImage src={imageUrl} borderRadius={borderRadius} />
    {sourceUrl && (
      <SourceUrl>
        {ImageSource ? <ImageSource>{sourceUrl}</ImageSource> : sourceUrl}
      </SourceUrl>
    )}
  </>
)

const ImageFrameBase = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`

const ImageFrameWithFixedHeight = styled(ImageFrameBase)`
  height: ${({ height }) => height};
`

const IMAGE_FRAME_OPTIONS = {
  small: '60%',
  medium: '75%',
  large: '100%',
  big: '110%',
}

const ImageFrameWithFixedRatio = styled(ImageFrameBase)`
  padding-top: ${({ frame }) => IMAGE_FRAME_OPTIONS[frame || 'small']};
`

const IMAGE_HEIGHT_OPTIONS = {
  mini: '80px',
  small: '200px',
}

function Image({
  src,
  borderRadius,
  sourceUrl,
  frame,
  size,
  ImageSource,
  onClick,
}) {
  if (size) {
    return (
      <ImageFrameWithFixedHeight
        height={IMAGE_HEIGHT_OPTIONS[size || 'small']}
        onClick={onClick}
      >
        <ImageFrameContent
          imageUrl={src}
          borderRadius={borderRadius}
          sourceUrl={sourceUrl}
          ImageSource={ImageSource}
        />
      </ImageFrameWithFixedHeight>
    )
  }

  return (
    <ImageFrameWithFixedRatio frame={frame} onClick={onClick}>
      <ImageFrameContent
        imageUrl={src}
        borderRadius={borderRadius}
        sourceUrl={sourceUrl}
        ImageSource={ImageSource}
      />
    </ImageFrameWithFixedRatio>
  )
}

export default Image
