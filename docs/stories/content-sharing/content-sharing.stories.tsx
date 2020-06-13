import React from 'react'
import { action } from '@storybook/addon-actions'
import ContentSharing from '@titicaca/content-sharing'

export default {
  title: 'content-sharing | ContentSharing',
}

export function BaseContentSharing() {
  return (
    <ContentSharing
      label="친구들과 여행 정보를 공유하세요"
      onShareClick={action('onShareClick')}
    />
  )
}

BaseContentSharing.story = {
  name: '기본 컨텐츠 공유',
}
