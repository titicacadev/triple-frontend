import React from 'react'
import Pager from '../elements/pager'
import { ImageFrame } from '../elements/content-elements'

export const ImagePager = ({ margin, images, onImageClick, ImageSource }) => (
  <Pager margin={margin}>
    {images.map((image, i) => (
      <ImageFrame
        key={i}
        image={image}
        ImageSource={ImageSource}
        onClick={onImageClick && ((e) => onImageClick(e, image))}
      />
    ))}
  </Pager>
)
