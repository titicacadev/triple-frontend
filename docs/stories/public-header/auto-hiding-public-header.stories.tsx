import React from 'react'
import { text, boolean } from '@storybook/addon-knobs'
import { AutoHidingPublicHeader } from '@titicaca/public-header'

export default {
  title: 'public-header / AutoHidingPublicHeader',
}

export function BaseAutoHidingPublicHeader() {
  return (
    <AutoHidingPublicHeader
      fixed={boolean('fixed', false)}
      deeplinkHref={text('deeplinkHref', 'https://triple.guide')}
    />
  )
}
