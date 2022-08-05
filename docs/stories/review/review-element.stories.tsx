import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { ReviewElement, ReviewLikesProvider } from '@titicaca/review'
import { QueryClient, QueryClientProvider } from 'react-query'

import {
  historyProviderDecorator,
  sessionContextProviderDecorator,
  tripleClientMetadataDecorator,
} from '../../decorators'

const queryClient = new QueryClient()

export default {
  component: ReviewElement,
  decorators: [
    (Story) => (
      <ReviewLikesProvider
        subscribeLikedChangeEvent={() => {}}
        notifyReviewLiked={() => {}}
        notifyReviewUnliked={() => {}}
      >
        <Story />
      </ReviewLikesProvider>
    ),
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
    historyProviderDecorator,
    sessionContextProviderDecorator,
    tripleClientMetadataDecorator,
  ],
} as ComponentMeta<typeof ReviewElement>

export const MonoImage: ComponentStoryObj<typeof ReviewElement> = {
  args: {
    review: {
      id: 'a3784ffc-79d2-4b09-b02b-e0f964b5b70d',
      resourceType: 'attraction',
      media: [
        {
          cloudinaryId: '86dc0526-2752-4382-bcf3-a462af6d1f3a',
          id: 'b6374985-7cca-4b78-bf43-cc6f9d04ecc1',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/86dc0526-2752-4382-bcf3-a462af6d1f3a.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/86dc0526-2752-4382-bcf3-a462af6d1f3a.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/86dc0526-2752-4382-bcf3-a462af6d1f3a.jpeg',
            },
          },
          width: 1078,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
      ],
      rating: 4,
      visitDate: '2022-04',
      likesCount: 3,
      reviewedAt: '2022-05-30T05:09:41.416Z',
      user: {
        unregister: false,
        uid: 'LKfR6Z3QGLb3rgKHXuJhpdgvfeS2',
        photo:
          'https://media.triple.guide/titicaca-imgs/image/upload/v1490937645/defaul_profile05_imckmy.png',
        name: 'hjazz',
        mileage: {
          level: 3,
          point: 201,
          badges: [
            {
              icon: {
                image_url:
                  'https://assets.triple.guide/images/img_badge_level3.png',
              },
            },
          ],
        },
        userBoard: {
          trips: 17,
          reviews: 0,
          thanks: 5,
          reports: 1,
          reviewsV2: 16,
          itineraries: 4,
          scraps: 0,
        },
      },
      comment: '미디어 1개',
      liked: false,
      recentTrip: false,
    },
    isMyReview: false,
    index: 0,
    onMenuClick: () => {},
    onMessageCountClick: () => {},
    isMorePage: false,
  },
}

export const DuoImages: ComponentStoryObj<typeof ReviewElement> = {
  args: {
    review: {
      id: 'a3784ffc-79d2-4b09-b02b-e0f964b5b70d',
      resourceType: 'attraction',
      media: [
        {
          cloudinaryId: '86dc0526-2752-4382-bcf3-a462af6d1f3a',
          id: 'b6374985-7cca-4b78-bf43-cc6f9d04ecc1',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/86dc0526-2752-4382-bcf3-a462af6d1f3a.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/86dc0526-2752-4382-bcf3-a462af6d1f3a.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/86dc0526-2752-4382-bcf3-a462af6d1f3a.jpeg',
            },
          },
          width: 1078,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
        {
          cloudinaryId: '91d9c1d0-300d-4fea-9146-31e339262344',
          id: '3f66edb6-b97d-420c-bfd4-54e3deb64e0d',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/91d9c1d0-300d-4fea-9146-31e339262344.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/91d9c1d0-300d-4fea-9146-31e339262344.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/91d9c1d0-300d-4fea-9146-31e339262344.jpeg',
            },
          },
          width: 1080,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
      ],
      rating: 4,
      visitDate: '2022-04',
      likesCount: 3,
      reviewedAt: '2022-05-30T05:09:41.416Z',
      user: {
        unregister: false,
        uid: 'LKfR6Z3QGLb3rgKHXuJhpdgvfeS2',
        photo:
          'https://media.triple.guide/titicaca-imgs/image/upload/v1490937645/defaul_profile05_imckmy.png',
        name: 'hjazz',
        mileage: {
          level: 3,
          point: 201,
          badges: [
            {
              icon: {
                image_url:
                  'https://assets.triple.guide/images/img_badge_level3.png',
              },
            },
          ],
        },
        userBoard: {
          trips: 17,
          reviews: 0,
          thanks: 5,
          reports: 1,
          reviewsV2: 16,
          itineraries: 4,
          scraps: 0,
        },
      },
      comment: '미디어 2개',
      liked: false,
      recentTrip: false,
    },
    isMyReview: false,
    index: 0,
    onMenuClick: () => {},
    onMessageCountClick: () => {},
    isMorePage: false,
  },
}

