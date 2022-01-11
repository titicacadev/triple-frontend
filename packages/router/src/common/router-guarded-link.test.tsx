import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { RouterGuardedLink } from './router-guarded-link'

jest.mock('../common/disabled-link-notifier', () => ({
  ...jest.requireActual('../common/disabled-link-notifier'),
  useDisabledLinkNotifierCreator: () => jest.fn(),
}))

test('자식 태그의 href, onClick 속성은 덮어쓰입니다.', () => {
  // eslint-disable-next-line no-console
  console.warn = jest.fn()
  const clickHandler = jest.fn()
  const { getByRole } = render(
    <RouterGuardedLink href="https://triple.guide">
      <a href="https://triple.guide/hotels" onClick={clickHandler}>
        테스트링크
      </a>
    </RouterGuardedLink>,
  )
  expect(getByRole('link')).toHaveAttribute('href', 'https://triple.guide')
  fireEvent.click(getByRole('link'))
  expect(clickHandler).not.toBeCalled()
})

test('자식 태그가 덮어쓰일 속성을 가지고 있으면 경고를 보냅니다.', () => {
  /* eslint-disable no-console */
  console.warn = jest.fn()

  render(
    <RouterGuardedLink
      href="https://triple.guide"
      className="asdf"
      onClick={jest.fn()}
    >
      <a
        href="https://triple.guide/hotels"
        onClick={jest.fn()}
        className="test-link"
      >
        테스트링크
      </a>
    </RouterGuardedLink>,
  )

  expect(console.warn).toBeCalledWith(expect.stringContaining('href'))
  expect(console.warn).toBeCalledWith(expect.stringContaining('onClick'))
  expect(console.warn).toBeCalledWith(expect.stringContaining('className'))
  /* eslint-enable no-console */
})
