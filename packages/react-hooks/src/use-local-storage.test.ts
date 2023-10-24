import { act, renderHook } from '@testing-library/react'

import { useLocalStorage } from './use-local-storage'

afterEach(() => {
  localStorage.clear()
})

test('initialValue를 전달하지 않고 기존 값이 없으면 null을 반환한다.', () => {
  const { result } = renderHook(() => useLocalStorage('test_key'))

  expect(localStorage.getItem('test_key')).toBeNull()
  expect(result.current[0]).toBeNull()
})

test('initialValue를 전달하지 않고 기존 값이 있으면 그 값을 반환한다.', () => {
  localStorage.setItem('test_key', 'saved')

  const { result } = renderHook(() => useLocalStorage('test_key'))

  expect(localStorage.getItem('test_key')).toBe('saved')
  expect(result.current[0]).toBe('saved')
})

test('initialValue를 전달하고 기존 값이 없으면 초기값을 설정한다.', () => {
  const { result } = renderHook(() => useLocalStorage('test_key', 'initial'))

  expect(localStorage.getItem('test_key')).toBe('initial')
  expect(result.current[0]).toBe('initial')
})

test('initialValue를 전달하고 기존 값이 있으면 초기값을 덮어쓰지 않는다.', () => {
  localStorage.setItem('test_key', 'saved')

  const { result } = renderHook(() => useLocalStorage('test_key', 'initial'))

  expect(localStorage.getItem('test_key')).toBe('saved')
  expect(result.current[0]).toBe('saved')
})

test('값을 변경한다.', () => {
  const { result } = renderHook(() => useLocalStorage('test_key'))

  act(() => {
    result.current[1]('updated')
  })

  expect(localStorage.getItem('test_key')).toBe('updated')
  expect(result.current[0]).toBe('updated')
})

test('값을 지운다.', () => {
  localStorage.setItem('test_key', 'saved')

  const { result } = renderHook(() => useLocalStorage('test_key'))

  act(() => {
    result.current[2]()
  })

  expect(localStorage.getItem('test_key')).toBeNull()
  expect(result.current[0]).toBeNull()
})
