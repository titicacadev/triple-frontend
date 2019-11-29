import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'

import { PoiCarouselElement, PoiListElement } from '@titicaca/poi-list-elements'

import POIS from './pois.sample.json'
import HOTELS from './hotels.sample.json'

const [POI] = POIS

storiesOf('POI', module)
  .add('POI 리스트', () => (
    <PoiListElement
      poi={POI}
      resourceScraps={{
        [POI.id]: boolean('저장', false),
      }}
    />
  ))
  .add('호텔 리스트', () =>
    HOTELS.map((hotel, idx) => (
      <PoiListElement
        key={idx}
        poi={hotel}
        resourceScraps={{
          [hotel.id]: boolean('저장', false),
        }}
        pricingNote="1박, 세금포함"
      />
    )),
  )
  .add('TripleDocument', () => (
    <PoiCarouselElement
      poi={POI}
      resourceScraps={{
        [POI.id]: boolean('저장', false),
      }}
    />
  ))
  .add('TripleDocument 리스트', () => (
    <PoiListElement
      compact
      poi={POI}
      resourceScraps={{
        [POI.id]: boolean('저장', false),
      }}
    />
  ))
