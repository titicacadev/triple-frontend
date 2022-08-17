import '@testing-library/jest-dom'
import 'jest-styled-components'
import { render } from '@testing-library/react'

import { ELEMENTS } from '../index'

import { EmbeddedDocument } from './embedded'

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

const ENTRIES = [
  [
    {
      type: 'images',
      value: {
        display: 'gapless-block',
        images: [IMAGE],
      },
    },
    {
      type: 'heading',
      value: {
        text: '임베디드의 타이틀 영역입니다.',
      },
    },
    {
      type: 'text',
      value: {
        text: '임베디드의 본문 영역입니다.',
      },
    },
    {
      type: 'links',
      value: {
        links: [
          {
            id: 'Link_ID',
            label: '박스 디자인 형식',
            href: '',
          },
        ],
        display: 'block',
      },
    },
  ],
]

test('이미지, 타이틀, 본문, 버튼의 조합을 렌더링합니다.', () => {
  const Embedded = ELEMENTS.embedded

  const value = {
    entries: ENTRIES,
  } as EmbeddedDocument['value']

  const { getByRole, getAllByRole } = render(<Embedded value={value} />)

  const titleElement = getAllByRole('table')[3]
  const textElement = getAllByRole('table')[4]
  const linkElement = getByRole('link')

  expect(titleElement.textContent).toBe('임베디드의 타이틀 영역입니다.')
  expect(textElement.textContent).toBe('임베디드의 본문 영역입니다.')

  expect(linkElement.textContent).toBe('박스 디자인 형식')
  expect(linkElement).toHaveStyleRule('background-color', 'rgba(255,255,255,1)')
  expect(linkElement).toHaveStyleRule('display', 'block')
})
