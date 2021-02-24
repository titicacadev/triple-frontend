import React from 'react'
import { text, boolean, number } from '@storybook/addon-knobs'
import PublicHeader from '@titicaca/public-header'

export default {
  title: 'public-header / PublicHeader',
}

export function BasePublicHeader() {
  return (
    <PublicHeader
      href={text('href', 'https://triple.guide')}
      playStoreUrl={text('playStoreUrl', 'asdf')}
      appStoreUrl={text('appStoreUrl', 'asdf')}
      fixed={boolean('fixed', false)}
      minWidth={number('minWidth', 1140)}
    />
  )
}

BasePublicHeader.storyName = '기본'

export function HeightPublicHeader() {
  return (
    <PublicHeader
      href={text('href', 'https://triple.guide')}
      playStoreUrl={text('playStoreUrl', 'asdf')}
      appStoreUrl={text('appStoreUrl', 'asdf')}
      fixed={boolean('fixed', false)}
      minWidth={number('minWidth', 768)}
      mobileViewHeight={number('mobileViewHeight', 190)}
    />
  )
}

HeightPublicHeader.storyName = 'height'

export function BorderlessPublicHeader() {
  return (
    <PublicHeader
      href={text('href', 'https://triple.guide')}
      playStoreUrl={text('playStoreUrl', 'asdf')}
      appStoreUrl={text('appStoreUrl', 'asdf')}
      fixed={boolean('fixed', false)}
      minWidth={number('minWidth', 1140)}
      borderless={boolean('borderless', true)}
    />
  )
}

BorderlessPublicHeader.storyName = 'borderless'
