import React from 'react'

import ReviewsList from '@titicaca/review'

import { storiesOf } from '@storybook/react'

storiesOf('ReviewsList', module).add('일반', () => (
  <ReviewsList
    appNativeActions={{}}
    resourceType="poi"
    resourceId="a86a3f55-9f89-4540-a124-f8c4db07ab34"
  />
))
