import { useEffect } from 'react'
import { render } from '@testing-library/react'

import '@testing-library/jest-dom'

import { ScrollSpyContainer, ScrollSpyEntity } from './index'

jest.mock('@titicaca/intersection-observer', () => ({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  StaticIntersectionObserver: jest
    .fn()
    .mockImplementation(({ onChange, children }) => {
      useEffect(() => {
        onChange(
          { isIntersecting: true } as IntersectionObserverEntry,
          jest.fn(),
        )
      }, [onChange])

      return <div>{children}</div>
    }),
}))
jest.mock('@titicaca/react-hooks', () => ({
  useScrollToElement: () => ({ isScrolling: () => {} }),
}))

test('ScrollSpyEntity로 감싼 영역이 화면에 들어오면 ScrollSpyContainer의 onChange로 전달한 함수를 호출합니다.', () => {
  const targetId = 'target-id'
  const handleActiveIdChange = jest.fn()

  render(
    <ScrollSpyContainer activeId={null} onChange={handleActiveIdChange}>
      <ScrollSpyEntity id={targetId}>테스트 Entity</ScrollSpyEntity>
    </ScrollSpyContainer>,
  )
  expect(handleActiveIdChange).toBeCalledWith(targetId)
})
