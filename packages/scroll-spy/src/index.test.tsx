import React, { useEffect } from 'react'
import IntersectionObserver from '@titicaca/intersection-observer'
import { render } from '@testing-library/react'

import '@testing-library/jest-dom'
import 'jest-canvas-mock'

import { ScrollSpyContainer, ScrollSpyEntity } from './index'

jest.mock('@titicaca/intersection-observer')
jest.mock('@titicaca/react-hooks', () => ({
  useScrollToElement: () => ({ isScrolling: () => {} }),
}))

describe('ScrollSpy', () => {
  beforeEach(() => {
    ;(
      IntersectionObserver as unknown as jest.MockedFunction<
        typeof IntersectionObserver
      >
    ).mockImplementation(({ onChange, children }) => {
      useEffect(() => {
        onChange(
          { isIntersecting: true } as IntersectionObserverEntry,
          jest.fn(),
        )
      }, [onChange])

      return <div>{children}</div>
    })
  })

  const handleActiveIdChange = jest.fn()
  const targetId = 'target-id'

  const ScrollSpy = () => (
    <ScrollSpyContainer activeId={null} onChange={handleActiveIdChange}>
      <ScrollSpyEntity id={targetId}>테스트 Entity</ScrollSpyEntity>
    </ScrollSpyContainer>
  )

  test('intersectionObserver 동작을 체크합니다.', () => {
    render(<ScrollSpy />)
    expect(handleActiveIdChange).toBeCalledWith(targetId)
  })

  test('activeId가 일치합니다.', () => {
    const { getByText } = render(<ScrollSpy />)
    expect(getByText('테스트 Entity').id).toStrictEqual(targetId)
  })
})
