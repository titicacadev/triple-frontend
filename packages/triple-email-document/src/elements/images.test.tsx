import '@testing-library/jest-dom'
import 'jest-styled-components'
import { render } from '@testing-library/react'

import { ELEMENTS } from '../index'

import { ExtendedImageMeta } from './images'

const SAMPLE_IMAGE =
  'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/be33afd8-c14b-4508-b1f9-8b36bfb29f64.jpeg'

const SIZES = {
  full: {
    url: SAMPLE_IMAGE,
  },
  large: {
    url: SAMPLE_IMAGE,
  },
  small_square: {
    url: SAMPLE_IMAGE,
  },
  smallSquare: {
    url: SAMPLE_IMAGE,
  },
}

describe('이미지의 여백을 조절합니다.', () => {
  const Images = ELEMENTS.images
  const images = generateSampleImages()

  test('여백없는 이미지 1개를 렌더링합니다.', () => {
    const { getByRole, getAllByRole } = render(
      <Images
        value={{
          display: 'gapless-block',
          images,
        }}
      />,
    )

    const wrapperBoxElement = getAllByRole('cell')[0]
    const firstImgBoxElement = getAllByRole('cell')[1]
    const imgElement = getByRole('img')

    expect(wrapperBoxElement).toHaveStyleRule('padding', '0 0 0 0')
    expect(firstImgBoxElement).toHaveStyleRule('padding', '0 0 0 0')
    expect(imgElement).toHaveAttribute(
      'src',
      'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/be33afd8-c14b-4508-b1f9-8b36bfb29f64.jpeg',
    )
  })

  test('여백있는 이미지 1개를 렌더링합니다.', () => {
    const { getByRole, getAllByRole } = render(
      <Images
        value={{
          display: 'default',
          images,
        }}
      />,
    )

    const wrapperBoxElement = getAllByRole('cell')[0]
    const firstImgBoxElement = getAllByRole('cell')[1]
    const imgElement = getByRole('img')

    expect(wrapperBoxElement).toHaveStyleRule('padding', '40px 0 30px 0')
    expect(firstImgBoxElement).toHaveStyleRule('padding', '0 30px 0 30px')
    expect(imgElement).toHaveAttribute(
      'src',
      'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/be33afd8-c14b-4508-b1f9-8b36bfb29f64.jpeg',
    )
  })

  test('여백이 있으면서 테두리가 굴곡인 이미지 1개를 렌더링합니다.', () => {
    const { getByRole, getAllByRole } = render(
      <Images
        value={{
          display: 'default-v2',
          images,
        }}
      />,
    )

    const wrapperBoxElement = getAllByRole('cell')[0]
    const firstImgBoxElement = getAllByRole('cell')[1]
    const imgElement = getByRole('img')

    expect(wrapperBoxElement).toHaveStyleRule('padding', '20px 0 20px 0')
    expect(firstImgBoxElement).toHaveStyleRule('padding', '0 30px 0 30px')
    expect(imgElement).toHaveStyleRule('border-radius', '6px')
    expect(imgElement).toHaveAttribute(
      'src',
      'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/be33afd8-c14b-4508-b1f9-8b36bfb29f64.jpeg',
    )
  })
})

describe('이미지 크기를 비율에 따라 조절합니다.', () => {
  const Images = ELEMENTS.images

  test('4:1 비율로 조절합니다.', () => {
    const images = generateSampleImages('mini')
    const { getAllByRole } = render(
      <Images
        value={{
          display: 'gapless-block',
          images,
        }}
      />,
    )

    const backgroundImgElement = getAllByRole('cell')[2].firstChild

    expect(backgroundImgElement).toHaveStyleRule('padding-top', '25%')
    expect(backgroundImgElement).toHaveAttribute(
      'src',
      'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/be33afd8-c14b-4508-b1f9-8b36bfb29f64.jpeg',
    )
  })

  test('5:3 비율로 조절합니다.', () => {
    const images = generateSampleImages('small')
    const { getAllByRole } = render(
      <Images
        value={{
          display: 'gapless-block',
          images,
        }}
      />,
    )

    const backgroundImgElement = getAllByRole('cell')[2].firstChild

    expect(backgroundImgElement).toHaveStyleRule('padding-top', '60%')
    expect(backgroundImgElement).toHaveAttribute(
      'src',
      'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/be33afd8-c14b-4508-b1f9-8b36bfb29f64.jpeg',
    )
  })

  test('4:3 비율로 조절합니다.', () => {
    const images = generateSampleImages('medium')
    const { getAllByRole } = render(
      <Images
        value={{
          display: 'gapless-block',
          images,
        }}
      />,
    )

    const backgroundImgElement = getAllByRole('cell')[2].firstChild

    expect(backgroundImgElement).toHaveStyleRule('padding-top', '75%')
    expect(backgroundImgElement).toHaveAttribute(
      'src',
      'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/be33afd8-c14b-4508-b1f9-8b36bfb29f64.jpeg',
    )
  })

  test('1:1 비율로 조절합니다.', () => {
    const images = generateSampleImages('large')
    const { getAllByRole } = render(
      <Images
        value={{
          display: 'gapless-block',
          images,
        }}
      />,
    )

    const backgroundImgElement = getAllByRole('cell')[2].firstChild

    expect(backgroundImgElement).toHaveStyleRule('padding-top', '100%')
    expect(backgroundImgElement).toHaveAttribute(
      'src',
      'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/be33afd8-c14b-4508-b1f9-8b36bfb29f64.jpeg',
    )
  })

  test('10:11 비율로 조절합니다.', () => {
    const images = generateSampleImages('big')
    const { getAllByRole } = render(
      <Images
        value={{
          display: 'gapless-block',
          images,
        }}
      />,
    )

    const backgroundImgElement = getAllByRole('cell')[2].firstChild

    expect(backgroundImgElement).toHaveStyleRule('padding-top', '110%')
    expect(backgroundImgElement).toHaveAttribute(
      'src',
      'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/be33afd8-c14b-4508-b1f9-8b36bfb29f64.jpeg',
    )
  })

  test('5:8 비율로 조절합니다.', () => {
    const images = generateSampleImages('huge')
    const { getAllByRole } = render(
      <Images
        value={{
          display: 'gapless-block',
          images,
        }}
      />,
    )

    const backgroundImgElement = getAllByRole('cell')[2].firstChild

    expect(backgroundImgElement).toHaveStyleRule('padding-top', '160%')
    expect(backgroundImgElement).toHaveAttribute(
      'src',
      'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/be33afd8-c14b-4508-b1f9-8b36bfb29f64.jpeg',
    )
  })
})

function generateSampleImages(
  frame?: ExtendedImageMeta['frame'],
): ExtendedImageMeta[] {
  const images = [
    {
      id: 'image_id',
      sizes: SIZES,
      ...(frame && { frame }),
    },
  ]

  return images
}
