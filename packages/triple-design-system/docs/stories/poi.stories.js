import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'

import {
  PoiCarouselElement,
  PoiListElement,
} from '@titicaca/triple-design-system'

import POI from './poi.sample.json'

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
