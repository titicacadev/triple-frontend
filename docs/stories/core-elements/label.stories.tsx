import React from 'react'
import { text, select, boolean } from '@storybook/addon-knobs'
import { Label } from '@titicaca/core-elements'

export default {
  title: 'Core-Elements / Label',
  component: Label,
}

export const Radio = () => {
  return (
    <Label radio selected={boolean('선택됨', false)}>
      {text('텍스트', '최신순')}
    </Label>
  )
}
Radio.storyName = '라디오'

export const Promo = () => {
  return (
    <Label
      promo
      size={select('크기', ['tiny', 'small', 'medium', 'large'], 'medium')}
      color={select(
        '색깔',
        ['white', 'purple', 'blue', 'red', 'gray', 'green', 'orange'],
        'purple',
      )}
      emphasized={boolean('강조', true)}
    >
      {text('텍스트', '최대 24%')}
    </Label>
  )
}
Promo.storyName = '프로모'
