import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'

import {
  PoiCarouselElement,
  PoiListElement,
} from '@titicaca/triple-design-system'

import POIS from './pois.sample.json'

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
