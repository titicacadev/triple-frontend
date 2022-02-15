import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import { ELEMENTS } from '../index'

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

  expect(anchorElement).toHaveAttribute('href', 'Test Href')
  expect(anchorElement).toHaveTextContent('네버랜드 바로 가기')
})
