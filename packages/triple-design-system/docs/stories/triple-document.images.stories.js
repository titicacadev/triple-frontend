import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select, text } from '@storybook/addon-knobs'

import { ELEMENTS } from '@titicaca/triple-design-system'
import IMAGES from './images.sample.json'

const { images: Images } = ELEMENTS

storiesOf('TripleDocument.이미지', module)
  .addDecorator(withKnobs)
  .add('1개', () => {
    const [image] = IMAGES
    return (
      <Images
        value={{
          images: [
            {
              frame: select(
                '크기',
                ['mini', 'small', 'medium', 'large', 'big', 'huge'],
                'small',
              ),
              title: text('캡션', 'TripleDocument 샘플 1'),
              sourceUrl: text('출처', 'https://triple.guide'),
              ...image,
            },
          ],
        }}
      />
    )
  })
  .add('2개', () => (
    <Images
      value={{
        images: IMAGES.map((value) => ({
          ...value,
          title: '',
        })),
      }}
    />
  ))
  .add('2개, 캡션', () => (
    <Images
      value={{
        images: IMAGES,
      }}
    />
  ))
  .add('2개, 블록', () => (
    <Images
      value={{
        images: IMAGES.map((value) => ({ ...value, title: '' })),
        display: 'block',
      }}
    />
  ))
  .add('2개, 블록, 캡션', () => (
    <Images
      value={{
        images: IMAGES,
        display: 'block',
      }}
    />
  ))
