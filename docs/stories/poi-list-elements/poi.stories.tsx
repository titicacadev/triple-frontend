import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, number, select, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { List, Container, Text } from '@titicaca/core-elements'
import {
  PoiCarouselElement,
  PoiListElement,
  POICardElement,
} from '@titicaca/poi-list-elements'
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
  .add('POI 리스트 (as div)', () => (
    <PoiListElement
      as={text('as', 'div')}
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
          isAdvertisement={boolean('광고 상품', false)}
          maxCommentLines={number('comment 최대 노출', 0)}
          pricingNote="1박, 세금포함"
          priceLabelOverride={text('pricing custom text', '')}
          pricingDescription={<PricingDescription />}
          isSoldOut={boolean('판매완료', false)}
          tags={
            idx % 2 === 0
              ? [{ text: '추가 할인쿠폰', color: 'green', emphasized: true }]
              : undefined
          }
          hideDiscountRate={boolean('hideDiscountRate', false)}
          hideScrapButton={boolean('hideScrapButton', false)}
          onScrapedChange={action('scrap change')}
          {...(boolean('distance 표시', false)
            ? {
                distance: text('distance', '300m'),
                distanceSuffix: text('distanceSuffix', ' 이내'),
              }
            : {})}
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
  .add('POI Card Element (호텔)', () => (
    <POICardElement
      type="hotel"
      names={{
        ko: text('ko name', '아일랜드 퍼시픽 호텔'),
        en: text('en name', 'Island Pacific Hotel'),
        local: text('local name', '港岛太平洋饭店'),
      }}
      regionId={text('regionId', '84685a5a-a0ee-47b5-b84c-4d76dffad76d')}
      image={{
        id: '',
        title: null,
        description: null,
        sourceUrl: '',
        sizes: {
          large: {
            url:
              'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/large/883a655b-adf0-4dd5-a350-3dd12852dd52.jpg',
          },
          smallSquare: {
            url:
              'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/small_square/883a655b-adf0-4dd5-a350-3dd12852dd52.jpg',
          },
          full: {
            url:
              'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/full/883a655b-adf0-4dd5-a350-3dd12852dd52.jpg',
          },
        },
      }}
      comment={text(
        'comment',
        '아시아부터 서양 요리까지 준비된 가성비 좋은 호텔',
      )}
      reviewsRating={number('reviewsRating', 5)}
      reviewsCount={number('reviewsCount', 1)}
      nightlyPrice={number('nightlyPrice', 120094)}
      scraped={boolean('scraped', false)}
      scrapsCount={number('scrapesCount', 0)}
      distance={text('distance', '300m')}
      onClick={action('onClick')}
      onScrapedChange={action('onScrapedChange')}
      onDirectionButtonClick={action('onDirectionButtonClick')}
    />
  ))
  .add('POI Card Element (POI)', () => (
    <POICardElement
      type={select('type', ['attraction', 'restaurant'], 'attraction')}
      names={{
        ko: text('ko name', '왓 포 사원'),
        en: text('en name', 'Temple of the Reclining Buddha (Wat Pho)'),
        local: text('local name', 'วัดโพธิ์'),
      }}
      regionId={text('regionId', 'edf1982d-c835-43a7-b06b-af43acbb6f38')}
      image={{
        sourceUrl:
          'http://www.our-thailand-vacations.com/reclining-buddha-bangkok.html',
        sizes: {
          large: {
            url:
              'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/large/f9ff3ed6-990e-4270-a810-d9409befa31f.jpg',
          },
          smallSquare: {
            url:
              'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/small_square/f9ff3ed6-990e-4270-a810-d9409befa31f.jpg',
          },
          full: {
            url:
              'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/full/f9ff3ed6-990e-4270-a810-d9409befa31f.jpg',
          },
        },
        description: null,
        id: 'f9ff3ed6-990e-4270-a810-d9409befa31f',
        title: null,
      }}
      comment={text(
        'comment',
        '아유타야 양식으로 지어진 방콕 최대 규모의 유서깊은 사원',
      )}
      reviewsRating={number('reviewsRating', 5)}
      reviewsCount={number('reviewsCount', 1)}
      scraped={boolean('scraped', false)}
      scrapsCount={number('scrapesCount', 0)}
      categoryName={text('categoryName', '관광명소')}
      areaName={text('areaName', '올드시티')}
      onClick={action('onClick')}
      onScrapedChange={action('onScrapedChange')}
      onDirectionButtonClick={action('onDirectionButtonClick')}
    />
  ))
