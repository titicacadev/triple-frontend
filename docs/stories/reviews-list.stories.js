import React from 'react'

import ReviewsList from '@titicaca/review'

import { storiesOf } from '@storybook/react'

import Reviews from './reviews-list.sample.json'

storiesOf('ReviewsList', module).add('일반', () => (
  <ReviewsList reviews={Reviews} />
))
