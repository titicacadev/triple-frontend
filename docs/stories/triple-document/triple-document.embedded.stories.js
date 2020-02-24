import React from 'react'
import { storiesOf } from '@storybook/react'

import { ELEMENTS } from '@titicaca/triple-document'

const { embedded: Embedded } = ELEMENTS

storiesOf('TripleDocument | TripleDocument', module).add('임베딩', () => (
  <Embedded
    value={{
      entries: [
        [
          {
            type: 'images',
            value: {
              images: [
                {
                  id: '578bbb87-9ed3-443a-8cb3-b0b4a2b3e1ea',
                  frame: 'large',
                  sizes: {
                    full: {
                      url:
                        'https://res.cloudinary.com/triple-dev/image/upload/w_2048,h_2048,c_limit/578bbb87-9ed3-443a-8cb3-b0b4a2b3e1ea.jpg',
                    },
                    large: {
                      url:
                        'https://res.cloudinary.com/triple-dev/image/upload/w_1024,h_1024,c_limit/578bbb87-9ed3-443a-8cb3-b0b4a2b3e1ea.jpg',
                    },
                    small_square: {
                      url:
                        'https://res.cloudinary.com/triple-dev/image/upload/w_256,h_256,c_fill/578bbb87-9ed3-443a-8cb3-b0b4a2b3e1ea.jpg',
                    },
                  },
                  title: '',
                  width: 960,
                  height: 640,
                  sourceUrl: 'http://www.naver.com/',
                  description: '',
                },
              ],
            },
          },
          {
            type: 'heading3',
            value: {
              text: '제목 한줄로 보이게 한 줄 맞나 맞나?',
            },
          },
          {
            type: 'text',
            value: {
              text:
                '짧은 설명이 들어가면 좋겠습니다. 모든 임베딩에 균일하게 최대 3줄 정도면 적당하겠군요.',
            },
          },
          {
            type: 'links',
            value: {
              links: [
                {
                  href:
                    'dev-soto:///outlink?url=https%3A%2F%2Ftriple.guide%2Fentry%2Fposts%2F04ba5bd9-1a75-4ddb-bb3c-516657e9ae0c%3F_triple_no_navbar%26_triple_swipe_to_close',
                  label: '방콕 3박 4일 가이드',
                },
                {
                  href:
                    'dev-soto:///regions/23c5965b-01ad-486b-a694-a2ced15f245c/attractions/c3d2ef37-f0ef-42b4-a210-039dc08143bf',
                  label: '도쿄 타워',
                },
              ],
              display: 'default',
            },
          },
        ],
        [
          {
            type: 'images',
            value: {
              images: [
                {
                  id: 'bfb5dd63-696c-4f1c-b98c-8e7f86fe069f',
                  frame: 'large',
                  sizes: {
                    full: {
                      url:
                        'https://res.cloudinary.com/triple-dev/image/upload/w_2048,h_2048,c_limit/bfb5dd63-696c-4f1c-b98c-8e7f86fe069f.jpg',
                    },
                    large: {
                      url:
                        'https://res.cloudinary.com/triple-dev/image/upload/w_1024,h_1024,c_limit/bfb5dd63-696c-4f1c-b98c-8e7f86fe069f.jpg',
                    },
                    small_square: {
                      url:
                        'https://res.cloudinary.com/triple-dev/image/upload/w_256,h_256,c_fill/bfb5dd63-696c-4f1c-b98c-8e7f86fe069f.jpg',
                    },
                  },
                  title: '',
                  width: 4287,
                  height: 2706,
                  description: '',
                },
              ],
            },
          },
          {
            type: 'heading3',
            value: {
              text: '제목',
            },
          },
          {
            type: 'text',
            value: {
              text:
                '짧은 설명이 들어가면 좋겠습니 다. 모든 임베딩에 균일하게 최대 3줄 정도면 적당하겠군요.',
            },
          },
        ],
      ],
    }}
  />
))
