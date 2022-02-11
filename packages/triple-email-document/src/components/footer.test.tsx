import React from 'react'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import EmailFooter from './footer'

const MOCKED_RENDER_VALUES = {
  title: '국내 여행도 트리플로 한 번에',
  subTitle: '예약부터 일정까지 트리플 하나로 간편하게 준비하세요.',
}

test('EmailFooter를 렌더링합니다.', () => {
  const mockedTransitionLink = 'Test Href'

  const { getByText, getAllByRole } = render(
    <EmailFooter transitionLink={mockedTransitionLink} />,
  )

  const titleElement = getByText(MOCKED_RENDER_VALUES.title)
  const subTitleElement = getByText(MOCKED_RENDER_VALUES.subTitle)
  const transitionLinkElement = getAllByRole('link')[0]

  expect(titleElement).toBeInTheDocument()
  expect(subTitleElement).toBeInTheDocument()
  expect(transitionLinkElement).toHaveAttribute('href', mockedTransitionLink)
})
