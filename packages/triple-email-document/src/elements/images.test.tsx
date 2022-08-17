import '@testing-library/jest-dom'
import 'jest-styled-components'
import { render } from '@testing-library/react'

import { ELEMENTS } from '../index'

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

test('이미지 크기만 있는 value를 이용하여 간격없는 이미지 1개를 렌더링합니다.', () => {
  const Images = ELEMENTS.images

  const { getAllByRole } = render(
    <Images
      value={{
        display: 'gapless-block',
        images: [IMAGE],
      }}
    />,
  )

  const wrapperBoxElement = getAllByRole('cell')[0]
  const firstImgBoxElement = getAllByRole('cell')[1]

  expect(wrapperBoxElement).toHaveStyleRule('padding', '0 0 0 0')
  expect(firstImgBoxElement).toHaveStyleRule('padding', '0 0 0 0')
})

test('이미지 크기만 있는 value를 이용하여 간격있는 이미지 1개를 렌더링합니다.', () => {
  const Images = ELEMENTS.images

  const { getAllByRole } = render(
    <Images
      value={{
        display: 'default',
        images: [IMAGE],
      }}
    />,
  )

  const wrapperBoxElement = getAllByRole('cell')[0]
  const firstImgBoxElement = getAllByRole('cell')[1]

  expect(wrapperBoxElement).toHaveStyleRule('padding', '40px 0 30px 0')
  expect(firstImgBoxElement).toHaveStyleRule('padding', '0 30px 0 30px')
})

test('이미지 크기만 있는 value를 이용하여 간격있는 이미지 1개를 렌더링합니다. (v2)', () => {
  const Images = ELEMENTS.images

  const { getAllByRole } = render(
    <Images
      value={{
        display: 'default-v2',
        images: [IMAGE],
      }}
    />,
  )

  const wrapperBoxElement = getAllByRole('cell')[0]
  const firstImgBoxElement = getAllByRole('cell')[1]

  expect(wrapperBoxElement).toHaveStyleRule('padding', '20px 0 20px 0')
  expect(firstImgBoxElement).toHaveStyleRule('padding', '0 30px 0 30px')
})
