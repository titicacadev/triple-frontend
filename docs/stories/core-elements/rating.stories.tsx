import React from 'react'
import { Rating } from '@titicaca/core-elements'
import { number, select } from '@storybook/addon-knobs'

export default {
  title: 'Core-Elements / Rating',
  component: Rating,
}

export const Basic = () => {
  return (
    <Rating
      size={select<'tiny' | 'small' | 'medium'>(
        '크기',
        ['tiny', 'small', 'medium'],
        'tiny',
      )}
      score={number('점수', 5)}
    />
  )
}
Basic.storyName = '리뷰점수'
