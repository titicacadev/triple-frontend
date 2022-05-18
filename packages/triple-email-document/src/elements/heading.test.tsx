import '@testing-library/jest-dom'
import 'jest-styled-components'
import { render } from '@testing-library/react'

import {
  Heading1View,
  Heading2View,
  Heading3View,
  Heading4View,
} from './heading'

const mockedHeadingValue = {
  text: 'This is heading',
}

test('헤드라인이 있는 제목 1 Element를 렌더링합니다.', () => {
  const mockedHeading1Value = {
    headline: 'This is headline',
    ...mockedHeadingValue,
  }

  const { getByText } = render(<Heading1View value={mockedHeading1Value} />)

  const headlineElement = getByText(/This is headline/i)
  const headingElement = getByText(/This is heading/i)

  expect(headlineElement).toBeInTheDocument()
  expect(headlineElement).toHaveStyleRule('font-size', '13px')

  expect(headingElement).toBeInTheDocument()
  expect(headingElement).toHaveStyleRule('font-size', '21px')
})

test('헤드라인이 없는 제목 1 Element를 렌더링합니다.', () => {
  const { getByText } = render(<Heading1View value={mockedHeadingValue} />)

  const headingElement = getByText(/This is heading/i)

  expect(headingElement).toBeInTheDocument()
  expect(headingElement).toHaveStyleRule('font-size', '21px')
})

test('글자크기 19px, 색상 gray 인 제목 2 Element를 렌더링합니다.', () => {
  const { getByText } = render(<Heading2View value={mockedHeadingValue} />)

  const headingElement = getByText(/This is heading/i)

  expect(headingElement).toBeInTheDocument()
  expect(headingElement).toHaveStyleRule('font-size', '19px')
})

test('글자크기 16px, 색상은 gray 인 제목 3 Element를 렌더링합니다.', () => {
  const { getByText } = render(<Heading3View value={mockedHeadingValue} />)

  const headingElement = getByText(/This is heading/i)

  expect(headingElement).toBeInTheDocument()
  expect(headingElement).toHaveStyleRule('font-size', '16px')
})

test('글자크기 16px, 색상은 #2987f0 인 제목 4 Element를 렌더링합니다.', () => {
  const { getByText } = render(<Heading4View value={mockedHeadingValue} />)

  const headingElement = getByText(/This is heading/i)

  expect(headingElement).toBeInTheDocument()
  expect(headingElement).toHaveStyleRule('font-size', '16px')
  expect(headingElement).toHaveStyleRule('color', '#2987f0')
})
