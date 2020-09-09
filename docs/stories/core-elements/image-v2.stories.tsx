import React from 'react'
import { ImageV2 } from '@titicaca/core-elements'

export default {
  title: 'ImageV2 컴포넌트',
}

export function baseExample() {
  return (
    <ImageV2>
      <ImageV2.Content src="https://triple-corp.com/static/images/img-bg-0.jpg" />
    </ImageV2>
  )
}
