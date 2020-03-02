import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { text, boolean } from '@storybook/addon-knobs'
import ListingFilter from '@titicaca/listing-filter'

storiesOf('listing-filter | ListingFilter', module)
  .add('전체', () => (
    <ListingFilter>
      <ListingFilter.PrimaryFilterEntry
        onClick={action('click:PrimaryFilterEntry')}
      >
        5.17-5.20, 3명
      </ListingFilter.PrimaryFilterEntry>
      <ListingFilter.ExpandingFilterEntry
        onClick={action('click:ExpandingFilterEntry')}
        onMouseUp={action('mouseUp:ExpandingFilterEntry')}
      >
        침대타입
      </ListingFilter.ExpandingFilterEntry>
      <ListingFilter.FilterEntry
        onClick={action('click:FilterEntry')}
        onMouseDown={action('mouseDown:FilterEntry')}
      >
        무료취소
      </ListingFilter.FilterEntry>
      <ListingFilter.FilterEntry
        withIcon
        active={false}
        activeIconImage="/ico-category-food-on.svg"
        inactiveIconImage="/ico-category-food.svg"
      >
        {text('레이블', '음식점')}
      </ListingFilter.FilterEntry>
    </ListingFilter>
  ))
  .add('타입1', () => (
    <ListingFilter>
      <ListingFilter.FilterEntry
        withIcon
        active={boolean('active', true)}
        activeIconImage="/ico-category-food-on.svg"
        inactiveIconImage="/ico-category-food.svg"
        disabled={boolean('disabled', false)}
      >
        {text('레이블', '음식점')}
      </ListingFilter.FilterEntry>
    </ListingFilter>
  ))
  .add('타입2', () => (
    <ListingFilter>
      <ListingFilter.FilterEntry
        active={boolean('active', true)}
        disabled={boolean('disabled', false)}
      >
        {text('레이블', '부티크 호텔')}
      </ListingFilter.FilterEntry>
    </ListingFilter>
  ))
  .add('타입3', () => (
    <ListingFilter>
      <ListingFilter.ExpandingFilterEntry
        active={boolean('active', true)}
        disabled={boolean('disabled', false)}
        badge={text('badge', 0)}
      >
        {text('레이블', '성급 및 필터')}
      </ListingFilter.ExpandingFilterEntry>
    </ListingFilter>
  ))
  .add('타입4', () => (
    <ListingFilter>
      <ListingFilter.PrimaryFilterEntry disabled={boolean('disabled', false)}>
        {text('레이블', '5.17-5.20, 3명')}
      </ListingFilter.PrimaryFilterEntry>
    </ListingFilter>
  ))
