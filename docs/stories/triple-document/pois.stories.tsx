import React from 'react'
import { Meta } from '@storybook/react'
import { ELEMENTS } from '@titicaca/triple-document'

import POIS from '../__mocks__/pois.sample.json'
import HOTEL from '../__mocks__/hotel.sample.json'

const { pois: Pois } = ELEMENTS

export default { title: 'triple-document / POI', component: Pois } as Meta

export function Normal() {
  return (
    <Pois
      resourceScraps={{}}
      value={{
        pois: POIS,
        display: 'default',
      }}
    />
  )
}
Normal.storyName = '일반'

export function NormalWithImagePlaceholder() {
  return (
    <Pois
      resourceScraps={{}}
      value={{
        pois: POIS.map(({ source: { ...source }, ...rest }) => ({
          source,
          ...rest,
        })),
        display: 'default',
      }}
    />
  )
}
NormalWithImagePlaceholder.storyName = '일반 w/ 이미지 Placeholder'

export function List() {
  return (
    <Pois
      resourceScraps={{}}
      value={{
        pois: POIS,
        display: 'list',
      }}
    />
  )
}
List.storyName = '리스트'

export function ListWithImagePlaceholder() {
  return (
    <Pois
      resourceScraps={{}}
      value={{
        pois: POIS.map(({ source: { ...source }, ...rest }) => ({
          source,
          ...rest,
        })),
        display: 'list',
      }}
    />
  )
}
ListWithImagePlaceholder.storyName = '리스트 w/ 이미지 Placeholder'

export function HotelListWithPrice() {
  return (
    <Pois
      resourceScraps={{}}
      value={{
        pois: [HOTEL],
        display: 'list',
      }}
    />
  )
}
HotelListWithPrice.storyName = '리스트 (호텔 w/ 가격)'
