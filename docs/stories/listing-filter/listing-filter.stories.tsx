import React from 'react'
import { action } from '@storybook/addon-actions'
import { text, boolean } from '@storybook/addon-knobs'
import ListingFilter from '@titicaca/listing-filter'

export default {
  title: 'listing-filter | ListingFilter',
}

export function BaseListingFilter() {
  return (
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
        active={false}
        activeIconImage="/ico-category-food-on.svg"
        inactiveIconImage="/ico-category-food.svg"
      >
        {text('레이블', '음식점')}
      </ListingFilter.FilterEntry>
    </ListingFilter>
  )
}

BaseListingFilter.story = {
  name: '전체 필터 타입',
}

export function BaseFilterEntry() {
  return (
    <ListingFilter>
      <ListingFilter.FilterEntry
        active={boolean('active', true)}
        disabled={boolean('disabled', false)}
      >
        {text('레이블', '부티크 호텔')}
      </ListingFilter.FilterEntry>
    </ListingFilter>
  )
}

BaseFilterEntry.story = {
  name: '기본 FilterEntry',
}

export function FilterEntryWithIconImage() {
  return (
    <ListingFilter>
      <ListingFilter.FilterEntry
        active={boolean('active', true)}
        activeIconImage="/ico-category-food-on.svg"
        inactiveIconImage="/ico-category-food.svg"
        disabled={boolean('disabled', false)}
      >
        {text('레이블', '음식점')}
      </ListingFilter.FilterEntry>
    </ListingFilter>
  )
}

FilterEntryWithIconImage.story = {
  name: 'FilterEntry (with Icon Image)',
}

export function ExpandingFilter() {
  return (
    <ListingFilter>
      <ListingFilter.ExpandingFilterEntry
        active={boolean('active', true)}
        disabled={boolean('disabled', false)}
        badge={text('badge', '0')}
      >
        {text('레이블', '성급 및 필터')}
      </ListingFilter.ExpandingFilterEntry>
    </ListingFilter>
  )
}

ExpandingFilter.story = {
  name: 'Expanding 타입',
}

export function PrimaryFilter() {
  return (
    <ListingFilter>
      <ListingFilter.PrimaryFilterEntry disabled={boolean('disabled', false)}>
        {text('레이블', '5.17-5.20, 3명')}
      </ListingFilter.PrimaryFilterEntry>
    </ListingFilter>
  )
}

PrimaryFilter.story = {
  name: 'Primary 타입',
}
