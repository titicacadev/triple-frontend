import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, select, boolean } from '@storybook/addon-knobs'
import { Label } from '@titicaca/core-elements'

storiesOf('Core-Elements | Label', module)
  .add('라디오', () => (
    <Label radio selected={boolean('선택됨', false)}>
      {text('텍스트', '최신순')}
    </Label>
  ))
  .add('프로모', () => (
    <Label
      promo
      size={select('크기', ['small', 'medium', 'large'], 'medium')}
      color={select(
        '색깔',
        ['purple', 'blue', 'red', 'gray', 'green'],
        'purple',
      )}
      emphasized={boolean('강조', true)}
    >
      {text('텍스트', '최대 24%')}
    </Label>
  ))
