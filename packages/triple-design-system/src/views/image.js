import React from 'react'
import styled from 'styled-components'
import Pager from '../elements/pager'
import Image from '../elements/image'

const PageLabelText = styled.div`
  font-size: 12px;
  font-weight: bold;
`

const PageLabelContainer = styled.div`
  margin: 10px;
  padding: 5px 7px;
  color: #ffffff;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.2);
`

function PageLabel({ current, total }) {
  return (
    <PageLabelContainer>
      <PageLabelText>{`${current + 1} / ${total}`}</PageLabelText>
    </PageLabelContainer>
  )
}

export const ImagePager = ({
  margin,
  borderRadius,
  size: globalSize,
  frame: globalFrame,
  images,
  currentPage,
  totalPageCount,
  onImageClick,
  onPageChange,
  ImageSource,
}) => (
  <Pager
    margin={margin}
    borderRadius={borderRadius}
    currentPage={currentPage}
    onPageChange={onPageChange}
    pageLabelComponent={({ currentSlide }) => (
      <PageLabel
        current={currentSlide}
        total={totalPageCount || images.length}
      />
    )}
  >
    {images.map((image, i) => {
      const { frame: imageFrame, size: imageSize, sizes, sourceUrl } = image
      const size = globalSize || imageSize
      const frame = size ? undefined : globalFrame || imageFrame

      return (
        <Image
          key={i}
          src={sizes.large.url}
          sourceUrl={sourceUrl}
          size={size}
          frame={frame}
          ImageSource={ImageSource}
          borderRadius={0}
          onClick={onImageClick && ((e) => onImageClick(e, image))}
        />
      )
    })}
  </Pager>
)