export const TriImages: ComponentStoryObj<typeof ReviewElement> = {
  args: {
    review: {
      id: 'a3784ffc-79d2-4b09-b02b-e0f964b5b70d',
      resourceType: 'attraction',
      media: [
        {
          cloudinaryId: '86dc0526-2752-4382-bcf3-a462af6d1f3a',
          id: 'b6374985-7cca-4b78-bf43-cc6f9d04ecc1',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/86dc0526-2752-4382-bcf3-a462af6d1f3a.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/86dc0526-2752-4382-bcf3-a462af6d1f3a.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/86dc0526-2752-4382-bcf3-a462af6d1f3a.jpeg',
            },
          },
          width: 1078,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
        {
          cloudinaryId: '91d9c1d0-300d-4fea-9146-31e339262344',
          id: '3f66edb6-b97d-420c-bfd4-54e3deb64e0d',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/91d9c1d0-300d-4fea-9146-31e339262344.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/91d9c1d0-300d-4fea-9146-31e339262344.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/91d9c1d0-300d-4fea-9146-31e339262344.jpeg',
            },
          },
          width: 1080,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
        {
          cloudinaryId: 'b1a6446b-cfb4-4fa9-9b08-d4ceeea6252f',
          id: '7c6205d7-de16-4451-9057-083001e4bb9d',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/b1a6446b-cfb4-4fa9-9b08-d4ceeea6252f.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/b1a6446b-cfb4-4fa9-9b08-d4ceeea6252f.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/b1a6446b-cfb4-4fa9-9b08-d4ceeea6252f.jpeg',
            },
          },
          width: 1080,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
      ],
      rating: 4,
      visitDate: '2022-04',
      likesCount: 3,
      reviewedAt: '2022-05-30T05:09:41.416Z',
      user: {
        unregister: false,
        uid: 'LKfR6Z3QGLb3rgKHXuJhpdgvfeS2',
        photo:
          'https://media.triple.guide/titicaca-imgs/image/upload/v1490937645/defaul_profile05_imckmy.png',
        name: 'hjazz',
        mileage: {
          level: 3,
          point: 201,
          badges: [
            {
              icon: {
                image_url:
                  'https://assets.triple.guide/images/img_badge_level3.png',
              },
            },
          ],
        },
        userBoard: {
          trips: 17,
          reviews: 0,
          thanks: 5,
          reports: 1,
          reviewsV2: 16,
          itineraries: 4,
          scraps: 0,
        },
      },
      comment: '미디어 3개',
      liked: false,
      recentTrip: false,
    },
    isMyReview: false,
    index: 0,
    onMenuClick: () => {},
    onMessageCountClick: () => {},
    isMorePage: false,
  },
}

