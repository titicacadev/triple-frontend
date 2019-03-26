import React from 'react'

import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs'

import { Label } from '@titicaca/triple-design-system'

storiesOf('Label', module).add('라디오', () => (
  <Label radio selected={boolean('선택됨', false)}>
    {text('텍스트', '최신순')}
  </Label>
))
