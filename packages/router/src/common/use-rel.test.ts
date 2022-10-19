import { renderHook } from '@testing-library/react'

import { useRel } from './use-rel'

test('noopener, noreferer를 추가합니다.', () => {
  const {
    result: { current },
  } = renderHook(useRel)

  expect(current).toEqual(expect.stringContaining('noopener'))
  expect(current).toEqual(expect.stringContaining('noreferer'))
})

test('파라미터로 새로운 rel 값을 추가할 수 있습니다.', () => {
  const {
    result: { current },
  } = renderHook(useRel, { initialProps: ['author', 'bookmark'] })

  expect(current).toEqual(expect.stringContaining('author'))
  expect(current).toEqual(expect.stringContaining('bookmark'))
})

test('같은 값을 추가해도 하나만 출력합니다.', () => {
  const {
    result: { current },
  } = renderHook(useRel, { initialProps: ['noopener', 'bookmark', 'bookmark'] })

  expect(
    current.split(' ').filter((value) => value === 'noopener').length,
  ).toBe(1)
  expect(
    current.split(' ').filter((value) => value === 'bookmark').length,
  ).toBe(1)
})
