import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { select } from '@storybook/addon-knobs'

import { Tabs } from '@titicaca/core-elements'

storiesOf('Tabs', module).add('이근처장소', () => (
  <Tabs
    value={select('현재 탭', ['attractions', 'restaurants'], 'attractions')}
    options={[
      { label: '관광지', value: 'attractions' },
      { label: '맛집', value: 'restaurants' },
    ]}
    onChange={action('change')}
  />
))