export const QuadImages: ComponentStoryObj<typeof ReviewElement> = {
  args: {
    review: {
      id: 'a3784ffc-79d2-4b09-b02b-e0f964b5b70d',
      resourceType: 'attraction',
      media: [
        {
          cloudinaryId: '86dc0526-2752-4382-bcf3-a462af6d1f3a',
          id: 'b6374985-7cca-4b78-bf43-cc6f9d04ecc1',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/86dc0526-2752-4382-bcf3-a462af6d1f3a.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/86dc0526-2752-4382-bcf3-a462af6d1f3a.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/86dc0526-2752-4382-bcf3-a462af6d1f3a.jpeg',
            },
          },
          width: 1078,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
        {
          cloudinaryId: '91d9c1d0-300d-4fea-9146-31e339262344',
          id: '3f66edb6-b97d-420c-bfd4-54e3deb64e0d',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/91d9c1d0-300d-4fea-9146-31e339262344.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/91d9c1d0-300d-4fea-9146-31e339262344.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/91d9c1d0-300d-4fea-9146-31e339262344.jpeg',
            },
          },
          width: 1080,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
        {
          cloudinaryId: 'b1a6446b-cfb4-4fa9-9b08-d4ceeea6252f',
          id: '7c6205d7-de16-4451-9057-083001e4bb9d',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/b1a6446b-cfb4-4fa9-9b08-d4ceeea6252f.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/b1a6446b-cfb4-4fa9-9b08-d4ceeea6252f.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/b1a6446b-cfb4-4fa9-9b08-d4ceeea6252f.jpeg',
            },
          },
          width: 1080,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
        {
          cloudinaryId: 'cab00a17-2444-4671-9106-40170ed61e63',
          id: '0a784bbe-64b2-473f-88a3-9afba03cfa6d',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/cab00a17-2444-4671-9106-40170ed61e63.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/cab00a17-2444-4671-9106-40170ed61e63.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/cab00a17-2444-4671-9106-40170ed61e63.jpeg',
            },
          },
          width: 1080,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
      ],
      rating: 4,
      visitDate: '2022-04',
      likesCount: 3,
      reviewedAt: '2022-05-30T05:09:41.416Z',
      user: {
        unregister: false,
        uid: 'LKfR6Z3QGLb3rgKHXuJhpdgvfeS2',
        photo:
          'https://media.triple.guide/titicaca-imgs/image/upload/v1490937645/defaul_profile05_imckmy.png',
        name: 'hjazz',
        mileage: {
          level: 3,
          point: 201,
          badges: [
            {
              icon: {
                image_url:
                  'https://assets.triple.guide/images/img_badge_level3.png',
              },
            },
          ],
        },
        userBoard: {
          trips: 17,
          reviews: 0,
          thanks: 5,
          reports: 1,
          reviewsV2: 16,
          itineraries: 4,
          scraps: 0,
        },
      },
      comment: '미디어 4개',
      liked: false,
      recentTrip: false,
    },
    isMyReview: false,
    index: 0,
    onMenuClick: () => {},
    onMessageCountClick: () => {},
    isMorePage: false,
  },
}

