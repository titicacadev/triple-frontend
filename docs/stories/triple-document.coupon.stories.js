import React from 'react'
import { storiesOf } from '@storybook/react'

import { ELEMENTS } from '@titicaca/triple-document'
import { HistoryProvider } from '@titicaca/react-contexts'

const { couponElement: CouponElement } = ELEMENTS

storiesOf('TripleDocument', module).add('쿠폰', () => (
  <HistoryProvider
    webUrlBase={window.location.host}
    isPublic={true}
    isAndroid={true}
  >
    <CouponElement value={{ identifier: '5million', description: 'hello' }} />
  </HistoryProvider>
))
