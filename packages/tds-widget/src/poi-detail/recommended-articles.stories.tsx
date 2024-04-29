import type { Meta, StoryObj } from '@storybook/react'
import { rest } from 'msw'

import { PoiDetailRecommendedArticles } from './recommended-articles/recommended-articles'

const meta: Meta<typeof PoiDetailRecommendedArticles> = {
  title: 'tds-widget / poi-detail / RecommendedArticles',
  component: PoiDetailRecommendedArticles,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
}

export default meta

type Story = StoryObj<typeof PoiDetailRecommendedArticles>

export const Basic: Story = {
  args: {
    appInstallationCta: {
      inventoryId: 'app-install-cta-poi-v1',
      href: 'https://triple-dev.titicaca-corp.com',
    },
    regionId: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
  },
  parameters: {
    msw: {
      handlers: [
        rest.get(
          '/api/content/articles?geotags%5B0%5D%5Btype%5D=triple-region&geotags%5B0%5D%5Bid%5D=edf1982d-c835-43a7-b06b-af43acbb6f38&sortBy=scrap',
          async (req, res, ctx) => {
            return res(
              ctx.json([
                {
                  id: '10465daa-d6c5-41c1-b8e1-09b96ee79f03',
                  source: {
                    id: '10465daa-d6c5-41c1-b8e1-09b96ee79f03',
                    type: 'article',
                    regionId: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                    title: '여행을 더욱 풍성하게, 방콕 대표 축제',
                    summary: '월별로 알아보는 방콕 대표 축제들',
                    image: {
                      cloudinaryId: '0aa2a4dd-4c8b-4285-8312-6f45f86ae512',
                      id: '24be1f76-c25d-4ffe-a049-a94d486a8f26',
                      type: 'image',
                      sizes: {
                        full: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/0aa2a4dd-4c8b-4285-8312-6f45f86ae512.jpeg',
                        },
                        large: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/0aa2a4dd-4c8b-4285-8312-6f45f86ae512.jpeg',
                        },
                        small_square: {
                          url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/0aa2a4dd-4c8b-4285-8312-6f45f86ae512.jpeg',
                        },
                      },
                      source: {},
                      sourceUrl: 'shutterstock.com',
                    },
                    reviewsCount: 0,
                    scrapsCount: 2,
                    geotags: [
                      {
                        id: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                        type: 'triple-region',
                      },
                    ],
                  },
                  type: 'article',
                  reviewed: false,
                  scraped: false,
                },
                {
                  id: '057b607f-81db-475f-843d-eaca121e98b0',
                  source: {
                    id: '057b607f-81db-475f-843d-eaca121e98b0',
                    type: 'article',
                    regionId: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                    title: '월별로 알아보는 방콕 날씨',
                    summary:
                      '여행 가기에 가장 좋은 시기는 언제? 방콕의 월별 기온과 강우량',
                    image: {
                      cloudinaryId: '0e1df5e5-bfed-4d02-9f69-7e6b8167ed9e',
                      id: 'd5c1eb97-f1cf-480a-a787-ddf135f71de9',
                      type: 'image',
                      sizes: {
                        full: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/0e1df5e5-bfed-4d02-9f69-7e6b8167ed9e.jpeg',
                        },
                        large: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/0e1df5e5-bfed-4d02-9f69-7e6b8167ed9e.jpeg',
                        },
                        small_square: {
                          url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/0e1df5e5-bfed-4d02-9f69-7e6b8167ed9e.jpeg',
                        },
                      },
                      source: {},
                      sourceUrl: 'shutterstock.com',
                    },
                    reviewsCount: 0,
                    scrapsCount: 2,
                    geotags: [
                      {
                        id: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                        type: 'triple-region',
                      },
                    ],
                  },
                  type: 'article',
                  reviewed: false,
                  scraped: false,
                },
                {
                  id: '1c86606b-d674-4c0c-a161-c6af2f2dc5c0',
                  source: {
                    id: '1c86606b-d674-4c0c-a161-c6af2f2dc5c0',
                    type: 'article',
                    regionId: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                    title: '방콕 기초 정보',
                    summary: '떠나기 전 미리 알아두면 좋을 여행 정보',
                    image: {
                      cloudinaryId: '7e9e48c4-f4b5-4aac-9c45-7537324458cc',
                      id: '5f68c41a-3897-4eca-98d7-749160052a67',
                      type: 'image',
                      sizes: {
                        full: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/7e9e48c4-f4b5-4aac-9c45-7537324458cc.jpeg',
                        },
                        large: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/7e9e48c4-f4b5-4aac-9c45-7537324458cc.jpeg',
                        },
                        small_square: {
                          url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/7e9e48c4-f4b5-4aac-9c45-7537324458cc.jpeg',
                        },
                      },
                      source: {},
                      sourceUrl: 'shutterstock.com',
                    },
                    reviewsCount: 1,
                    scrapsCount: 2,
                    geotags: [
                      {
                        id: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                        type: 'triple-region',
                      },
                    ],
                  },
                  type: 'article',
                  reviewed: false,
                  scraped: false,
                },
                {
                  id: 'eff78728-f75c-4f0f-814c-5fc91384115d',
                  source: {
                    id: 'eff78728-f75c-4f0f-814c-5fc91384115d',
                    type: 'article',
                    regionId: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                    title: '방콕 근교까지 즐기는 3박 4일 추천 코스',
                    summary: '방콕 시내는 물론 근교까지 한 번에 다녀오기',
                    image: {
                      cloudinaryId: '58af5f8e-180b-4ee6-9844-dd8b95ccbbf4',
                      id: '28b473d6-fa23-476f-890f-71bd320ad236',
                      type: 'image',
                      sizes: {
                        full: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/58af5f8e-180b-4ee6-9844-dd8b95ccbbf4.jpeg',
                        },
                        large: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/58af5f8e-180b-4ee6-9844-dd8b95ccbbf4.jpeg',
                        },
                        small_square: {
                          url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/58af5f8e-180b-4ee6-9844-dd8b95ccbbf4.jpeg',
                        },
                      },
                      source: {},
                      sourceUrl: 'shutterstock.com',
                    },
                    geotags: [
                      {
                        id: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                        type: 'triple-region',
                      },
                    ],
                    scrapsCount: 1,
                  },
                  type: 'article',
                  reviewed: false,
                  scraped: false,
                },
                {
                  id: 'ea850d61-0010-4598-a2a4-ab088610700e',
                  source: {
                    id: 'ea850d61-0010-4598-a2a4-ab088610700e',
                    type: 'article',
                    regionId: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                    title: '해외 여행의 특권, 면세 쇼핑하기',
                    summary: '면세품을 구입할 수 있는 다양한 방법들 소개',
                    image: {
                      cloudinaryId: '5165dd01-3c43-47da-bf57-0b24a22a17e1',
                      id: '0bdf927f-5ef7-4f61-965f-bec2d974847d',
                      type: 'image',
                      sizes: {
                        full: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/5165dd01-3c43-47da-bf57-0b24a22a17e1.jpeg',
                        },
                        large: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/5165dd01-3c43-47da-bf57-0b24a22a17e1.jpeg',
                        },
                        small_square: {
                          url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/5165dd01-3c43-47da-bf57-0b24a22a17e1.jpeg',
                        },
                      },
                      source: {},
                      width: 1000,
                      height: 667,
                      sourceUrl: 'shutterstock.com',
                    },
                    reviewsCount: 1,
                    scrapsCount: 0,
                    geotags: [
                      {
                        id: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                        type: 'triple-region',
                      },
                    ],
                  },
                  type: 'article',
                  reviewed: false,
                  scraped: false,
                },
                {
                  id: 'ef42a012-b3a0-4ccf-949b-a462ed8c26c1',
                  source: {
                    id: 'ef42a012-b3a0-4ccf-949b-a462ed8c26c1',
                    type: 'article',
                    regionId: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                    title: '현지에서 똑똑하게 카드 사용하는 방법',
                    summary:
                      '사용할 수 있는 카드와 수수료 절약 방법 그리고 이용팁까지',
                    image: {
                      cloudinaryId: '04c4a061-fefa-43d2-b7f2-163272b87d83',
                      id: '04c4a061-fefa-43d2-b7f2-163272b87d83',
                      type: 'image',
                      sizes: {
                        full: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/04c4a061-fefa-43d2-b7f2-163272b87d83.jpeg',
                        },
                        large: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/04c4a061-fefa-43d2-b7f2-163272b87d83.jpeg',
                        },
                        small_square: {
                          url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/04c4a061-fefa-43d2-b7f2-163272b87d83.jpeg',
                        },
                      },
                      source: {},
                      width: 1000,
                      height: 664,
                      sourceUrl: 'shutterstock.com',
                    },
                    geotags: [
                      {
                        id: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                        type: 'triple-region',
                      },
                    ],
                  },
                  type: 'article',
                  reviewed: false,
                  scraped: false,
                },
                {
                  id: '06bf2d91-f54b-477e-8e6c-cef08f4aa0c4',
                  source: {
                    id: '06bf2d91-f54b-477e-8e6c-cef08f4aa0c4',
                    type: 'article',
                    regionId: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                    title: '인천 국제공항 제 2터미널 안내',
                    summary: '인천 국제공항 제 2터미널의 대표 시설 알아보기',
                    image: {
                      cloudinaryId: '93440699-4c06-4847-8c5d-8122cbf7c0cc',
                      id: '93440699-4c06-4847-8c5d-8122cbf7c0cc',
                      type: 'image',
                      sizes: {
                        full: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/93440699-4c06-4847-8c5d-8122cbf7c0cc.jpeg',
                        },
                        large: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/93440699-4c06-4847-8c5d-8122cbf7c0cc.jpeg',
                        },
                        small_square: {
                          url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/93440699-4c06-4847-8c5d-8122cbf7c0cc.jpeg',
                        },
                      },
                      source: {},
                      width: 1080,
                      height: 544,
                      sourceUrl:
                        'https://www.facebook.com/incheonairport/photos/a.355745784527921/2026404927461990/?type=3&theater',
                    },
                    geotags: [
                      {
                        id: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                        type: 'triple-region',
                      },
                    ],
                  },
                  type: 'article',
                  reviewed: false,
                  scraped: false,
                },
                {
                  id: '7af75ad3-a4d6-405c-8ea6-232fcdaee6e5',
                  source: {
                    id: '7af75ad3-a4d6-405c-8ea6-232fcdaee6e5',
                    type: 'article',
                    regionId: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                    title: '파타야 베스트 추천 호텔',
                    summary: '가족, 친구, 연인과 가기 좋은 파타야 베스트 호텔',
                    image: {
                      cloudinaryId: 'b9b96247-d9dd-444c-9bd2-e751b0ba14d4',
                      id: 'd1ae4961-4003-452a-bbb7-957f6ad32c7e',
                      type: 'image',
                      sizes: {
                        full: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/b9b96247-d9dd-444c-9bd2-e751b0ba14d4.jpeg',
                        },
                        large: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/b9b96247-d9dd-444c-9bd2-e751b0ba14d4.jpeg',
                        },
                        small_square: {
                          url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/b9b96247-d9dd-444c-9bd2-e751b0ba14d4.jpeg',
                        },
                      },
                      source: {},
                      sourceUrl: 'shutterstock.com',
                    },
                    geotags: [
                      {
                        id: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                        type: 'triple-region',
                      },
                    ],
                  },
                  type: 'article',
                  reviewed: false,
                  scraped: false,
                },
                {
                  id: '16ac3ab2-ab72-4830-8bc5-91044567bb6b',
                  source: {
                    id: '16ac3ab2-ab72-4830-8bc5-91044567bb6b',
                    type: 'article',
                    regionId: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                    title: '출국 과정의 모든 것',
                    summary: '공항 도착부터 출국까지, 이것만 알면 걱정 끝!',
                    image: {
                      cloudinaryId: '219ad9ac-6d9b-4826-ac66-1002810d00a6',
                      id: '219ad9ac-6d9b-4826-ac66-1002810d00a6',
                      type: 'image',
                      sizes: {
                        full: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/219ad9ac-6d9b-4826-ac66-1002810d00a6.jpeg',
                        },
                        large: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/219ad9ac-6d9b-4826-ac66-1002810d00a6.jpeg',
                        },
                        small_square: {
                          url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/219ad9ac-6d9b-4826-ac66-1002810d00a6.jpeg',
                        },
                      },
                      source: {},
                      width: 1000,
                      height: 574,
                      sourceUrl: 'shutterstock.com',
                    },
                    geotags: [
                      {
                        id: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                        type: 'triple-region',
                      },
                    ],
                  },
                  type: 'article',
                  reviewed: false,
                  scraped: false,
                },
                {
                  id: '99ffd38e-8db0-450a-a753-dbde6f47a004',
                  source: {
                    id: '99ffd38e-8db0-450a-a753-dbde6f47a004',
                    type: 'article',
                    regionId: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                    title: '대구국제공항 가는 길',
                    summary: '대구국제공항 가는 교통편 알아보기',
                    image: {
                      cloudinaryId: '65dcdeac-0d62-4a79-9831-9037dc212a3d',
                      id: '65dcdeac-0d62-4a79-9831-9037dc212a3d',
                      type: 'image',
                      sizes: {
                        full: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/65dcdeac-0d62-4a79-9831-9037dc212a3d.jpeg',
                        },
                        large: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/65dcdeac-0d62-4a79-9831-9037dc212a3d.jpeg',
                        },
                        small_square: {
                          url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/65dcdeac-0d62-4a79-9831-9037dc212a3d.jpeg',
                        },
                      },
                      source: {},
                      width: 1000,
                      height: 667,
                      sourceUrl: 'shutterstock.com',
                    },
                    geotags: [
                      {
                        id: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                        type: 'triple-region',
                      },
                    ],
                  },
                  type: 'article',
                  reviewed: false,
                  scraped: false,
                },
                {
                  id: '52b03281-1674-48fd-b65f-6dccd86e3af1',
                  source: {
                    id: '52b03281-1674-48fd-b65f-6dccd86e3af1',
                    type: 'article',
                    regionId: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                    title: '방콕 교통 완전 정복',
                    summary: '편리한 여행을 위한 교통 수단 정보 모음',
                    image: {
                      cloudinaryId: '242f51be-cdaa-425d-bb0c-9fda4d5b5535',
                      id: '242f51be-cdaa-425d-bb0c-9fda4d5b5535',
                      type: 'image',
                      sizes: {
                        full: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/242f51be-cdaa-425d-bb0c-9fda4d5b5535.jpeg',
                        },
                        large: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/242f51be-cdaa-425d-bb0c-9fda4d5b5535.jpeg',
                        },
                        small_square: {
                          url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/242f51be-cdaa-425d-bb0c-9fda4d5b5535.jpeg',
                        },
                      },
                      source: {},
                      width: 1000,
                      height: 616,
                      sourceUrl: 'shutterstock.com',
                    },
                    geotags: [
                      {
                        id: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                        type: 'triple-region',
                      },
                    ],
                  },
                  type: 'article',
                  reviewed: false,
                  scraped: false,
                },
                {
                  id: '38dd8e08-d261-4289-a612-97ab5b3ae68f',
                  source: {
                    id: '38dd8e08-d261-4289-a612-97ab5b3ae68f',
                    type: 'article',
                    regionId: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                    title: '출국 전 체크사항',
                    summary:
                      '방콕 여행을 떠나기 전, 반드시 챙겨야 할 체크리스트',
                    image: {
                      cloudinaryId: '5f8e905a-4c97-40e5-81f7-1fa63f6bea87',
                      id: '5f8e905a-4c97-40e5-81f7-1fa63f6bea87',
                      type: 'image',
                      sizes: {
                        full: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/5f8e905a-4c97-40e5-81f7-1fa63f6bea87.jpeg',
                        },
                        large: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/5f8e905a-4c97-40e5-81f7-1fa63f6bea87.jpeg',
                        },
                        small_square: {
                          url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/5f8e905a-4c97-40e5-81f7-1fa63f6bea87.jpeg',
                        },
                      },
                      source: {},
                      width: 1000,
                      height: 667,
                      sourceUrl: 'shutterstock.com',
                    },
                    geotags: [
                      {
                        id: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                        type: 'triple-region',
                      },
                    ],
                  },
                  type: 'article',
                  reviewed: false,
                  scraped: false,
                },
                {
                  id: '78548075-da47-40a1-ad0e-9d1b61d15fc6',
                  source: {
                    id: '78548075-da47-40a1-ad0e-9d1b61d15fc6',
                    type: 'article',
                    regionId: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                    title: '방콕 여행 꿀팁 가이드',
                    summary: '알면 쓸모 있는 요모조모 방콕 필수 팁',
                    image: {
                      cloudinaryId: '00de8510-06b2-4837-b6c9-c30f091983af',
                      id: 'b622576d-f5ff-4284-8861-0fa333b1921c',
                      type: 'image',
                      sizes: {
                        full: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/00de8510-06b2-4837-b6c9-c30f091983af.jpeg',
                        },
                        large: {
                          url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/00de8510-06b2-4837-b6c9-c30f091983af.jpeg',
                        },
                        small_square: {
                          url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/00de8510-06b2-4837-b6c9-c30f091983af.jpeg',
                        },
                      },
                      source: {},
                      sourceUrl: 'shutterstock.com',
                    },
                    geotags: [
                      {
                        id: 'edf1982d-c835-43a7-b06b-af43acbb6f38',
                        type: 'triple-region',
                      },
                    ],
                  },
                  type: 'article',
                  reviewed: false,
                  scraped: false,
                },
              ]),
            )
          },
        ),
      ],
    },
  },
}