export const PentaImages: ComponentStoryObj<typeof ReviewElement> = {
  args: {
    review: {
      id: 'a3784ffc-79d2-4b09-b02b-e0f964b5b70d',
      resourceType: 'attraction',
      media: [
        {
          cloudinaryId: '86dc0526-2752-4382-bcf3-a462af6d1f3a',
          id: 'b6374985-7cca-4b78-bf43-cc6f9d04ecc1',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/86dc0526-2752-4382-bcf3-a462af6d1f3a.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/86dc0526-2752-4382-bcf3-a462af6d1f3a.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/86dc0526-2752-4382-bcf3-a462af6d1f3a.jpeg',
            },
          },
          width: 1078,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
        {
          cloudinaryId: '91d9c1d0-300d-4fea-9146-31e339262344',
          id: '3f66edb6-b97d-420c-bfd4-54e3deb64e0d',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/91d9c1d0-300d-4fea-9146-31e339262344.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/91d9c1d0-300d-4fea-9146-31e339262344.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/91d9c1d0-300d-4fea-9146-31e339262344.jpeg',
            },
          },
          width: 1080,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
        {
          cloudinaryId: 'b1a6446b-cfb4-4fa9-9b08-d4ceeea6252f',
          id: '7c6205d7-de16-4451-9057-083001e4bb9d',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/b1a6446b-cfb4-4fa9-9b08-d4ceeea6252f.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/b1a6446b-cfb4-4fa9-9b08-d4ceeea6252f.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/b1a6446b-cfb4-4fa9-9b08-d4ceeea6252f.jpeg',
            },
          },
          width: 1080,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
        {
          cloudinaryId: 'cab00a17-2444-4671-9106-40170ed61e63',
          id: '0a784bbe-64b2-473f-88a3-9afba03cfa6d',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/cab00a17-2444-4671-9106-40170ed61e63.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/cab00a17-2444-4671-9106-40170ed61e63.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/cab00a17-2444-4671-9106-40170ed61e63.jpeg',
            },
          },
          width: 1080,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
        {
          cloudinaryId: 'bb6bf641-6830-452d-869a-d7a81fa05539',
          id: '8a2a0b60-bec8-4a96-a96f-c4a93e2fbaed',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/bb6bf641-6830-452d-869a-d7a81fa05539.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/bb6bf641-6830-452d-869a-d7a81fa05539.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/bb6bf641-6830-452d-869a-d7a81fa05539.jpeg',
            },
          },
          width: 1080,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
      ],
      rating: 4,
      visitDate: '2022-04',
      likesCount: 3,
      reviewedAt: '2022-05-30T05:09:41.416Z',
      user: {
        unregister: false,
        uid: 'LKfR6Z3QGLb3rgKHXuJhpdgvfeS2',
        photo:
          'https://media.triple.guide/titicaca-imgs/image/upload/v1490937645/defaul_profile05_imckmy.png',
        name: 'hjazz',
        mileage: {
          level: 3,
          point: 201,
          badges: [
            {
              icon: {
                image_url:
                  'https://assets.triple.guide/images/img_badge_level3.png',
              },
            },
          ],
        },
        userBoard: {
          trips: 17,
          reviews: 0,
          thanks: 5,
          reports: 1,
          reviewsV2: 16,
          itineraries: 4,
          scraps: 0,
        },
      },
      comment: '미디어 5개 이상',
      liked: false,
      recentTrip: false,
    },
    isMyReview: false,
    index: 0,
    onMenuClick: () => {},
    onMessageCountClick: () => {},
    isMorePage: false,
  },
}

