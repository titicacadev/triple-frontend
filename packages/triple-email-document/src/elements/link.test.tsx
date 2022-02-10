import React from 'react'
import { render } from '@testing-library/react'

import { ELEMENTS } from '../index'

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
