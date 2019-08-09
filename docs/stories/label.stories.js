import React from 'react'

import { storiesOf } from '@storybook/react'
import { text, select, boolean } from '@storybook/addon-knobs'

import { Label } from '@titicaca/triple-design-system'

storiesOf('Label', module)
  .add('라디오', () => (
    <Label radio selected={boolean('선택됨', false)}>
      {text('텍스트', '최신순')}
    </Label>
  ))
  .add('프로모', () => (
    <Label
      promo
      size={select('크기', ['small', 'medium'], 'medium')}
      color={select('색깔', ['purple', 'blue', 'red'], 'purple')}
      emphasized={boolean('강조', true)}
    >
      {text('텍스트', '최대 24%')}
    </Label>
  ))