export const MoreImages: ComponentStoryObj<typeof ReviewElement> = {
  args: {
    review: {
      id: 'a3784ffc-79d2-4b09-b02b-e0f964b5b70d',
      resourceType: 'attraction',
      media: [
        {
          cloudinaryId: '86dc0526-2752-4382-bcf3-a462af6d1f3a',
          id: 'b6374985-7cca-4b78-bf43-cc6f9d04ecc1',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/86dc0526-2752-4382-bcf3-a462af6d1f3a.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/86dc0526-2752-4382-bcf3-a462af6d1f3a.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/86dc0526-2752-4382-bcf3-a462af6d1f3a.jpeg',
            },
          },
          width: 1078,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
        {
          cloudinaryId: '91d9c1d0-300d-4fea-9146-31e339262344',
          id: '3f66edb6-b97d-420c-bfd4-54e3deb64e0d',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/91d9c1d0-300d-4fea-9146-31e339262344.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/91d9c1d0-300d-4fea-9146-31e339262344.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/91d9c1d0-300d-4fea-9146-31e339262344.jpeg',
            },
          },
          width: 1080,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
        {
          cloudinaryId: 'b1a6446b-cfb4-4fa9-9b08-d4ceeea6252f',
          id: '7c6205d7-de16-4451-9057-083001e4bb9d',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/b1a6446b-cfb4-4fa9-9b08-d4ceeea6252f.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/b1a6446b-cfb4-4fa9-9b08-d4ceeea6252f.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/b1a6446b-cfb4-4fa9-9b08-d4ceeea6252f.jpeg',
            },
          },
          width: 1080,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
        {
          cloudinaryId: 'cab00a17-2444-4671-9106-40170ed61e63',
          id: '0a784bbe-64b2-473f-88a3-9afba03cfa6d',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/cab00a17-2444-4671-9106-40170ed61e63.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/cab00a17-2444-4671-9106-40170ed61e63.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/cab00a17-2444-4671-9106-40170ed61e63.jpeg',
            },
          },
          width: 1080,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
        {
          cloudinaryId: 'bb6bf641-6830-452d-869a-d7a81fa05539',
          id: '8a2a0b60-bec8-4a96-a96f-c4a93e2fbaed',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/bb6bf641-6830-452d-869a-d7a81fa05539.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/bb6bf641-6830-452d-869a-d7a81fa05539.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/bb6bf641-6830-452d-869a-d7a81fa05539.jpeg',
            },
          },
          width: 1080,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
        {
          cloudinaryId: 'bb6bf641-6830-452d-869a-d7a81fa05539',
          id: '8a2a0b60-bec8-4a96-a96f-c4a93e2fbaed',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/bb6bf641-6830-452d-869a-d7a81fa05539.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/bb6bf641-6830-452d-869a-d7a81fa05539.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/bb6bf641-6830-452d-869a-d7a81fa05539.jpeg',
            },
          },
          width: 1080,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
        {
          cloudinaryId: 'bb6bf641-6830-452d-869a-d7a81fa05539',
          id: '8a2a0b60-bec8-4a96-a96f-c4a93e2fbaed',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/bb6bf641-6830-452d-869a-d7a81fa05539.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/bb6bf641-6830-452d-869a-d7a81fa05539.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/bb6bf641-6830-452d-869a-d7a81fa05539.jpeg',
            },
          },
          width: 1080,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
      ],
      rating: 4,
      visitDate: '2022-04',
      likesCount: 3,
      reviewedAt: '2022-05-30T05:09:41.416Z',
      user: {
        unregister: false,
        uid: 'LKfR6Z3QGLb3rgKHXuJhpdgvfeS2',
        photo:
          'https://media.triple.guide/titicaca-imgs/image/upload/v1490937645/defaul_profile05_imckmy.png',
        name: 'hjazz',
        mileage: {
          level: 3,
          point: 201,
          badges: [
            {
              icon: {
                image_url:
                  'https://assets.triple.guide/images/img_badge_level3.png',
              },
            },
          ],
        },
        userBoard: {
          trips: 17,
          reviews: 0,
          thanks: 5,
          reports: 1,
          reviewsV2: 16,
          itineraries: 4,
          scraps: 0,
        },
      },
      comment: '미디어 5개 이상',
      liked: false,
      recentTrip: false,
    },
    isMyReview: false,
    index: 0,
    onMenuClick: () => {},
    onMessageCountClick: () => {},
    isMorePage: false,
  },
}

export const MonoVideo: ComponentStoryObj<typeof ReviewElement> = {
  args: {
    review: {
      id: 'a3784ffc-79d2-4b09-b02b-e0f964b5b70d',
      resourceType: 'attraction',
      media: [
        {
          cloudinaryId: '4b8d3d73-e959-417a-89e9-0443e9a41baf',
          id: '5ba70be6-5618-4f82-9ca7-a2e5cd233816',
          type: 'video',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/video/upload/c_limit,f_auto,h_2048,w_2048/4b8d3d73-e959-417a-89e9-0443e9a41baf.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/video/upload/c_limit,f_auto,h_1024,w_1024/4b8d3d73-e959-417a-89e9-0443e9a41baf.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/video/upload/c_fill,f_auto,h_256,w_256/4b8d3d73-e959-417a-89e9-0443e9a41baf.jpeg',
            },
          },
          width: 720,
          height: 1280,
          cloudinaryBucket: 'triple-dev',
          video: {
            full: {
              url: 'https://media.triple.guide/triple-dev/video/upload/c_limit,h_2048,w_2048/4b8d3d73-e959-417a-89e9-0443e9a41baf.mp4',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/video/upload/c_limit,h_1024,w_1024/4b8d3d73-e959-417a-89e9-0443e9a41baf.mp4',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/video/upload/c_fill,h_256,w_256/4b8d3d73-e959-417a-89e9-0443e9a41baf.mp4',
            },
          },
        },
      ],
      rating: 4,
      visitDate: '2022-04',
      likesCount: 3,
      reviewedAt: '2022-05-30T05:09:41.416Z',
      user: {
        unregister: false,
        uid: 'LKfR6Z3QGLb3rgKHXuJhpdgvfeS2',
        photo:
          'https://media.triple.guide/titicaca-imgs/image/upload/v1490937645/defaul_profile05_imckmy.png',
        name: 'hjazz',
        mileage: {
          level: 3,
          point: 201,
          badges: [
            {
              icon: {
                image_url:
                  'https://assets.triple.guide/images/img_badge_level3.png',
              },
            },
          ],
        },
        userBoard: {
          trips: 17,
          reviews: 0,
          thanks: 5,
          reports: 1,
          reviewsV2: 16,
          itineraries: 4,
          scraps: 0,
        },
      },
      comment: '미디어 5개 이상',
      liked: false,
      recentTrip: false,
    },
    isMyReview: false,
    index: 0,
    onMenuClick: () => {},
    onMessageCountClick: () => {},
    isMorePage: false,
  },
}

