import React from 'react'
import { text, select } from '@storybook/addon-knobs'

import ReviewsList from '@titicaca/review'

import { storiesOf } from '@storybook/react'

storiesOf('ReviewsList', module).add('일반', () => (
  <ReviewsList
    appNativeActions={{}}
    resourceId={text('Resource ID', 'f939b4cb-ea3b-34b6-b430-eb5d28fbf467')}
    resourceType={select('Resource Type', ['poi', 'tna', 'article'], 'tna')}
  />
))
