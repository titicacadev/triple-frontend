import React, { PureComponent } from 'react'
import '@titicaca/triple-design-system/lib/global-style'
import TripleDocument from '@titicaca/triple-document'

const oneLinks = [
  {
    type: 'links',
    value: {
      display: 'button',
      links: [
        {
          href:
            'https://tna-web.dev.triple.zone/regions/23c5965b-01ad-486b-a694-a2ced15f245c/tnas/1f6957a7-ec3c-3dde-b409-757894d697a8',
          label: '여기서 알아보기',
        },
      ],
    },
  },
]

const twoLinks = [
  {
    type: 'links',
    value: {
      display: 'button',
      links: [
        {
          href:
            'https://tna-web.dev.triple.zone/regions/23c5965b-01ad-486b-a694-a2ced15f245c/tnas/1f6957a7-ec3c-3dde-b409-757894d697a8',
          label: '카톡으로  빠르게 초대',
        },
        {
          href:
            'https://tna-web.dev.triple.zone/regions/23c5965b-01ad-486b-a694-a2ced15f245c/tnas/1f6957a7-ec3c-3dde-b409-757894d697a8',
          label: '초대링크 공유하기',
        },
      ],
    },
  },
]

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <div id="one-button">
          <TripleDocument>{oneLinks}</TripleDocument>
        </div>
        <div id="two-button">
          <TripleDocument>{twoLinks}</TripleDocument>
        </div>
      </div>
    )
  }
}
