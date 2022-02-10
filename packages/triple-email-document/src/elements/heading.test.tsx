import React from 'react'
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

  const headlineStyle = getComputedStyle(headlineElement)
  const headingStyle = getComputedStyle(headingElement)

  const createdResult = {
    headlineFontSize: headlineStyle.fontSize,
    headingFontSize: headingStyle.fontSize,
    headline: headlineElement.textContent,
    text: headingElement.textContent,
  }

  const expectedResult = {
    headlineFontSize: '13px',
    headingFontSize: '21px',
    headline: 'This is headline',
    text: 'This is heading',
  }

  expect(createdResult).toStrictEqual(expectedResult)
})

test('헤드라인이 없는 제목 1 Element를 렌더링합니다.', () => {
  const Heading1Normal = ELEMENTS.heading1

  const { getByText } = render(<Heading1Normal value={mockedHeadingValue} />)

  const headingElement = getByText(/This is heading/i)
  const headingStyle = getComputedStyle(headingElement)

  const createdResult = {
    fontSize: headingStyle.fontSize,
    text: headingElement.textContent,
  }

  const expectedResult = {
    fontSize: '21px',
    text: 'This is heading',
  }

  expect(createdResult).toStrictEqual(expectedResult)
})

test('글자크기 19px, 색상 gray 인 제목 2 Element를 렌더링합니다.', () => {
  const Heading2 = ELEMENTS.heading2

  const { getByText } = render(<Heading2 value={mockedHeadingValue} />)

  const headingElement = getByText(/This is heading/i)
  const headingStyle = getComputedStyle(headingElement)

  const createdResult = {
    fontSize: headingStyle.fontSize,
    text: headingElement.textContent,
  }

  const expectedResult = {
    fontSize: '19px',
    text: 'This is heading',
  }

  expect(createdResult).toStrictEqual(expectedResult)
})

test('글자크기 16px, 색상은 gray 인 제목 3 Element를 렌더링합니다.', () => {
  const Heading3 = ELEMENTS.heading3

  const { getByText } = render(<Heading3 value={mockedHeadingValue} />)

  const headingElement = getByText(/This is heading/i)
  const headingStyle = getComputedStyle(headingElement)

  const createdResult = {
    fontSize: headingStyle.fontSize,
    text: headingElement.textContent,
  }

  const expectedResult = {
    fontSize: '16px',
    text: 'This is heading',
  }

  expect(createdResult).toStrictEqual(expectedResult)
})

test('글자크기 16px, 색상은 #2987f0 인 제목 4 Element를 렌더링합니다.', () => {
  const Heading4 = ELEMENTS.heading4

  const { getByText } = render(<Heading4 value={mockedHeadingValue} />)

  const headingElement = getByText(/This is heading/i)
  const headingFontStyle = getComputedStyle(headingElement)

  const createdResult = {
    fontSize: headingFontStyle.fontSize,
    text: headingElement.textContent,
    color: headingFontStyle.color,
  }

  const expectedResult = {
    fontSize: '16px',
    text: 'This is heading',
    color: 'rgb(41, 135, 240)', // #2987f0
  }

  expect(createdResult).toStrictEqual(expectedResult)
})
