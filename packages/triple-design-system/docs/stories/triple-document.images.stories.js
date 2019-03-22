import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select, text } from '@storybook/addon-knobs'

import { ELEMENTS } from '@titicaca/triple-design-system'
import IMAGES from './images.sample.json'

const { images: Images } = ELEMENTS

storiesOf('TripleDocument.이미지', module)
  .addDecorator(withKnobs)
  .add('1개', () => {
    const {
      id,
      frame,
      sizes,
      title,
      width,
      height,
      description,
      sourceUrl,
    } = IMAGES[0]
    return (
      <Images
        value={{
          images: [
            {
              id,
              frame: select(
                '크기',
                ['mini', 'small', 'medium', 'large', 'big', 'huge'],
                frame,
              ),
              sizes,
              title: text('캡션', title),
              width,
              height,
              description,
              sourceUrl: text('출처', sourceUrl),
            },
          ],
        }}
      />
    )
  })
  .add('2개', () => (
    <Images
      value={{
        images: IMAGES.map(
          ({ id, frame, sizes, width, height, description, sourceUrl }) => ({
            id,
            frame,
            sizes,
            title: '',
            width,
            height,
            description,
            sourceUrl,
          }),
        ),
      }}
    />
  ))
  .add('2개, 캡션', () => (
    <Images
      value={{
        images: IMAGES.map(
          ({
            id,
            frame,
            sizes,
            title,
            width,
            height,
            description,
            sourceUrl,
          }) => ({
            id,
            frame,
            sizes,
            title,
            width,
            height,
            description,
            sourceUrl,
          }),
        ),
      }}
    />
  ))
  .add('2개, 블록', () => (
    <Images
      value={{
        images: IMAGES.map(
          ({ id, frame, sizes, width, height, description, sourceUrl }) => ({
            id,
            frame,
            sizes,
            title: '',
            width,
            height,
            description,
            sourceUrl,
          }),
        ),
        display: 'block',
      }}
    />
  ))
  .add('2개, 블록, 캡션', () => (
    <Images
      value={{
        images: IMAGES.map(
          ({
            id,
            frame,
            sizes,
            title,
            width,
            height,
            description,
            sourceUrl,
          }) => ({
            id,
            frame: frame,
            sizes,
            title,
            width,
            height,
            description,
            sourceUrl,
          }),
        ),
        display: 'block',
      }}
    />
  ))
