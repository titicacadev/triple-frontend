import type { Meta, StoryObj } from '@storybook/react'

import ELEMENTS from './elements'

const { animation: Animation } = ELEMENTS

export default {
  title: 'triple-document / 애니메이션',
  component: Animation,
} as Meta

export const Framer: StoryObj = {
  args: {
    value: {
      type: 'FRAMER',
      framer: {
        canvas: {
          width: 375,
          height: 528,
        },
        layers: [
          {
            frames: [
              {
                type: 'image',
                value: {
                  image: {
                    cloudinaryId: '495ccaab-e2c7-440f-97db-7a1cf027da3d',
                    id: 'feba9285-4711-4097-bc23-e78799a0103c',
                    type: 'image',
                    source: {},
                    width: 1500,
                    height: 2112,
                    cloudinaryBucket: 'triple-cms',
                    metadata: {
                      format: 'png',
                    },
                    sizes: {
                      full: {
                        url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/495ccaab-e2c7-440f-97db-7a1cf027da3d.jpeg',
                      },
                      large: {
                        url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/495ccaab-e2c7-440f-97db-7a1cf027da3d.jpeg',
                      },
                      small_square: {
                        url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/495ccaab-e2c7-440f-97db-7a1cf027da3d.jpeg',
                      },
                    },
                  },
                },
                width: 375,
                height: 528,
              },
            ],
          },
          {
            frames: [
              {
                type: 'image',
                value: {
                  image: {
                    cloudinaryId: '666151ca-6269-4917-bff5-20e99f62c2a4',
                    id: '685f7457-0cb0-4e29-82ac-b8f746abf3c1',
                    type: 'image',
                    source: {},
                    width: 1500,
                    height: 2112,
                    cloudinaryBucket: 'triple-cms',
                    metadata: {
                      format: 'png',
                    },
                    sizes: {
                      full: {
                        url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/666151ca-6269-4917-bff5-20e99f62c2a4.jpeg',
                      },
                      large: {
                        url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/666151ca-6269-4917-bff5-20e99f62c2a4.jpeg',
                      },
                      small_square: {
                        url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/666151ca-6269-4917-bff5-20e99f62c2a4.jpeg',
                      },
                    },
                  },
                },
                width: 375,
                height: 528,
              },
              {
                type: 'image',
                value: {
                  image: {
                    cloudinaryId: '20b58ab3-60a6-4e09-93b8-612e865a105a',
                    id: '1357b77b-971a-4a32-8c00-8ecc834ca678',
                    type: 'image',
                    source: {},
                    width: 1500,
                    height: 2112,
                    cloudinaryBucket: 'triple-cms',
                    metadata: {
                      format: 'png',
                    },
                    sizes: {
                      full: {
                        url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/20b58ab3-60a6-4e09-93b8-612e865a105a.jpeg',
                      },
                      large: {
                        url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/20b58ab3-60a6-4e09-93b8-612e865a105a.jpeg',
                      },
                      small_square: {
                        url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/20b58ab3-60a6-4e09-93b8-612e865a105a.jpeg',
                      },
                    },
                  },
                },
                width: 375,
                height: 528,
              },
              {
                type: 'image',
                value: {
                  image: {
                    cloudinaryId: '2eb9f5e2-feae-482a-9c8c-a4488388f633',
                    id: '21a0cac2-8c23-4395-8c17-6db286193725',
                    type: 'image',
                    source: {},
                    width: 1500,
                    height: 2112,
                    cloudinaryBucket: 'triple-cms',
                    metadata: {
                      format: 'png',
                    },
                    sizes: {
                      full: {
                        url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/2eb9f5e2-feae-482a-9c8c-a4488388f633.jpeg',
                      },
                      large: {
                        url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/2eb9f5e2-feae-482a-9c8c-a4488388f633.jpeg',
                      },
                      small_square: {
                        url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/2eb9f5e2-feae-482a-9c8c-a4488388f633.jpeg',
                      },
                    },
                  },
                },
                width: 375,
                height: 528,
              },
            ],
            transition: {
              type: 'slide',
            },
          },
          {
            frames: [
              {
                type: 'image',
                value: {
                  image: {
                    cloudinaryId: 'cde58c12-47ec-45fe-87db-9a60e0b34f15',
                    id: 'd712d0e7-b0de-4eca-b0cf-e6b5c8940ae4',
                    type: 'image',
                    source: {},
                    width: 1140,
                    height: 216,
                    cloudinaryBucket: 'triple-cms',
                    metadata: {
                      format: 'png',
                    },
                    sizes: {
                      full: {
                        url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/cde58c12-47ec-45fe-87db-9a60e0b34f15.jpeg',
                      },
                      large: {
                        url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/cde58c12-47ec-45fe-87db-9a60e0b34f15.jpeg',
                      },
                      small_square: {
                        url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/cde58c12-47ec-45fe-87db-9a60e0b34f15.jpeg',
                      },
                    },
                  },
                },
                width: 280,
                height: 54,
              },
            ],
            positioning: {
              top: 419,
            },
          },
        ],
      },
    },
  },
}

export const Lottie: StoryObj = {
  args: {
    value: {
      type: 'LOTTIE',
      lottie: {
        backgroundImage: {
          cloudinaryId: '495ccaab-e2c7-440f-97db-7a1cf027da3d',
          id: 'feba9285-4711-4097-bc23-e78799a0103c',
          type: 'image',
          source: {},
          width: 1500,
          height: 2112,
          cloudinaryBucket: 'triple-cms',
          metadata: {
            format: 'png',
          },
          sizes: {
            full: {
              url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/495ccaab-e2c7-440f-97db-7a1cf027da3d.jpeg',
            },
            large: {
              url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/495ccaab-e2c7-440f-97db-7a1cf027da3d.jpeg',
            },
            small_square: {
              url: 'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/495ccaab-e2c7-440f-97db-7a1cf027da3d.jpeg',
            },
          },
        },
        lottieAnimationId: '',
      },
    },
  },
}
