import React from 'react'
import { storiesOf } from '@storybook/react'

import { ELEMENTS } from '@titicaca/triple-document'

const { links: Links } = ELEMENTS

storiesOf('TripleDocument | TripleDocument.링크', module)
  .add('일반', () => (
    <Links
      value={{
        links: [
          {
            label: '방콕 3박 4일 가이드',
          },
          {
            label: '도쿄 타워',
          },
        ],
      }}
    />
  ))
  .add('강조', () => (
    <Links
      value={{
        links: [
          {
            label: '다낭 바로 가기',
          },
        ],
        display: 'button',
      }}
    />
  ))
  .add('강조 (2개)', () => (
    <Links
      value={{
        links: [
          {
            label: '다낭 바로 가기',
          },
          {
            label: '도쿄 바로 가기',
          },
        ],
        display: 'button',
      }}
    />
  ))
  .add('확장', () => (
    <Links
      value={{
        links: [
          {
            label: '장소 보기',
          },
        ],
        display: 'block',
      }}
    />
  ))
  .add('이미지', () => (
    <Links
      value={{
        links: [
          {
            label: '메가 돈키호테 시부야 본점',
            image: {
              sizes: {
                full: {
                  url:
                    'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/1c22ae37-108f-44a7-b96b-1d70179b0b3f.jpeg',
                },
                large: {
                  url:
                    'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/1c22ae37-108f-44a7-b96b-1d70179b0b3f.jpeg',
                },
                /* eslint-disable @typescript-eslint/camelcase */
                small_square: {
                  url:
                    'https://media.triple.guide/triple-cms/c_fill,f_auto,h_256,w_256/1c22ae37-108f-44a7-b96b-1d70179b0b3f.jpeg',
                },
              },
            },
            description: '관광명소',
          },
          {
            label: '도쿄의 이색 체험',
            image: {
              sizes: {
                full: {
                  url:
                    'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/fc59cda3-056b-41ca-9c87-242d6f15074d.jpeg',
                },
                large: {
                  url:
                    'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/fc59cda3-056b-41ca-9c87-242d6f15074d.jpeg',
                },
                small_square: {
                  url:
                    'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/fc59cda3-056b-41ca-9c87-242d6f15074d.jpeg',
                },
              },
            },
            description: '가이드',
          },
        ],
        display: 'image',
      }}
    />
  ))
