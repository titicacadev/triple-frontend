import React from 'react'
import { storiesOf } from '@storybook/react'

import { ELEMENTS } from '@titicaca/triple-document'

const { downloadCoupon: DownloadCoupon } = ELEMENTS

storiesOf('TripleDocument', module).add('쿠폰 다운로드', () => (
  <DownloadCoupon isDownloaded={false} />
))
