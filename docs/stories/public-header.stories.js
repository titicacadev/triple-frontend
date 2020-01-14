import React from 'react'

import { storiesOf } from '@storybook/react'
import { text, boolean, number } from '@storybook/addon-knobs'

import PublicHeader from '@titicaca/public-header'

storiesOf('PublicHeader', module).add('일반', () => (
  <PublicHeader
    href={text('href', 'https://triple.guide')}
    playStoreUrl={text('playStoreUrl', 'asdf')}
    appStoreUrl={text('appStoreUrl', 'asdf')}
    fixed={boolean('fixed', false)}
    minWidth={number('minWidth')}
  />
))
