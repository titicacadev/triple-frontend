import React from 'react'

import { storiesOf } from '@storybook/react'
import { text, boolean } from '@storybook/addon-knobs'

import { ListingFilter } from '@titicaca/triple-design-system'

storiesOf('ListingFilter', module)
  .add('타입1', () => (
    <ListingFilter>
      <ListingFilter.FilterEntry withIcon active={boolean('active', true)}>
        {text('레이블', '관광명소')}
      </ListingFilter.FilterEntry>
    </ListingFilter>
  ))
  .add('타입2', () => (
    <ListingFilter>
      <ListingFilter.FilterEntry active={boolean('active', true)}>
        {text('레이블', '부티크 호텔')}
      </ListingFilter.FilterEntry>
    </ListingFilter>
  ))
  .add('타입3', () => (
    <ListingFilter>
      <ListingFilter.ExpandingFilterEntry active={boolean('active', true)}>
        {text('레이블', '성급 및 필터')}
      </ListingFilter.ExpandingFilterEntry>
    </ListingFilter>
  ))
  .add('타입4', () => (
    <ListingFilter>
      <ListingFilter.PrimaryFilterEntry>
        {text('레이블', '5.17-5.20, 3명')}
      </ListingFilter.PrimaryFilterEntry>
    </ListingFilter>
  ))