export const DuoVideos: ComponentStoryObj<typeof ReviewElement> = {
  args: {
    review: {
      id: 'a3784ffc-79d2-4b09-b02b-e0f964b5b70d',
      resourceType: 'attraction',
      media: [
        {
          cloudinaryId: '91d9c1d0-300d-4fea-9146-31e339262344',
          id: '3f66edb6-b97d-420c-bfd4-54e3deb64e0d',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/91d9c1d0-300d-4fea-9146-31e339262344.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/91d9c1d0-300d-4fea-9146-31e339262344.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/91d9c1d0-300d-4fea-9146-31e339262344.jpeg',
            },
          },
          width: 1080,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
        {
          cloudinaryId: '4b8d3d73-e959-417a-89e9-0443e9a41baf',
          id: '5ba70be6-5618-4f82-9ca7-a2e5cd233816',
          type: 'video',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/video/upload/c_limit,f_auto,h_2048,w_2048/4b8d3d73-e959-417a-89e9-0443e9a41baf.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/video/upload/c_limit,f_auto,h_1024,w_1024/4b8d3d73-e959-417a-89e9-0443e9a41baf.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/video/upload/c_fill,f_auto,h_256,w_256/4b8d3d73-e959-417a-89e9-0443e9a41baf.jpeg',
            },
          },
          width: 720,
          height: 1280,
          cloudinaryBucket: 'triple-dev',
          video: {
            full: {
              url: 'https://media.triple.guide/triple-dev/video/upload/c_limit,h_2048,w_2048/4b8d3d73-e959-417a-89e9-0443e9a41baf.mp4',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/video/upload/c_limit,h_1024,w_1024/4b8d3d73-e959-417a-89e9-0443e9a41baf.mp4',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/video/upload/c_fill,h_256,w_256/4b8d3d73-e959-417a-89e9-0443e9a41baf.mp4',
            },
          },
        },
      ],
      rating: 4,
      visitDate: '2022-04',
      likesCount: 3,
      reviewedAt: '2022-05-30T05:09:41.416Z',
      user: {
        unregister: false,
        uid: 'LKfR6Z3QGLb3rgKHXuJhpdgvfeS2',
        photo:
          'https://media.triple.guide/titicaca-imgs/image/upload/v1490937645/defaul_profile05_imckmy.png',
        name: 'hjazz',
        mileage: {
          level: 3,
          point: 201,
          badges: [
            {
              icon: {
                image_url:
                  'https://assets.triple.guide/images/img_badge_level3.png',
              },
            },
          ],
        },
        userBoard: {
          trips: 17,
          reviews: 0,
          thanks: 5,
          reports: 1,
          reviewsV2: 16,
          itineraries: 4,
          scraps: 0,
        },
      },
      comment: '미디어 5개 이상',
      liked: false,
      recentTrip: false,
    },
    isMyReview: false,
    index: 0,
    onMenuClick: () => {},
    onMessageCountClick: () => {},
    isMorePage: false,
  },
}

