import React from 'react'
import { storiesOf } from '@storybook/react'

import { ELEMENTS } from '@titicaca/triple-document'

const { regions: Regions } = ELEMENTS

/* eslint-disable */
const REGIONS = [
  {
    id: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
    type: 'region',
    source: {
      id: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
      type: 'region',
      areas: [
        {
          id: 'af16bd5f-c629-440c-af03-39ca0fc68a02',
          name: '수쿰빗',
          hotelsCount: 476,
          hotelArticleId: 'c7c6175a-c84b-43fd-aed1-59ffb8ad6b64',
          attractionsCount: 362,
          restaurantsCount: 1716,
        },
        {
          id: '2be2e9c8-322a-4be0-9451-b826b66960a0',
          name: '씨암, 칫롬',
          hotelsCount: 298,
          hotelArticleId: 'bfbeca76-e271-4912-b238-bc528dfac320',
          attractionsCount: 422,
          restaurantsCount: 4395,
        },
        {
          id: '3c6f853c-ee6f-4fb0-a93b-d1335cc48c9d',
          name: '올드시티',
          hotelsCount: 275,
          hotelArticleId: '5949e605-4e99-4bd9-ab50-60d7a68e126f',
          attractionsCount: 230,
          restaurantsCount: 546,
        },
        {
          id: 'c92fd762-7588-4d94-a2ac-bef79dbe2535',
          name: '사톤, 실롬, 리버사이드',
          hotelsCount: 317,
          hotelArticleId: 'f9cf056d-f263-4033-8115-cdad061d1ee5',
          attractionsCount: 208,
          restaurantsCount: 871,
        },
        {
          id: '848ff90e-5fc6-4c3c-9ea6-354f35e4e1cf',
          name: '공항 근처',
          hotelsCount: 25,
          hotelArticleId: 'dc6e370b-46ec-4de4-98b4-c842f5a856b0',
          attractionsCount: 3,
          restaurantsCount: 12,
        },
        {
          id: '17b4bb3f-975e-4516-816c-1375c8b4b4a1',
          name: '파타야',
          hotelsCount: 1204,
          hotelArticleId: '498c1020-405d-424d-bc49-7521842029e6',
          attractionsCount: 120,
          restaurantsCount: 947,
        },
      ],
      names: {
        en: 'Bangkok',
        ko: '방콕',
        local: null,
      },
      style: {
        logoImageUrl:
          'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/region_media/logo_image/edf1982d-c835-43a7-b06b-af43acbb6f38-1504575746.png',
        backgroundImageUrl:
          'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/region_media/background_image/edf1982d-c835-43a7-b06b-af43acbb6f38-1489569899.png',
        backgroundVideoUrl:
          'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/region_media/background_video/edf1982d-c835-43a7-b06b-af43acbb6f38-1489569905.mp4',
        blurredBackgroundImageUrl:
          'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/region_media/blurred_background_image/edf1982d-c835-43a7-b06b-af43acbb6f38-1490177274.png',
      },
      visible: true,
      priority: 7700,
      terminals: [
        {
          id: '22feaa3e-79f5-4eff-86e2-4fa70bdb748f',
          type: 'attraction',
          source: {
            id: '22feaa3e-79f5-4eff-86e2-4fa70bdb748f',
            type: 'attraction',
            areas: [
              {
                name: '공항 근처',
              },
            ],
            grade: 1000,
            image: {
              id: '3c528ce4-3146-427c-bbd2-e9b6e68306a9',
              sizes: {
                full: {
                  url:
                    'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/full/3c528ce4-3146-427c-bbd2-e9b6e68306a9.jpg',
                },
                large: {
                  url:
                    'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/large/3c528ce4-3146-427c-bbd2-e9b6e68306a9.jpg',
                },
                small_square: {
                  url:
                    'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/small_square/3c528ce4-3146-427c-bbd2-e9b6e68306a9.jpg',
                },
              },
              title: null,
              sourceUrl:
                'http://www.e-architect.co.uk/thailand/suvarnabhumi-airport',
              description: null,
            },
            names: {
              en: 'Suvarnabhumi International Airport',
              ko: '수완나품 국제공항',
              local: 'ท่าอากาศยานสุวรรณภูมิ',
            },
            comment: null,
            location: [100.7501124, 13.6899991],
            regionId: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
            categories: [
              {
                name: '관광명소',
              },
            ],
            pointGeolocation: {
              type: 'Point',
              coordinates: [100.7501124, 13.6899991],
            },
          },
        },
        {
          id: '083ba341-aba3-4226-8de0-4ca6f484a756',
          type: 'attraction',
          source: {
            id: '083ba341-aba3-4226-8de0-4ca6f484a756',
            type: 'attraction',
            grade: 1000,
            image: {
              id: 'b6fd7b8f-5a98-4ef9-85e8-e03ed85a5d1c',
              sizes: {
                full: {
                  url:
                    'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/full/b6fd7b8f-5a98-4ef9-85e8-e03ed85a5d1c.jpg',
                },
                large: {
                  url:
                    'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/large/b6fd7b8f-5a98-4ef9-85e8-e03ed85a5d1c.jpg',
                },
                small_square: {
                  url:
                    'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/small_square/b6fd7b8f-5a98-4ef9-85e8-e03ed85a5d1c.jpg',
                },
              },
              title: null,
              sourceUrl: 'http://www.bangkok-maps.com/bangkokairport.htm',
              description: null,
            },
            names: {
              en: 'Donmueang International Airport',
              ko: '돈므앙 국제공항',
              local: 'ท่าอากาศยานดอนเมือง',
            },
            comment: null,
            location: [100.6041987, 13.9132602],
            regionId: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
            categories: [
              {
                name: '관광명소',
              },
            ],
            pointGeolocation: {
              type: 'Point',
              coordinates: [100.6041987, 13.9132602],
            },
          },
        },
      ],
      preferences: {
        time_zone: 'Asia/Bangkok',
        currencies: ['THB', 'USD'],
        recommended_duration: 3,
        default_search_radius: 1000,
      },
      hotelTagListings: [
        {
          tag: {
            id: '59e7e070-2c7a-4087-9751-c07f482002e2',
            name: '교통이 편리한',
          },
        },
        {
          tag: {
            id: 'aea83659-f4d8-4231-bc30-c7050447ebed',
            name: '수영장이 좋은',
          },
        },
        {
          tag: {
            id: 'df93d846-5a6c-42a5-a067-6301b851e7ca',
            name: '쇼핑하기 편한',
          },
        },
        {
          tag: {
            id: '1259446d-d7ac-46ea-ac8f-87e4935e8851',
            name: '뷰가 좋은',
          },
        },
        {
          tag: {
            id: '064a7031-d1da-4bb2-ae10-e111c0d8e103',
            name: '조식이 맛있는',
          },
        },
        {
          tag: {
            id: '6b107177-473b-442a-b595-ed78bde5cad2',
            name: '부티크 호텔',
          },
        },
        {
          tag: {
            id: '1d6641d3-444c-4922-9acf-6bddefb7116c',
            name: '아이와 함께',
          },
        },
        {
          tag: {
            id: '73ee800e-c5b8-4517-80d7-92a87546cd07',
            name: '전용비치',
          },
        },
      ],
      weatherForecastSpots: [
        {
          id: '5c29d743-8b27-456a-9029-69cad2b83a67',
          name: '방콕',
          geolocation: {
            type: 'Point',
            coordinates: [100.4930274, 13.7248946],
          },
        },
        {
          id: '80a07e7d-6fba-4d44-851a-d568cf464e56',
          name: '파타야',
          geolocation: {
            type: 'Point',
            coordinates: [100.90927999859616, 12.940290614215169],
          },
        },
      ],
      articleCategoryListings: [
        {
          picture: {
            id: 'a9464183-b992-4bc8-9ddd-5219a9239406',
            sizes: {
              full: {
                url:
                  'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/full/a9464183-b992-4bc8-9ddd-5219a9239406.jpg',
              },
              large: {
                url:
                  'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/large/a9464183-b992-4bc8-9ddd-5219a9239406.jpg',
              },
              small_square: {
                url:
                  'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/small_square/a9464183-b992-4bc8-9ddd-5219a9239406.jpg',
              },
            },
            title: null,
            sourceUrl: null,
            description: null,
          },
          category: {
            id: 'b1462717-952f-400c-901a-0b85d13c1331',
            name: '준비',
            icons: {},
          },
          description: '여행 전,\n필수 체크사항',
        },
        {
          picture: {
            id: 'f3a48937-7fc0-453e-8a0e-2f34d068ece1',
            sizes: {
              full: {
                url:
                  'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/full/f3a48937-7fc0-453e-8a0e-2f34d068ece1.jpg',
              },
              large: {
                url:
                  'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/large/f3a48937-7fc0-453e-8a0e-2f34d068ece1.jpg',
              },
              small_square: {
                url:
                  'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/small_square/f3a48937-7fc0-453e-8a0e-2f34d068ece1.jpg',
              },
            },
            title: null,
            sourceUrl: null,
            description: null,
          },
          category: {
            id: 'd1fa8256-a8f2-4a86-b293-27a7b65695bc',
            name: '정보',
            icons: null,
          },
          description: '알면 쓸모있는\n방콕 정보와 팁',
        },
        {
          picture: {
            id: 'ee3eb05a-ea02-4b5e-bb44-a0aabf5173bf',
            sizes: {
              full: {
                url:
                  'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/full/ee3eb05a-ea02-4b5e-bb44-a0aabf5173bf.jpg',
              },
              large: {
                url:
                  'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/large/ee3eb05a-ea02-4b5e-bb44-a0aabf5173bf.jpg',
              },
              small_square: {
                url:
                  'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/small_square/ee3eb05a-ea02-4b5e-bb44-a0aabf5173bf.jpg',
              },
            },
            title: null,
            sourceUrl: null,
            description: null,
          },
          category: {
            id: '91e59cd2-b45b-4cfe-8b7b-69dd1a546fe0',
            name: '관광',
            icons: null,
          },
          description: '볼거리, 즐길거리의\n모든 것',
        },
        {
          picture: {
            id: '5de75dca-3fa7-44c1-8b97-5c9f320c0171',
            sizes: {
              full: {
                url:
                  'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/full/5de75dca-3fa7-44c1-8b97-5c9f320c0171.jpg',
              },
              large: {
                url:
                  'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/large/5de75dca-3fa7-44c1-8b97-5c9f320c0171.jpg',
              },
              small_square: {
                url:
                  'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/pictures/small_square/5de75dca-3fa7-44c1-8b97-5c9f320c0171.jpg',
              },
            },
            title: null,
            sourceUrl: null,
            description: null,
          },
          category: {
            id: '5563700e-b3e8-482d-af61-616e8c40620f',
            name: '맛집',
            icons: null,
          },
          description: '방콕\n먹킷리스트',
        },
      ],
      attractionCategoryListings: [
        {
          picture: null,
          category: {
            id: 'abf9191a-fe28-4b36-8a9f-52a5e6d5666a',
            name: '관광명소',
            icons: {
              on: {
                sizes: {
                  large: {
                    url: null,
                  },
                  small: {
                    url:
                      'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/icons/small_image/a22144ce-9cbe-46f5-a8a9-615d9e51b62c-1487926449.png',
                  },
                },
              },
              off: {
                sizes: {
                  large: {
                    url: null,
                  },
                  small: {
                    url:
                      'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/icons/small_image/da7f5342-4474-4a28-812a-ca64d8525729-1487925715.png',
                  },
                },
              },
            },
          },
          description: null,
        },
        {
          picture: null,
          category: {
            id: 'b7e3aaee-4a0e-40b2-8ffa-99b3ec3cdff5',
            name: '테마/체험',
            icons: {
              on: {
                sizes: {
                  large: {
                    url: null,
                  },
                  small: {
                    url:
                      'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/icons/small_image/c594a106-2b2b-4ba2-8b7e-f96a0d0559c4-1487926499.png',
                  },
                },
              },
              off: {
                sizes: {
                  large: {
                    url: null,
                  },
                  small: {
                    url:
                      'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/icons/small_image/1d2ae3ee-af99-4098-bf08-51b665607fb1-1487926477.png',
                  },
                },
              },
            },
          },
          description: null,
        },
        {
          picture: null,
          category: {
            id: '95556107-682f-4335-bdd6-43175ba34ef4',
            name: '쇼핑',
            icons: {
              on: {
                sizes: {
                  large: {
                    url: null,
                  },
                  small: {
                    url:
                      'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/icons/small_image/9b7facf3-fca9-4e19-ae16-6c89ad04e3b5-1487926656.png',
                  },
                },
              },
              off: {
                sizes: {
                  large: {
                    url: null,
                  },
                  small: {
                    url:
                      'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/icons/small_image/f1f3d698-3b59-45a6-a93c-bf86b36fc137-1487926642.png',
                  },
                },
              },
            },
          },
          description: null,
        },
      ],
      restaurantCategoryListings: [
        {
          picture: null,
          category: {
            id: '280a5533-c9d0-48e8-8cad-b8c651a53d86',
            name: '음식점',
            icons: {
              on: {
                sizes: {
                  large: {
                    url: null,
                  },
                  small: {
                    url:
                      'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/icons/small_image/650ce7bd-0ef7-4ffc-9816-7aa5dd729108-1487926580.png',
                  },
                },
              },
              off: {
                sizes: {
                  large: {
                    url: null,
                  },
                  small: {
                    url:
                      'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/icons/small_image/20b2e3de-2208-416c-9fb2-8a37f3719699-1487926560.png',
                  },
                },
              },
            },
          },
          description: null,
        },
        {
          picture: null,
          category: {
            id: '55530454-0f37-4d35-a476-5d5100d2b449',
            name: '카페/디저트',
            icons: {
              on: {
                sizes: {
                  large: {
                    url: null,
                  },
                  small: {
                    url:
                      'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/icons/small_image/d0f2cbaa-bedd-4571-8273-6e5f852410da-1487926543.png',
                  },
                },
              },
              off: {
                sizes: {
                  large: {
                    url: null,
                  },
                  small: {
                    url:
                      'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/icons/small_image/57b156c4-8644-4622-8984-7dbfe528fafe-1487926526.png',
                  },
                },
              },
            },
          },
          description: null,
        },
        {
          picture: null,
          category: {
            id: 'b60013ce-5fd8-4e10-a309-0e50f47ed66e',
            name: '술집/바',
            icons: {
              on: {
                sizes: {
                  large: {
                    url: null,
                  },
                  small: {
                    url:
                      'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/icons/small_image/f441338d-47df-4f6d-bc74-04c575736489-1487926612.png',
                  },
                },
              },
              off: {
                sizes: {
                  large: {
                    url: null,
                  },
                  small: {
                    url:
                      'https://triple-cms-development.s3-ap-northeast-1.amazonaws.com/icons/small_image/546a044a-b80e-430b-87a3-814c491b6189-1487926594.png',
                  },
                },
              },
            },
          },
          description: null,
        },
      ],
    },
    nameOverride: null,
  },
]
/* eslint-enable */

storiesOf('TripleDocument', module).add('도시', () => (
  <Regions value={{ regions: REGIONS }} />
))
