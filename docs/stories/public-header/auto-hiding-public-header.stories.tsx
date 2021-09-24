import React from 'react'
import { text, boolean, number } from '@storybook/addon-knobs'
import { AutoHidingPublicHeader } from '@titicaca/public-header'

export default {
  title: 'public-header / AutoHidingPublicHeader',
}

export function BaseAutoHidingPublicHeader() {
  return (
    <AutoHidingPublicHeader
      href={text('href', 'https://triple.guide')}
      playStoreUrl={text('playStoreUrl', 'asdf')}
      appStoreUrl={text('appStoreUrl', 'asdf')}
      fixed={boolean('fixed', false)}
      minWidth={number('minWidth', 1140)}
    />
  )
}
