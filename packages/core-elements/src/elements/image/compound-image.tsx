import React from 'react'

import FixedDimensionsImage, {
  ImageFrameWithFixedDimensionsProps,
} from './fixed-dimensions-image'
import FixedRatioImage from './fixed-ratio-image'
import CircularImage from './circular-image'
import { ImageProps } from './types'

export default function CompoundImage({
  circular,
  size,
  height,
  ...props
}: ImageProps & ImageFrameWithFixedDimensionsProps & { circular?: boolean }) {
  if (circular) {
    return <CircularImage {...props} />
  } else if (size || height) {
    return <FixedDimensionsImage size={size} height={height} {...props} />
  } else {
    return <FixedRatioImage {...props} />
  }
}
