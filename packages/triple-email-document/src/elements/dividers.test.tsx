import '@testing-library/jest-dom'
import 'jest-styled-components'
import { render } from '@testing-library/react'

import { ELEMENTS } from '../index'

test('높이 1px, 배경 색 gray 인 구분선 1 Element를 렌더링합니다.', () => {
  const Divider1 = ELEMENTS.hr1

  const { getByRole } = render(<Divider1 value={undefined} />)

  const dividerElement = getByRole('separator')

  expect(dividerElement).toHaveStyleRule('height', '1px')
  expect(dividerElement).toHaveStyleRule(
    'background-color',
    'rgba(239,239,239,1)',
  )
})

test('높이 10px, 배경 색은 gray 인 구분선 2 Element를 렌더링합니다.', () => {
  const Divider2 = ELEMENTS.hr2

  const { getByRole } = render(<Divider2 value={undefined} />)

  const dividerElement = getByRole('separator')

  expect(dividerElement).toHaveStyleRule('height', '10px')
  expect(dividerElement).toHaveStyleRule(
    'background-color',
    'rgba(239,239,239,1)',
  )
})

test('높이 10px, 배경 색은 transparent 구분선 3 Element를 렌더링합니다.', () => {
  const Divider3 = ELEMENTS.hr3

  const { getByRole } = render(<Divider3 value={undefined} />)

  const dividerElement = getByRole('separator')

  expect(dividerElement).toHaveStyleRule('height', '10px')
  expect(dividerElement).toHaveStyleRule('background-color', 'transparent')
})

test('사선(/)으로 표시하는 구분선 4 Element를 렌더링합니다.', () => {
  const Divider4 = ELEMENTS.hr4

  const { getByRole } = render(<Divider4 value={undefined} />)

  const dividerImgElement = getByRole('img')

  expect(dividerImgElement).toHaveAttribute(
    'src',
    'https://assets.triple.guide/images/img-line1@2x.png',
  )
})

test('점 3개(. . .)로 표시하는 구분선 5 Element를 렌더링합니다.', () => {
  const Divider5 = ELEMENTS.hr5

  const { getByRole } = render(<Divider5 value={undefined} />)

  const dividerImgElement = getByRole('img')

  expect(dividerImgElement).toHaveAttribute(
    'src',
    'https://assets.triple.guide/images/img-line2@2x.png',
  )
})

test('점과 가로선(ㅡ . ㅡ)으로 표시하는 구분선 6 Element를 렌더링합니다.', () => {
  const Divider6 = ELEMENTS.hr6

  const { getByRole } = render(<Divider6 value={undefined} />)

  const dividerImgElement = getByRole('img')

  expect(dividerImgElement).toHaveAttribute(
    'src',
    'https://assets.triple.guide/images/img-line3@2x.png',
  )
})
