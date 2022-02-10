import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { ImageMeta } from '@titicaca/type-definitions'

import { ELEMENTS } from '.'

export type ExtendedImageMeta = ImageMeta & {
  link?: ImageMeta['link'] & {
    id?: string
  }
}

export interface ImageDocument {
  type: 'images'
  value: {
    images: ExtendedImageMeta[]
    display: 'default' | 'gapless-block'
  }
}

const IMAGE = {
  id: 'IMAGE_ID',
  sizes: {
    full: {
      url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/be33afd8-c14b-4508-b1f9-8b36bfb29f64.jpeg',
    },
    large: {
      url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/be33afd8-c14b-4508-b1f9-8b36bfb29f64.jpeg',
    },
    small_square: {
      url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/be33afd8-c14b-4508-b1f9-8b36bfb29f64.jpeg',
    },
    smallSquare: {
      url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/be33afd8-c14b-4508-b1f9-8b36bfb29f64.jpeg',
    },
  },
}

describe('Image Element', () => {
  test('이미지 크기만 있는 value를 이용하여 간격없는 이미지 1개를 렌더링합니다.', () => {
    const Images = ELEMENTS.images

    const { getByRole, getAllByRole } = render(
      <Images
        value={{
          display: 'gapless-block',
          images: [IMAGE],
        }}
      />,
    )

    const wrapperBox = getAllByRole('cell')[0]
    const firstImgBox = getAllByRole('cell')[1]

    const wrapperBoxStyle = getComputedStyle(wrapperBox)
    const firstImgBoxStyle = getComputedStyle(firstImgBox)

    const imgElementSrc = getByRole('img').getAttribute('src')

    const createdResult = {
      wrapperBoxPadding: wrapperBoxStyle.padding,
      firstImgBoxPadding: firstImgBoxStyle.padding,
      imageSrc: imgElementSrc,
    }

    const expectedResult = {
      wrapperBoxPadding: '0px 0px 0px 0px',
      firstImgBoxPadding: '0px 0px 0px 0px',
      imageSrc:
        'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/be33afd8-c14b-4508-b1f9-8b36bfb29f64.jpeg',
    }

    expect(createdResult).toStrictEqual(expectedResult)
  })

  test('이미지 크기만 있는 value를 이용하여 간격있는 이미지 1개를 렌더링합니다.', () => {
    const Images = ELEMENTS.images

    const { getByRole, getAllByRole } = render(
      <Images
        value={{
          display: 'default',
          images: [IMAGE],
        }}
      />,
    )

    const wrapperBox = getAllByRole('cell')[0]
    const firstImgBox = getAllByRole('cell')[1]

    const wrapperBoxStyle = getComputedStyle(wrapperBox)
    const firstImgBoxStyle = getComputedStyle(firstImgBox)

    const imgElementSrc = getByRole('img').getAttribute('src')

    const createdResult = {
      wrapperBoxPadding: wrapperBoxStyle.padding,
      firstImgBoxPadding: firstImgBoxStyle.padding,
      imageSrc: imgElementSrc,
    }

    const expectedResult = {
      wrapperBoxPadding: '40px 0px 30px 0px',
      firstImgBoxPadding: '0px 30px 0px 30px',
      imageSrc:
        'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/be33afd8-c14b-4508-b1f9-8b36bfb29f64.jpeg',
    }

    expect(createdResult).toStrictEqual(expectedResult)
  })
})
