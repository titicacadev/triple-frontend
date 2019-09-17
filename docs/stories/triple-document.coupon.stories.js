import React from 'react'
import { storiesOf } from '@storybook/react'

import { ELEMENTS } from '@titicaca/triple-document'

const { downloadCoupon: DownloadCoupon } = ELEMENTS

storiesOf('TripleDocument.쿠폰다운로드', module)
  .add('가능', () => <DownloadCoupon isDownloaded={false} />)
  .add('불가능', () => <DownloadCoupon isDownloaded={true} />)
