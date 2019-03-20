import React from 'react'
import { storiesOf } from '@storybook/react'

import { ELEMENTS } from '@titicaca/triple-design-system'
import POIS from './pois.sample.json'
import HOTEL from './hotel.sample.json'

const { pois: Pois } = ELEMENTS

storiesOf('TripleDocument.POI', module)
  .add('일반', () => (
    <Pois
      resourceScraps={{}}
      value={{
        pois: POIS,
        display: 'default',
      }}
    />
  ))
  .add('일반 w/ 이미지 Placeholder', () => (
    <Pois
      resourceScraps={{}}
      value={{
        pois: POIS.map(({ source: { image, ...source }, ...rest }) => ({
          source,
          ...rest,
        })),
        display: 'default',
      }}
    />
  ))
  .add('리스트', () => (
    <Pois
      resourceScraps={{}}
      value={{
        pois: POIS,
        display: 'list',
      }}
    />
  ))
  .add('리스트 w/ 이미지 Placeholder', () => (
    <Pois
      resourceScraps={{}}
      value={{
        pois: POIS.map(({ source: { image, ...source }, ...rest }) => ({
          source,
          ...rest,
        })),
        display: 'list',
      }}
    />
  ))
  .add('리스트 (호텔 w/ 가격)', () => (
    <Pois
      resourceScraps={{}}
      value={{
        pois: [HOTEL],
        display: 'list',
      }}
    />
  ))
