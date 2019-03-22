import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select, text } from '@storybook/addon-knobs'

import { ELEMENTS } from '@titicaca/triple-design-system'

const { images: Images } = ELEMENTS

storiesOf('TripleDocument.이미지', module)
  .addDecorator(withKnobs)
  .add('1개', () => (
    <Images
      value={{
        images: [
          {
            id: '07f5ed9c-1102-4ec0-b07c-7b1b098311b2',
            frame: select(
              '크기',
              ['mini', 'small', 'medium', 'large', 'big', 'huge'],
              'small',
            ),
            sizes: {
              full: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_2048,h_2048,c_limit,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
              },
              large: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_1024,h_1024,c_limit,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
              },
              small_square: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_256,h_256,c_fill,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
              },
            },
            title: text('캡션', 'TripleDocument 샘플'),
            width: 1024,
            height: 1544,
            description: '',
            sourceUrl: text('출처', 'https://triple.guide'),
          },
        ],
      }}
    />
  ))
  .add('2개', () => (
    <Images
      value={{
        images: [
          {
            id: '07f5ed9c-1102-4ec0-b07c-7b1b098311b2',
            frame: 'small',
            sizes: {
              full: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_2048,h_2048,c_limit,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
              },
              large: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_1024,h_1024,c_limit,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
              },
              small_square: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_256,h_256,c_fill,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
              },
            },
            title: '',
            width: 1024,
            height: 1544,
            description: '',
          },
          {
            id: '9163f25c-edb5-4321-82d8-e28f797908d5',
            frame: 'small',
            sizes: {
              full: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_2048,h_2048,c_limit,f_auto/9163f25c-edb5-4321-82d8-e28f797908d5.jpg',
              },
              large: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_1024,h_1024,c_limit,f_auto/9163f25c-edb5-4321-82d8-e28f797908d5.jpg',
              },
              small_square: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_256,h_256,c_fill,f_auto/9163f25c-edb5-4321-82d8-e28f797908d5.jpg',
              },
            },
            title: '',
            width: 1024,
            height: 1544,
            description: '',
          },
        ],
      }}
    />
  ))
  .add('2개, 캡션', () => (
    <Images
      value={{
        images: [
          {
            id: '07f5ed9c-1102-4ec0-b07c-7b1b098311b2',
            frame: 'small',
            sizes: {
              full: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_2048,h_2048,c_limit,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
              },
              large: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_1024,h_1024,c_limit,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
              },
              small_square: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_256,h_256,c_fill,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
              },
            },
            title: '샘플 캡션 1',
            width: 1024,
            height: 1544,
            description: '',
          },
          {
            id: '9163f25c-edb5-4321-82d8-e28f797908d5',
            frame: 'small',
            sizes: {
              full: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_2048,h_2048,c_limit,f_auto/9163f25c-edb5-4321-82d8-e28f797908d5.jpg',
              },
              large: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_1024,h_1024,c_limit,f_auto/9163f25c-edb5-4321-82d8-e28f797908d5.jpg',
              },
              small_square: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_256,h_256,c_fill,f_auto/9163f25c-edb5-4321-82d8-e28f797908d5.jpg',
              },
            },
            title: '샘플 캡션 2',
            width: 1024,
            height: 1544,
            description: '',
          },
        ],
      }}
    />
  ))
  .add('2개, 블록', () => (
    <Images
      value={{
        images: [
          {
            id: '07f5ed9c-1102-4ec0-b07c-7b1b098311b2',
            frame: 'small',
            sizes: {
              full: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_2048,h_2048,c_limit,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
              },
              large: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_1024,h_1024,c_limit,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
              },
              small_square: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_256,h_256,c_fill,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
              },
            },
            title: '',
            width: 1024,
            height: 1544,
            description: '',
          },
          {
            id: '9163f25c-edb5-4321-82d8-e28f797908d5',
            frame: 'small',
            sizes: {
              full: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_2048,h_2048,c_limit,f_auto/9163f25c-edb5-4321-82d8-e28f797908d5.jpg',
              },
              large: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_1024,h_1024,c_limit,f_auto/9163f25c-edb5-4321-82d8-e28f797908d5.jpg',
              },
              small_square: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_256,h_256,c_fill,f_auto/9163f25c-edb5-4321-82d8-e28f797908d5.jpg',
              },
            },
            title: '',
            width: 1024,
            height: 1544,
            description: '',
          },
        ],
        display: 'block',
      }}
    />
  ))
  .add('2개, 블록, 캡션', () => (
    <Images
      value={{
        images: [
          {
            id: '07f5ed9c-1102-4ec0-b07c-7b1b098311b2',
            frame: 'small',
            sizes: {
              full: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_2048,h_2048,c_limit,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
              },
              large: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_1024,h_1024,c_limit,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
              },
              small_square: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_256,h_256,c_fill,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
              },
            },
            title: '샘플 캡션 1',
            width: 1024,
            height: 1544,
            description: '',
          },
          {
            id: '9163f25c-edb5-4321-82d8-e28f797908d5',
            frame: 'small',
            sizes: {
              full: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_2048,h_2048,c_limit,f_auto/9163f25c-edb5-4321-82d8-e28f797908d5.jpg',
              },
              large: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_1024,h_1024,c_limit,f_auto/9163f25c-edb5-4321-82d8-e28f797908d5.jpg',
              },
              small_square: {
                url:
                  'https://res.cloudinary.com/triple-entry/image/upload/w_256,h_256,c_fill,f_auto/9163f25c-edb5-4321-82d8-e28f797908d5.jpg',
              },
            },
            title: '샘플 캡션 2',
            width: 1024,
            height: 1544,
            description: '',
          },
        ],
        display: 'block',
      }}
    />
  ))
