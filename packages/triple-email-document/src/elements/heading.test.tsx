import React from 'react'
import 'jest-styled-components'
import { render } from '@testing-library/react'

import { ELEMENTS } from '../index'

const mockedHeadingValue = {
  text: 'This is heading',
}

test('헤드라인이 있는 제목 1 Element를 렌더링합니다.', () => {
  const mockedHeading1Value = {
    headline: 'This is headline',
    ...mockedHeadingValue,
  }

  const Heading1WithHeadline = ELEMENTS.heading1

  const { getByText } = render(
    <Heading1WithHeadline value={mockedHeading1Value} />,
  )

  const headlineElement = getByText(/This is headline/i)
  const headingElement = getByText(/This is heading/i)

  expect(headlineElement.textContent).toBe('This is headline')
  expect(headlineElement).toHaveStyleRule('font-size', '13px')

  expect(headingElement.textContent).toBe('This is heading')
  expect(headingElement).toHaveStyleRule('font-size', '21px')
})

test('헤드라인이 없는 제목 1 Element를 렌더링합니다.', () => {
  const Heading1Normal = ELEMENTS.heading1

  const { getByText } = render(<Heading1Normal value={mockedHeadingValue} />)

  const headingElement = getByText(/This is heading/i)

  expect(headingElement.textContent).toBe('This is heading')
  expect(headingElement).toHaveStyleRule('font-size', '21px')
})

test('글자크기 19px, 색상 gray 인 제목 2 Element를 렌더링합니다.', () => {
  const Heading2 = ELEMENTS.heading2

  const { getByText } = render(<Heading2 value={mockedHeadingValue} />)

  const headingElement = getByText(/This is heading/i)

  expect(headingElement.textContent).toBe('This is heading')
  expect(headingElement).toHaveStyleRule('font-size', '19px')
})

test('글자크기 16px, 색상은 gray 인 제목 3 Element를 렌더링합니다.', () => {
  const Heading3 = ELEMENTS.heading3

  const { getByText } = render(<Heading3 value={mockedHeadingValue} />)

  const headingElement = getByText(/This is heading/i)

  expect(headingElement.textContent).toBe('This is heading')
  expect(headingElement).toHaveStyleRule('font-size', '16px')
})

test('글자크기 16px, 색상은 #2987f0 인 제목 4 Element를 렌더링합니다.', () => {
  const Heading4 = ELEMENTS.heading4

  const { getByText } = render(<Heading4 value={mockedHeadingValue} />)

  const headingElement = getByText(/This is heading/i)

  expect(headingElement.textContent).toBe('This is heading')
  expect(headingElement).toHaveStyleRule('font-size', '16px')
  expect(headingElement).toHaveStyleRule('color', '#2987f0')
})