export const TriVideos: ComponentStoryObj<typeof ReviewElement> = {
  args: {
    review: {
      id: 'a3784ffc-79d2-4b09-b02b-e0f964b5b70d',
      resourceType: 'attraction',
      media: [
        {
          cloudinaryId: '91d9c1d0-300d-4fea-9146-31e339262344',
          id: '3f66edb6-b97d-420c-bfd4-54e3deb64e0d',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/91d9c1d0-300d-4fea-9146-31e339262344.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/91d9c1d0-300d-4fea-9146-31e339262344.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/91d9c1d0-300d-4fea-9146-31e339262344.jpeg',
            },
          },
          width: 1080,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
        {
          cloudinaryId: '4b8d3d73-e959-417a-89e9-0443e9a41baf',
          id: '5ba70be6-5618-4f82-9ca7-a2e5cd233816',
          type: 'video',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/video/upload/c_limit,f_auto,h_2048,w_2048/4b8d3d73-e959-417a-89e9-0443e9a41baf.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/video/upload/c_limit,f_auto,h_1024,w_1024/4b8d3d73-e959-417a-89e9-0443e9a41baf.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/video/upload/c_fill,f_auto,h_256,w_256/4b8d3d73-e959-417a-89e9-0443e9a41baf.jpeg',
            },
          },
          width: 720,
          height: 1280,
          cloudinaryBucket: 'triple-dev',
          video: {
            full: {
              url: 'https://media.triple.guide/triple-dev/video/upload/c_limit,h_2048,w_2048/4b8d3d73-e959-417a-89e9-0443e9a41baf.mp4',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/video/upload/c_limit,h_1024,w_1024/4b8d3d73-e959-417a-89e9-0443e9a41baf.mp4',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/video/upload/c_fill,h_256,w_256/4b8d3d73-e959-417a-89e9-0443e9a41baf.mp4',
            },
          },
        },
        {
          cloudinaryId: 'b1a6446b-cfb4-4fa9-9b08-d4ceeea6252f',
          id: '7c6205d7-de16-4451-9057-083001e4bb9d',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/b1a6446b-cfb4-4fa9-9b08-d4ceeea6252f.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/b1a6446b-cfb4-4fa9-9b08-d4ceeea6252f.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/b1a6446b-cfb4-4fa9-9b08-d4ceeea6252f.jpeg',
            },
          },
          width: 1080,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
        {
          cloudinaryId: 'cab00a17-2444-4671-9106-40170ed61e63',
          id: '0a784bbe-64b2-473f-88a3-9afba03cfa6d',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/cab00a17-2444-4671-9106-40170ed61e63.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/cab00a17-2444-4671-9106-40170ed61e63.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/cab00a17-2444-4671-9106-40170ed61e63.jpeg',
            },
          },
          width: 1080,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
      ],
      rating: 4,
      visitDate: '2022-04',
      likesCount: 3,
      reviewedAt: '2022-05-30T05:09:41.416Z',
      user: {
        unregister: false,
        uid: 'LKfR6Z3QGLb3rgKHXuJhpdgvfeS2',
        photo:
          'https://media.triple.guide/titicaca-imgs/image/upload/v1490937645/defaul_profile05_imckmy.png',
        name: 'hjazz',
        mileage: {
          level: 3,
          point: 201,
          badges: [
            {
              icon: {
                image_url:
                  'https://assets.triple.guide/images/img_badge_level3.png',
              },
            },
          ],
        },
        userBoard: {
          trips: 17,
          reviews: 0,
          thanks: 5,
          reports: 1,
          reviewsV2: 16,
          itineraries: 4,
          scraps: 0,
        },
      },
      comment: '미디어 5개 이상',
      liked: false,
      recentTrip: false,
    },
    isMyReview: false,
    index: 0,
    onMenuClick: () => {},
    onMessageCountClick: () => {},
    isMorePage: false,
  },
}

