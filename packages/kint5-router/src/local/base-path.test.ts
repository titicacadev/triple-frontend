import { renderHook } from '@testing-library/react'

import { useBasePathAdder } from './base-path'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ basePath: '/test-env' }),
}))

test('주어진 href에 basePath를 더합니다.', () => {
  const href =
    '/5b700a4e-4b0f-4266-81db-eb42f834bdd9?regionId=71476976-cf9a-4ae8-a60f-76e6fb26900d'

  const { result } = renderHook(() => useBasePathAdder())

  expect(result.current(href)).toBe(
    '/test-env/5b700a4e-4b0f-4266-81db-eb42f834bdd9?regionId=71476976-cf9a-4ae8-a60f-76e6fb26900d',
  )
})

test('주어진 href가 "/"이면 그냥 basePath를 반환합니다.', () => {
  const href = '/'

  const { result } = renderHook(() => useBasePathAdder())

  expect(result.current(href)).toBe('/test-env')
})
