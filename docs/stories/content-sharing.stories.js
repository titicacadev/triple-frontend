import React from 'react'
import { storiesOf } from '@storybook/react'

import ContentSharing from '@titicaca/content-sharing'

storiesOf('ContentSharing', module).add('일반', () => (
  <ContentSharing title="친구들과 여행 정보를 공유하세요" />
))
