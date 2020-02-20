import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'
import { List, Container, Text } from '@titicaca/core-elements'
import { PoiCarouselElement, PoiListElement } from '@titicaca/poi-list-elements'

import POIS from './pois.sample.json'
import HOTELS from './hotels.sample.json'

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
  .add('호텔 리스트', () => (
    <List divided>
      {HOTELS.map((hotel, idx) => (
        <PoiListElement
          key={idx}
          poi={hotel}
          resourceScraps={{
            [hotel.id]: boolean('저장', false),
          }}
          pricingNote="1박, 세금포함"
          pricingDescription={<PricingDescription />}
          noDivider={boolean('라인 생략', false) && idx % 2 === 0}
          tags={
            idx % 2 === 0 && [
              { text: '추가 할인쿠폰', color: 'green', emphasized: true },
            ]
          }
          hideScrapButton={boolean('hideScrapButton', false)}
        />
      ))}
    </List>
  ))
  .add('TripleDocument', () => (
    <PoiCarouselElement
      poi={POI}
      descriptionText={
        boolean('커스텀 텍스트 노출', false) && (
          <Text color="blue" size="tiny">
            4 · 5성급
          </Text>
        )
      }
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
