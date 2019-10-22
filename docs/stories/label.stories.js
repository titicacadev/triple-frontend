import React from 'react'

import { storiesOf } from '@storybook/react'
import { text, select, boolean, number } from '@storybook/addon-knobs'

import { Label } from '@titicaca/core-elements'

storiesOf('Label', module)
  .add('라디오', () => (
    <Label radio selected={boolean('선택됨', false)}>
      {text('텍스트', '최신순')}
    </Label>
  ))
  .add('프로모', () => (
    <Label
      promo
      size={select('크기', ['small', 'medium', 'big'], 'medium')}
      color={select('색깔', ['purple', 'blue', 'red', 'gray'], 'purple')}
      fontColor={select('글자 색깔', ['white', 'gray'], 'gray')}
      fontAlpha={number('fontAlpha', 1)}
      emphasized={boolean('강조', true)}
      manualed={boolean('수동 설정', false)}
      bold={boolean('bold', false)}
    >
      {text('텍스트', '최대 24%')}
    </Label>
  ))
