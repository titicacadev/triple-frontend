import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import { ELEMENTS } from '.'

describe('Heading Elements', () => {
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

    const HeadlineElement = getByText(/This is headline/i)
    const HeadingElement = getByText(/This is heading/i)

    const headlineFontSize = getComputedStyle(HeadlineElement).fontSize
    const headingFontSize = getComputedStyle(HeadingElement).fontSize

    const createdResult = {
      headlineFontSize,
      headingFontSize,
      headline: HeadlineElement.textContent,
      text: HeadingElement.textContent,
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

    const HeadingElement = getByText(/This is heading/i)

    const headingFontSize = getComputedStyle(HeadingElement).fontSize

    const createdResult = {
      fontSize: headingFontSize,
      text: HeadingElement.textContent,
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

    const HeadingElement = getByText(/This is heading/i)
    const headingStyle = getComputedStyle(HeadingElement)

    const createdResult = {
      fontSize: headingStyle.fontSize,
      text: HeadingElement.textContent,
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

    const HeadingElement = getByText(/This is heading/i)
    const headingStyle = getComputedStyle(HeadingElement)

    const createdResult = {
      fontSize: headingStyle.fontSize,
      text: HeadingElement.textContent,
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

    const HeadingElement = getByText(/This is heading/i)

    const headingFontStyle = getComputedStyle(HeadingElement)

    const createdResult = {
      fontSize: headingFontStyle.fontSize,
      text: HeadingElement.textContent,
      color: headingFontStyle.color,
    }

    const expectedResult = {
      fontSize: '16px',
      text: 'This is heading',
      color: 'rgb(41, 135, 240)', // #2987f0
    }

    expect(createdResult).toStrictEqual(expectedResult)
  })
})

describe('Divider Elements', () => {
  test('높이 1px, 배경 색 gray 인 구분선 1 Element를 렌더링합니다.', () => {
    const Divider1 = ELEMENTS.hr1

    const { getByRole } = render(<Divider1 value={undefined} />)

    const DividerElement = getByRole('separator')
    const dividerStyle = getComputedStyle(DividerElement)

    const createdResult = {
      height: dividerStyle.height,
      backgroundColor: dividerStyle.backgroundColor,
    }

    const expectedResult = {
      height: '1px',
      backgroundColor: 'rgb(239, 239, 239)',
    }

    expect(createdResult).toStrictEqual(expectedResult)
  })

  test('높이 10px, 배경 색은 gray 인 구분선 2 Element를 렌더링합니다.', () => {
    const Divider2 = ELEMENTS.hr2

    const { getByRole } = render(<Divider2 value={undefined} />)

    const DividerElement = getByRole('separator')
    const dividerStyle = getComputedStyle(DividerElement)

    const createdResult = {
      height: dividerStyle.height,
      backgroundColor: dividerStyle.backgroundColor,
    }

    const expectedResult = {
      height: '10px',
      backgroundColor: 'rgb(239, 239, 239)',
    }

    expect(createdResult).toStrictEqual(expectedResult)
  })

  test('높이 10px, 배경 색은 transparent 구분선 3 Element를 렌더링합니다.', () => {
    const Divider3 = ELEMENTS.hr3

    const { getByRole } = render(<Divider3 value={undefined} />)

    const DividerElement = getByRole('separator')
    const dividerStyle = getComputedStyle(DividerElement)

    const createdResult = {
      height: dividerStyle.height,
      backgroundColor: dividerStyle.backgroundColor,
    }

    const expectedResult = {
      height: '10px',
      backgroundColor: 'transparent',
    }

    expect(createdResult).toStrictEqual(expectedResult)
  })

  test('사선(/)으로 표시하는 구분선 4 Element를 렌더링합니다.', () => {
    const Divider4 = ELEMENTS.hr4

    const { getByRole } = render(<Divider4 value={undefined} />)

    const dividerImgSrc = getByRole('img').getAttribute('src')
    const expectedImgSrc = 'https://assets.triple.guide/images/img-line1@2x.png'

    expect(dividerImgSrc).toStrictEqual(expectedImgSrc)
  })

  test('점 3개(. . .)로 표시하는 구분선 5 Element를 렌더링합니다.', () => {
    const Divider5 = ELEMENTS.hr5

    const { getByRole } = render(<Divider5 value={undefined} />)

    const dividerImgSrc = getByRole('img').getAttribute('src')
    const expectedImgSrc = 'https://assets.triple.guide/images/img-line2@2x.png'

    expect(dividerImgSrc).toStrictEqual(expectedImgSrc)
  })

  test('점과 가로선(ㅡ . ㅡ)으로 표시하는 구분선 6 Element를 렌더링합니다.', () => {
    const Divider6 = ELEMENTS.hr6

    const { getByRole } = render(<Divider6 value={undefined} />)

    const dividerImgSrc = getByRole('img').getAttribute('src')
    const expectedImgSrc = 'https://assets.triple.guide/images/img-line3@2x.png'

    expect(dividerImgSrc).toStrictEqual(expectedImgSrc)
  })
})

describe('Link Element', () => {
  test('버튼형 링크 Element를 렌더링합니다.', () => {
    const Link = ELEMENTS.link

    const { getByRole } = render(
      <Link
        value={{
          id: '',
          label: '네버랜드 바로 가기',
          href: 'Test Href',
          display: 'button',
        }}
      />,
    )

    const anchorElement = getByRole('link')
    const anchorLabel = anchorElement.textContent
    const anchorHref = anchorElement.getAttribute('href')

    const createdAnchor = {
      label: anchorLabel,
      href: anchorHref,
    }

    const expectedAnchor = {
      label: '네버랜드 바로 가기',
      href: 'Test Href',
    }

    expect(createdAnchor).toStrictEqual(expectedAnchor)
  })
})
