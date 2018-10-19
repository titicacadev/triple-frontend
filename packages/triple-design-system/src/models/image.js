import React from 'react'
import Pager from '../elements/pager'
import Image from '../elements/image'

export const ImagePager = ({
  margin,
  borderRadius,
  size: globalSize,
  frame: globalFrame,
  images,
  onImageClick,
  ImageSource,
}) => (
  <Pager margin={margin} borderRadius={borderRadius}>
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
