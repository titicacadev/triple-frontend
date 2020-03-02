import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import ContentSharing from '@titicaca/content-sharing'

storiesOf('content-sharing | ContentSharing', module).add('일반', () => (
  <ContentSharing
    label="친구들과 여행 정보를 공유하세요"
    onShareClick={action('onShareClick')}
  />
))
