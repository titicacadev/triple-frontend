import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text, select } from '@storybook/addon-knobs'

import { Text } from '@titicaca/triple-design-system'

storiesOf('Text', module).add('일반', () => (
  <Text
    size={select(
      '크기',
      ['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', 'massive'],
      'tiny',
    )}
    color={select('색깔', ['blue', 'gray', 'white'], 'gray')}
    onClick={action('clicked')}
  >
    {text('텍스트', '안녕')}
  </Text>
))
