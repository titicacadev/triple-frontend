import React from 'react'

import { storiesOf } from '@storybook/react'

import { Rating } from '@titicaca/core-elements'
import { number, select } from '@storybook/addon-knobs'

storiesOf('Rating', module).add('리뷰점수', () => (
  <Rating
    size={select('크기', ['tiny', 'small', 'medium'])}
    score={number('점수', 5)}
  />
))
