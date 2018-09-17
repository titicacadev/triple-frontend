import React from 'react'
import Pager from '../elements/pager'
import Image from '../elements/image'

export const ImagePager = ({ margin, images, onImageClick, ImageSource }) => (
  <Pager margin={margin}>
    {images.map((image, i) => {
      const { frame, sizes, sourceUrl } = image

      return (
        <Image
          key={i}
          src={sizes.large.url}
          sourceUrl={sourceUrl}
          frame={frame}
          ImageSource={ImageSource}
          onClick={onImageClick && ((e) => onImageClick(e, image))}
        />
      )
    })}
  </Pager>
)
