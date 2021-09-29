import React from 'react'
import { text, boolean, select } from '@storybook/addon-knobs'
import PublicHeader from '@titicaca/public-header'

export default {
  title: 'public-header / PublicHeader',
}

export function BasePublicHeader() {
  return (
    <PublicHeader
      fixed={boolean('fixed', false)}
      deeplinkHref={text('deeplinkHref', 'https://triple.guide')}
      category={select(
        'category',
        {
          air: 'air',
          hotels: 'hotels',
          tna: 'tna',
        },
        'air',
      )}
    />
  )
}
