import React from 'react'
import { storiesOf } from '@storybook/react'

import ShareOptions from '@titicaca/share-options'

storiesOf('ShareOptions', module).add('일반', () => (
  <ShareOptions title="친구들과 여행 정보를 공유하세요" />
))
