import { renderHook } from '@testing-library/react-hooks'

import { useBasePathAdder } from './base-path'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

test('주어진 href에 basePath를 더합니다.', () => {
  const { basePath } = mockNextRouter()
  const href =
    '/5b700a4e-4b0f-4266-81db-eb42f834bdd9?regionId=71476976-cf9a-4ae8-a60f-76e6fb26900d'

  const {
    result: { current: addBasePath },
  } = renderHook(useBasePathAdder)

  expect(addBasePath(href)).toEqual(`${basePath}${href}`)
})

test('주어진 href가 "/"이면 그냥 basePath를 반환합니다.', () => {
  const { basePath } = mockNextRouter()
  const href = '/'

  const {
    result: { current: addBasePath },
  } = renderHook(useBasePathAdder)

  expect(addBasePath(href)).toEqual(basePath)
})

export function mockNextRouter() {
  const basePath = '/test-env'

  useRouter.mockImplementation(() => ({ basePath }))

  return { basePath }
}