export const MoreVideos: ComponentStoryObj<typeof ReviewElement> = {
  args: {
    review: {
      id: 'a3784ffc-79d2-4b09-b02b-e0f964b5b70d',
      resourceType: 'attraction',
      media: [
        {
          cloudinaryId: '91d9c1d0-300d-4fea-9146-31e339262344',
          id: '3f66edb6-b97d-420c-bfd4-54e3deb64e0d',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/91d9c1d0-300d-4fea-9146-31e339262344.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/91d9c1d0-300d-4fea-9146-31e339262344.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/91d9c1d0-300d-4fea-9146-31e339262344.jpeg',
            },
          },
          width: 1080,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
        {
          cloudinaryId: '4b8d3d73-e959-417a-89e9-0443e9a41baf',
          id: '5ba70be6-5618-4f82-9ca7-a2e5cd233816',
          type: 'video',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/video/upload/c_limit,f_auto,h_2048,w_2048/4b8d3d73-e959-417a-89e9-0443e9a41baf.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/video/upload/c_limit,f_auto,h_1024,w_1024/4b8d3d73-e959-417a-89e9-0443e9a41baf.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/video/upload/c_fill,f_auto,h_256,w_256/4b8d3d73-e959-417a-89e9-0443e9a41baf.jpeg',
            },
          },
          width: 720,
          height: 1280,
          cloudinaryBucket: 'triple-dev',
          video: {
            full: {
              url: 'https://media.triple.guide/triple-dev/video/upload/c_limit,h_2048,w_2048/4b8d3d73-e959-417a-89e9-0443e9a41baf.mp4',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/video/upload/c_limit,h_1024,w_1024/4b8d3d73-e959-417a-89e9-0443e9a41baf.mp4',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/video/upload/c_fill,h_256,w_256/4b8d3d73-e959-417a-89e9-0443e9a41baf.mp4',
            },
          },
        },
        {
          cloudinaryId: 'b1a6446b-cfb4-4fa9-9b08-d4ceeea6252f',
          id: '7c6205d7-de16-4451-9057-083001e4bb9d',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/b1a6446b-cfb4-4fa9-9b08-d4ceeea6252f.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/b1a6446b-cfb4-4fa9-9b08-d4ceeea6252f.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/b1a6446b-cfb4-4fa9-9b08-d4ceeea6252f.jpeg',
            },
          },
          width: 1080,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
        {
          cloudinaryId: 'cab00a17-2444-4671-9106-40170ed61e63',
          id: '0a784bbe-64b2-473f-88a3-9afba03cfa6d',
          type: 'image',
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/cab00a17-2444-4671-9106-40170ed61e63.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/cab00a17-2444-4671-9106-40170ed61e63.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/cab00a17-2444-4671-9106-40170ed61e63.jpeg',
            },
          },
          width: 1080,
          height: 1440,
          cloudinaryBucket: 'triple-dev',
        },
      ],
      rating: 4,
      visitDate: '2022-04',
      likesCount: 3,
      reviewedAt: '2022-05-30T05:09:41.416Z',
      user: {
        unregister: false,
        uid: 'LKfR6Z3QGLb3rgKHXuJhpdgvfeS2',
        photo:
          'https://media.triple.guide/titicaca-imgs/image/upload/v1490937645/defaul_profile05_imckmy.png',
        name: 'hjazz',
        mileage: {
          level: 3,
          point: 201,
          badges: [
            {
              icon: {
                image_url:
                  'https://assets.triple.guide/images/img_badge_level3.png',
              },
            },
          ],
        },
        userBoard: {
          trips: 17,
          reviews: 0,
          thanks: 5,
          reports: 1,
          reviewsV2: 16,
          itineraries: 4,
          scraps: 0,
        },
      },
      comment: '미디어 5개 이상',
      liked: false,
      recentTrip: false,
    },
    isMyReview: false,
    index: 0,
    onMenuClick: () => {},
    onMessageCountClick: () => {},
    isMorePage: false,
  },
}
