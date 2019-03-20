import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import {
  PoiCarouselElement,
  PoiListElement,
} from '@titicaca/triple-design-system'

import POIS from './pois.sample.json'

const { id, type, ...rest } = POIS[0]

const POI = {
  id,
  type,
  source: {
    id,
    type,
    reviewsRating: 3.5,
    reviewsCount: 10,
    scrapsCount: 50,
    ...rest,
  },
}

storiesOf('POI', module)
  .addDecorator(withKnobs)
  .add('POI 리스트', () => (
    <PoiListElement
      poi={POI}
      resourceScraps={{
        [POI.id]: boolean('저장', false),
      }}
    />
  ))
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
