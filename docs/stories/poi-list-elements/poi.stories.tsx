import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, number, select, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { List, Container, Text } from '@titicaca/core-elements'
import { PoiCarouselElement, PoiListElement } from '@titicaca/poi-list-elements'
import { POI as POIData, Hotel as HotelData } from '@titicaca/type-definitions'

import POIS from '../__mocks__/pois.sample.json'
import HOTELS from '../__mocks__/hotels.sample.json'

function PricingDescription() {
  return (
    <Container>
      <Text size="tiny" inlineBlock>
        쿠폰적용가
      </Text>
      <Text size="tiny" inlineBlock>
        10,000 원
      </Text>
    </Container>
  )
}

const [POI] = POIS as Exclude<POIData, HotelData>[]

storiesOf('poi-list-elements | POI', module)
  .add('POI 리스트', () => (
    <PoiListElement
      poi={POI}
      resourceScraps={{
        [POI.id]: boolean('저장', false),
      }}
    />
  ))
  .add('호텔 리스트', () => (
    <List divided>
      {(HOTELS as HotelData[]).map((hotel, idx) => (
        <PoiListElement
          key={idx}
          poi={hotel}
          resourceScraps={{
            [hotel.id]: boolean('저장', false),
          }}
          pricingNote="1박, 세금포함"
          priceLabelOverride={text('pricing custom text', '')}
          pricingDescription={<PricingDescription />}
          tags={
            idx % 2 === 0
              ? [{ text: '추가 할인쿠폰', color: 'green', emphasized: true }]
              : undefined
          }
          hideDiscountRate={boolean('hideDiscountRate', false)}
          hideScrapButton={boolean('hideScrapButton', false)}
          onScrapedChange={action('scrap change')}
        />
      ))}
    </List>
  ))
  .add('TripleDocument', () => (
    <PoiCarouselElement
      poi={POI}
      titleTopSpacing={number('이미지와 타이틀 간격', 10)}
      description={
        boolean('커스텀 텍스트 노출', false) && (
          <Text color="blue" size="tiny">
            4 · 5성급
          </Text>
        )
      }
      resourceScraps={{
        [POI.id]: boolean('저장', false),
      }}
      additionalInfo={
        boolean('부가 정보 노출', false) ? <PricingDescription /> : null
      }
      carouselSize={select(
        '캐러셀 크기',
        ['big', 'small', 'medium', 'large'],
        undefined,
      )}
      imageFrame={select(
        '프레임 크기',
        ['4:1', '5:3', '11:7', '4:3', '1:1', '10:11', '5:8'],
        undefined,
      )}
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
