import React from 'react'
import { boolean, number, select, text } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { List, Container, Text } from '@titicaca/core-elements'
import {
  PoiCarouselElement,
  PoiListElement,
  POICardElement,
} from '@titicaca/poi-list-elements'
import {
  ListingPOI as POIData,
  ListingHotel as HotelData,
} from '@titicaca/type-definitions'

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

const [POI] = (POIS as unknown[]) as Exclude<POIData, HotelData>[]

export default {
  title: 'poi-list-elements / POI',
}

export function PoiList() {
  return <PoiListElement as={text('as', 'div') as any} poi={POI} />
}

PoiList.storyName = 'POI 리스트'

export function HotelList() {
  return (
    <List divided>
      {((HOTELS as unknown[]) as HotelData[]).map((hotel, idx) => (
        <PoiListElement
          key={idx}
          poi={hotel}
          isAdvertisement={boolean('광고 상품', false)}
          maxCommentLines={number('comment 최대 노출', 0)}
          hideScrapButton={boolean('hideScrapButton', false)}
          notes={
            boolean('custom note', false) ? ['3성급', '판교 백현동'] : undefined
          }
          {...(boolean('distance 표시', false)
            ? {
                distance: text('distance', '300m'),
                distanceSuffix: text('distanceSuffix', ' 이내'),
              }
            : {})}
        />
      ))}
    </List>
  )
}

HotelList.storyName = '호텔 리스트'

export function TripleDocument() {
  return (
    <>
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
        onImpress={
          boolean('onImpress', false) ? action('onImpress') : undefined
        }
      />
    </>
  )
}

TripleDocument.storyName = 'TripleDocument'

export function TripleDocumentList() {
  return <PoiListElement compact poi={POI} />
}

TripleDocumentList.storyName = 'TripleDocument 리스트'

export function PoiCardElementsTypeHotel() {
  return (
    <POICardElement
      id={text('id', 'f72d2f50-2efb-4469-a903-47ad6b0c0740')}
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
      priceLabelOverride={
        boolean('use priceLabelOverride', false) ? (
          <Text inlineBlock size="small" color="gray300" bold>
            판매 완료
          </Text>
        ) : undefined
      }
      scraped={boolean('scraped', false)}
      scrapsCount={number('scrapesCount', 0)}
      distance={text('distance', '300m')}
      onClick={action('onClick')}
      onDirectionButtonClick={action('onDirectionButtonClick')}
    />
  )
}

PoiCardElementsTypeHotel.stroy = {
  name: 'POI Card Element (호텔)',
}

export function PoiCardElementsTypePoi() {
  return (
    <POICardElement
      id={text('id', 'f72d2f50-2efb-4469-a903-47ad6b0c0740')}
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
      onDirectionButtonClick={action('onDirectionButtonClick')}
    />
  )
}

PoiCardElementsTypePoi.storyName = 'POI Card Element (POI)'
