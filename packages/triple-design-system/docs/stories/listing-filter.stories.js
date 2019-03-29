import React from 'react'

import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs'

import { ListingFilter } from '@titicaca/triple-design-system'

storiesOf('ListingFilter', module)
  .add('타입1', () => (
    <ListingFilter>
      <ListingFilter.FilterEntry withIcon active={boolean('active', true)}>
        {text('레이블', '성급')}
      </ListingFilter.FilterEntry>
    </ListingFilter>
  ))
  .add('타입2', () => <ListingFilter>{text('레이블', '성급')}</ListingFilter>)
