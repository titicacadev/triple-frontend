import React from 'react'
import { storiesOf } from '@storybook/react'

import { ELEMENTS } from '@titicaca/triple-design-system'

const { pois: Pois } = ELEMENTS
const POIS = [
  {
    id: '1239f853-d0b3-40e3-9c96-1ae7bb0c24ef',
    type: 'restaurant',
    price: '₩100100',
    source: {
      id: '1239f853-d0b3-40e3-9c96-1ae7bb0c24ef',
      type: 'restaurant',
      areas: [
        {
          name: '하카타',
        },
      ],
      grade: 30,
      image: {
        id: 'ec56bd12-9dd3-4826-904a-e4877ea1eab1',
        sizes: {
          full: {
            url:
              'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/full/ec56bd12-9dd3-4826-904a-e4877ea1eab1.jpg',
          },
          large: {
            url:
              'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/large/ec56bd12-9dd3-4826-904a-e4877ea1eab1.jpg',
          },
          small_square: {
            url:
              'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/small_square/ec56bd12-9dd3-4826-904a-e4877ea1eab1.jpg',
          },
        },
        title: null,
        sourceUrl: 'http://blog.naver.com/99s_asia/40168557367',
        description: null,
      },
      names: {
        en: 'Hakata Famous Yoshizuka Eel Restaurant',
        ko: '요시즈카 우나기야',
        local: '博多名代 吉塚うなぎ屋',
      },
      comment: '140년 전통을 잇는 장어덮밥을 맛볼 수 있는 곳',
      location: [130.408868, 33.592528],
      regionId: '92ba56af-a93e-4877-a46a-3b84cf1af0cf',
      categories: [
        {
          name: '음식점',
        },
      ],
      pointGeolocation: {
        type: 'Point',
        coordinates: [130.408868, 33.592528],
      },
    },
    buttonType: 'price',
    nameOverride: null,
  },
  {
    id: '0d11433e-db37-4168-bb3c-3cf20f3ddfbb',
    type: 'hotel',
    source: {
      id: '0d11433e-db37-4168-bb3c-3cf20f3ddfbb',
      tags: [
        {
          name: '아이와 함께',
        },
        {
          name: '수영장이 좋은',
        },
      ],
      type: 'hotel',
      areas: [
        {
          name: '화이트 비치 북쪽',
        },
      ],
      grade: 10,
      image: {
        id: 'f54226e0-dc8e-430e-aa8a-316b71dd5609',
        sizes: {
          full: {
            url:
              'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/full/f54226e0-dc8e-430e-aa8a-316b71dd5609.jpg',
          },
          large: {
            url:
              'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/large/f54226e0-dc8e-430e-aa8a-316b71dd5609.jpg',
          },
          small_square: {
            url:
              'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/small_square/f54226e0-dc8e-430e-aa8a-316b71dd5609.jpg',
          },
        },
        title: null,
        sourceUrl:
          'https://www.facebook.com/altavistadeboracay/photos/a.312816762002.159781.267575457002/10153848660612003/?type=3&theater',
        description: null,
      },
      names: {
        en: 'Alta Vista De Boracay',
        ko: '알타 비스타 데 보라카이',
        local: 'Alta Vista De Boracay',
      },
      comment:
        '수상스포츠의 천국 야팍 지역에 위치한 실용적인 객실을 갖춘 리조트',
      location: [121.91238, 11.98796],
      regionId: '22d7cfbd-2210-4ccb-94c4-cf1d97614dfe',
      starRating: 4,
      pointGeolocation: {
        type: 'Point',
        coordinates: [121.91238, 11.98796],
      },
    },
  },
  {
    id: '06b4bbb2-aacc-4b46-ac53-d9ccca29be9d',
    type: 'hotel',
    source: {
      id: '06b4bbb2-aacc-4b46-ac53-d9ccca29be9d',
      type: 'hotel',
      grade: 10,
      image: {
        id: '45b25738-858c-49c4-ae39-75f6628d3d7c',
        sizes: {
          full: {
            url:
              'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/full/45b25738-858c-49c4-ae39-75f6628d3d7c.jpg',
          },
          large: {
            url:
              'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/large/45b25738-858c-49c4-ae39-75f6628d3d7c.jpg',
          },
          small_square: {
            url:
              'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/small_square/45b25738-858c-49c4-ae39-75f6628d3d7c.jpg',
          },
        },
        title: null,
        sourceUrl: 'https://www.expedia.com/',
        description: null,
      },
      names: {
        en: 'The Bicycle Hotel & Casino',
        ko: '더 바이시클 호텔 & 카지노',
        local: 'The Bicycle Hotel & Casino',
      },
      comment:
        '라이브 공연부터 파티까지 다양한 즐길 거리와 넓은 객실을 갖춘 호텔',
      pricing: {
        promoText: '최대 16%',
        nightlyPrice: 252685,
        nightlyBasePrice: 303000,
        clubPromotionRate: 3,
        nightlyPriceHotelPromotionApplied: 260500,
      },
      location: [-118.16585, 33.96587],
      regionId: '25f11d9d-7267-43da-a3ae-cb12b1042380',
      starRating: 4,
      pointGeolocation: {
        type: 'Point',
        coordinates: [-118.16585, 33.96587],
      },
    },
  },
]

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
  .add('리스트', () => (
    <Pois
      resourceScraps={{}}
      value={{
        pois: POIS.slice(0, 2),
        display: 'list',
      }}
    />
  ))
  .add('리스트 (호텔 w/ 가격)', () => (
    <Pois
      resourceScraps={{}}
      value={{
        pois: POIS.slice(2, 3),
        display: 'list',
      }}
    />
  ))
